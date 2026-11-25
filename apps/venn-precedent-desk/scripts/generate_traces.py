#!/usr/bin/env python3
"""Generate Precedent Desk traces with the official venn-vdm 0.1.0 APIs.

Download-free path: authored 768-d unit vectors, plus the published venn-1 head
for Choice and Noul. Does not download EmbeddingGemma and does not embed text.

From apps/venn-precedent-desk, with venn-vdm==0.1.0 installed:

    python scripts/generate_traces.py

Writes src/data/traces.json (exact envelopes, including vectors) and
src/data/replay.json (the same answers and evidence, without vectors) for the
static page. Exits non-zero if the recorded answers do not match the tour.
"""

from __future__ import annotations

import json
from importlib.metadata import version as pkg_version
from pathlib import Path

import numpy as np

from venn import DecisionService, OutcomeService
from venn.adapters import FaissOutcomeAdapter
from venn.cli import download_head
from venn.profiles import HEAD_REPO_ID, HEAD_REVISION, TEXT_TAG

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "traces.json"
REPLAY = ROOT / "src" / "data" / "replay.json"

COMMIT = "3307c6366b175d8cd19b24dc7831211b338ed570"
THRESHOLD = 0.55
DIM = 768
K = 5
CLOSED_NOISE = 0.02
INCOMING_NOISE = 0.02

AX = {
    "access": 0,
    "payments": 1,
    "cards": 2,
    "disputes": 3,
    "digital": 4,
    "convention": 5,
    "instruction": 10,
    "off": 40,
}

QUEUES = ("access", "payments", "cards", "disputes")

# Closed-case copy. Vectors are not embeddings of these sentences.
CLOSED = {
    "access": [
        ("Cannot sign in after travel", "The card app rejects the password. A reset email never arrives."),
        ("One-time code rejected", "Three codes from the card app fail. The customer is locked out."),
        ("Password reset loop", "Each new password is refused at the next sign-in."),
        ("New phone, no access", "The trusted-device list still names the old handset."),
        ("Biometric prompt missing", "The app asks for a password the customer no longer has."),
        ("Joint account locked", "One holder can sign in. The other is locked after a trip."),
        ("App update broke sign-in", "The latest card app build will not accept the password."),
        ("Email on file is old", "Reset mail goes to an address the customer cannot open."),
        ("Branch reset did not stick", "A teller cleared the lock. The app locked again overnight."),
        ("VPN and the card app", "Sign-in works off the hotel Wi-Fi and fails on it."),
        ("Security questions failed", "The answers match the file. The app still refuses."),
        ("Passkey missing", "The device has no passkey and will not fall back."),
        ("Travel notice, then a lock", "A travel notice was filed. Sign-in died the next morning."),
        ("Codes arrive late", "The one-time code lands after it has already expired."),
    ],
    "payments": [
        ("Refund has not posted", "A merchant refund was promised four days ago and is not on the card."),
        ("Direct debit taken twice", "The same biller drafted the account on Monday and on Tuesday."),
        ("Payment sent to the wrong biller", "The customer paid the electric bill to the gas account."),
        ("Statement line looks high", "A grocery charge posted for more than the receipt."),
        ("Pending hold still there", "A hotel hold from last week has not dropped."),
        ("Transfer between own accounts", "A move from checking to the card payment is stuck."),
        ("Foreign ATM fee", "A cash withdrawal abroad shows a fee the customer wants explained."),
        ("Autopay took the full balance", "The customer expected the minimum. The full balance left."),
        ("Merchant refund to a closed card", "The refund was issued to a card that was replaced last month."),
        ("Payment posted late", "A payment made on Friday posted on Wednesday."),
        ("Bill pay payee rejected", "The biller will not accept the account number on file."),
        ("Cashback not applied", "A posted purchase did not earn the stated cashback."),
        ("Wire to a card payment", "An inbound wire was meant to pay the card and has not landed."),
        ("Installment plan charge", "A plan installment posted on top of the full purchase."),
    ],
    "cards": [
        ("Replacement has not arrived", "A stolen card was blocked. The new plastic is not in the mail."),
        ("Card lost on a trip", "The customer is abroad and needs a freeze before a replacement."),
        ("PIN forgotten", "The plastic works at the till and fails at the ATM."),
        ("Card swallowed by an ATM", "The machine kept the card. The account is otherwise fine."),
        ("Name printed wrong", "The new card arrived with a misspelled surname."),
        ("Contactless dead", "The chip works. Tap does not."),
        ("Damaged chip", "Readers fail on the first try and then succeed."),
        ("Additional card for a child", "A parent wants a second plastic with a low limit."),
        ("Card never activated", "The sticker is still on. Activation in the app fails."),
        ("Freeze after a suspicious tap", "The customer froze the card and now wants it opened."),
        ("Expiry next month", "The replacement should already have been sent."),
        ("Card delivered to the old flat", "The courier left the plastic at a previous address."),
        ("Metal card request", "The customer wants the paid metal design, not more credit."),
        ("Temporary card at a branch", "They need a branch plastic while the mailed card is in transit."),
    ],
    "disputes": [
        ("Goods never shipped", "A web order was charged. The parcel never left the merchant."),
        ("Hotel charged a cancelled stay", "The stay was cancelled inside the window. The charge posted."),
        ("Subscription after cancel", "The gym drafted a month the customer had already ended."),
        ("Counterfeit item", "The watch that arrived is not what the listing showed."),
        ("Charged in the wrong currency", "The terminal converted a local price the customer did not accept."),
        ("No-show the customer attended", "The salon charged a no-show. The customer was there."),
        ("Rental damage the customer disputes", "A hire firm added a scratch the customer says was already there."),
        ("Ticket for a cancelled flight", "The airline kept the fare after it cancelled the leg."),
        ("Duplicate merchant, different city", "A charge names the customer's merchant but a city they have not visited."),
        ("Service not provided", "A contractor took a deposit and did not start the work."),
        ("Returned item, charge remains", "The shop accepted the return. The charge is still posted."),
        ("Unauthorized tap", "A contactless charge at a bar the customer did not enter."),
        ("Trial converted without consent", "A free trial became a paid plan with no reminder."),
        ("Partial refund short", "The merchant refunded the goods and kept the shipping they had promised."),
    ],
}

CONVENTION = [
    ("Two lines for one coffee", "One tap at a cafe. The statement shows two lines for the same amount."),
    ("Duplicate line, one receipt", "The customer has a single receipt. The statement lists the purchase twice."),
    ("Same merchant, same minute", "Two identical posts one minute apart. The customer paid once."),
    ("Wallet pay counted twice", "A phone tap produced two statement lines and one merchant receipt."),
    ("Pending and posted together", "The pending line never dropped, and the posted line matches it."),
    ("Statement echo of one fare", "A transit fare appears twice. The gate recorded one entry."),
]

INCOMING = [
    ("INC-1401", "access", "Priya Raman", "Locked out after travel",
     "The card app rejects the password and the one-time code. A reset email has not arrived. A travel notice was filed last night."),
    ("INC-1408", "access", "Helen Cho", "Codes expire before they arrive",
     "One-time codes land after the app has already rejected them. The customer cannot reach the account."),
    ("INC-1414", "access", "Jonah Adeyemi", "New phone will not sign in",
     "The old handset is gone. The card app will not trust the new one."),
    ("INC-1419", "access", "Marta Silva", "Password reset did not stick",
     "A branch cleared the lock yesterday. This morning the app locked again."),
    ("INC-1510", "payments", "Owen Blake", "Refund still missing",
     "A merchant refund was promised four days ago and has not posted. The customer can sign in, and the card is in hand."),
    ("INC-1516", "payments", "Leah Ortiz", "Hotel hold still pending",
     "The stay ended last week. The hold is still on the available balance."),
    ("INC-1522", "payments", "Chris Daley", "Autopay took the full balance",
     "The customer expected the minimum payment. The full balance left the bank account."),
    ("INC-1528", "payments", "Nina Voss", "Cashback missing on a posted charge",
     "The purchase posted. The cashback the offer described did not."),
    ("INC-1602", "cards", "Samir Iqbal", "Replacement card has not arrived",
     "A stolen card was blocked on Monday. The replacement is still not in the mail. The customer can sign in."),
    ("INC-1609", "cards", "Elise Moreau", "ATM kept the card",
     "The machine swallowed the plastic. Purchases on the account are otherwise normal."),
    ("INC-1615", "cards", "Tom Nguyen", "PIN fails only at ATMs",
     "The chip pays in shops. Cash machines reject the PIN."),
    ("INC-1702", "off", "Facilities", "Invoice the lobby florist",
     "Accounts payable asks card ops to pay the branch florist for the lobby arrangement. There is no cardholder and no card transaction."),
    ("INC-1708", "disputes", "Ruth Keller", "Cancelled hotel still charged",
     "The reservation was cancelled inside the window. The hotel charged the stay anyway."),
    ("INC-1714", "disputes", "Andre Petit", "Parcel never shipped",
     "A web order was charged ten days ago. The merchant has no tracking number."),
    ("INC-1720", "disputes", "Grace Lim", "Gym drafted a cancelled month",
     "The membership ended in writing. A new month still posted."),
    ("INC-1604", "convention", "Imani Brooks", "Two statement lines for one coffee",
     "The customer was charged once at a cafe, but the statement shows two lines. They want the extra line removed, not a second refund."),
    ("INC-1880", "digital", "Noah Feldman", "USDC will not leave the wallet",
     "After a travel flag, the stablecoin balance is visible but a transfer of USDC never broadcasts. This is not a plastic card and not a posted merchant charge."),
    ("INC-1881", "digital2", "Amira Hassan", "Wallet transfer stuck after a travel hold",
     "A second customer cannot send USDC. The wallet shows the coins. Nothing has posted to the card account."),
]


def unit_from(weights: dict[int, float], noise: float, rng: np.random.Generator) -> np.ndarray:
    vector = np.zeros(DIM, dtype=np.float32)
    for index, weight in weights.items():
        vector[index] = weight
    if noise:
        vector = vector + rng.normal(0, noise, DIM).astype(np.float32)
    norm = float(np.linalg.norm(vector))
    if norm <= 1e-12:
        raise RuntimeError("Zero vector")
    return vector / norm


def jsonable(value):
    if isinstance(value, dict):
        return {str(key): jsonable(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [jsonable(item) for item in value]
    if isinstance(value, np.ndarray):
        return value.tolist()
    if isinstance(value, np.floating):
        return float(value)
    if isinstance(value, np.integer):
        return int(value)
    if isinstance(value, (str, int, float, bool)) or value is None:
        return value
    raise TypeError(type(value))


def envelope(api: str, request: dict, response: dict) -> dict:
    return {"api": api, "request": jsonable(request), "response": jsonable(response)}


def build_closed(rng: np.random.Generator) -> list[dict]:
    cases = []
    for queue in QUEUES:
        for index, (title, body) in enumerate(CLOSED[queue], start=1):
            cases.append({
                "id": f"{queue[:3].upper()}-{1000 + index}",
                "queue": queue,
                "title": title,
                "body": body,
                "utility": 0.94,
                "vector": unit_from({AX[queue]: 1.0}, CLOSED_NOISE, rng),
                "kind": "closed",
            })
    for index, (title, body) in enumerate(CONVENTION, start=1):
        cases.append({
            "id": f"DSP-C{index:02d}",
            "queue": "disputes",
            "title": title,
            "body": body,
            "utility": 0.97,
            "vector": unit_from({AX["payments"]: 0.55, AX["disputes"]: 0.35, AX["convention"]: 0.9}, CLOSED_NOISE, rng),
            "kind": "convention",
        })
    return cases


def incoming_vector(kind: str, rng: np.random.Generator) -> np.ndarray:
    if kind == "convention":
        weights = {AX["payments"]: 0.55, AX["disputes"]: 0.35, AX["convention"]: 0.9}
    elif kind == "off":
        weights = {AX["off"]: 1.0}
    elif kind == "digital":
        weights = {AX["digital"]: 1.0}
    elif kind == "digital2":
        weights = {AX["digital"]: 1.0, 6: 0.08}
    else:
        weights = {AX[kind]: 1.0}
    return unit_from(weights, INCOMING_NOISE, rng)


def build_incoming(rng: np.random.Generator) -> list[dict]:
    tickets = []
    for ticket_id, kind, sender, title, body in INCOMING:
        queue = {"convention": "disputes", "digital": "digital-assets", "digital2": "digital-assets", "off": None}.get(kind, kind)
        tickets.append({
            "id": ticket_id,
            "kind": kind,
            "queue": queue,
            "sender": sender,
            "title": title,
            "body": body,
            "vector": incoming_vector(kind, rng),
        })
    return tickets


def decide_reference(service: DecisionService, vector: np.ndarray, handle: str, choice: dict, noul: dict) -> dict:
    request = {
        "state": {"vector": vector.tolist()},
        "questions": {
            "queue": {"type": "NearestReference", "index_ref": handle, "k": K, "threshold": THRESHOLD},
            "described": choice,
            "fits": noul,
        },
    }
    response = service.decide(request)
    return envelope("DecisionService.decide", request, response)


def decide_outcome(service: OutcomeService, vector: np.ndarray, store: str, options: list[str], rng: np.random.Generator) -> dict:
    request = {
        "states": [{"vector": vector.tolist(), "tag": TEXT_TAG.to_dict()}],
        "questions": {
            "queue": {
                "type": "nearest_outcome",
                "store": store,
                "options": options,
                "k": K,
                "min_support": 1,
                "goal": "maximize",
            }
        },
    }
    response = service.decide_batch(request["states"], request["questions"], rng=rng)
    return envelope("OutcomeService.decide_batch", request, response)


def answer(record: dict, question: str) -> dict:
    return record["response"]["answers"][question]


def assert_tour(before: dict[str, dict], after_digital: dict, after_access: dict) -> None:
    access = answer(before["INC-1401"], "queue")
    payments = answer(before["INC-1510"], "queue")
    convention = answer(before["INC-1604"], "queue")
    florist = answer(before["INC-1702"], "queue")
    wallet = answer(before["INC-1880"], "queue")
    checks = [
        (access["answer"] == "access" and answer(before["INC-1401"], "described")["answer"] == "access",
         "Access ticket should agree on Access"),
        (payments["answer"] == "payments" and answer(before["INC-1510"], "described")["answer"] == "payments",
         "Payments ticket should agree on Payments"),
        (convention["answer"] == "disputes" and answer(before["INC-1604"], "described")["answer"] == "payments",
         "Convention ticket should be Disputes by history and Payments by description"),
        (florist["answer"] == "none" and answer(before["INC-1702"], "fits")["probabilities"]["true"] < 0.05,
         "Florist invoice should abstain and fail the fit question"),
        (wallet["answer"] == "none", "First wallet ticket should abstain"),
        (answer(after_digital, "queue")["answer"] == "digital-assets",
         "Written-back wallet ticket should route to digital-assets"),
        (answer(after_digital, "described")["answer"] != "digital-assets",
         "Descriptions have no Digital assets option"),
        (answer(after_access, "queue")["answer"] == "access",
         "Access should still route to Access after the write-back"),
        (len(access["evidence_ids"]) >= 3, "Need at least three precedents"),
    ]
    for ok, message in checks:
        if not ok:
            snapshot = {
                "access": access["answer"],
                "payments": payments["answer"],
                "convention_history": convention["answer"],
                "convention_choice": answer(before["INC-1604"], "described")["answer"],
                "florist": florist["answer"],
                "florist_yes": answer(before["INC-1702"], "fits")["probabilities"]["true"],
                "wallet": wallet["answer"],
                "after": answer(after_digital, "queue")["answer"],
                "after_choice": answer(after_digital, "described")["answer"],
                "access_after": answer(after_access, "queue")["answer"],
            }
            raise SystemExit(message + " " + json.dumps(snapshot))


def project_decision(decision: dict) -> dict:
    answers = decision["response"]["answers"]

    def slim(name: str) -> dict:
        raw = answers[name]
        kept = {}
        for key in ("answer", "confidence", "probabilities", "margin", "evidence_ids", "calibrated", "none_semantics"):
            if key in raw:
                kept[key] = raw[key]
        return kept

    return {"queue": slim("queue"), "described": slim("described"), "fits": slim("fits")}


def project_outcome(outcome: dict) -> dict:
    raw = outcome["response"]["results"][0]["answers"]["queue"]
    options = {}
    for name, stats in raw["options"].items():
        options[name] = {
            key: stats[key]
            for key in ("mean", "count", "spread", "mean_distance", "evidence_ids", "supported")
        }
    return {
        "answer": raw["answer"],
        "calibrated": raw["calibrated"],
        "confidence": raw["confidence"],
        "goal": raw["goal"],
        "distance": raw["distance"],
        "options": options,
    }


def project_pair(pair: dict) -> dict:
    return {"history": project_decision(pair["decision"]), "outcome": project_outcome(pair["outcome"])}


def catalog_row(case: dict) -> dict:
    row = {
        "id": case["id"],
        "title": case["title"],
        "body": case["body"],
        "queue": case["queue"],
        "kind": case["kind"],
    }
    if "sender" in case:
        row["sender"] = case["sender"]
    if "utility" in case:
        row["utility"] = case["utility"]
    return row


def main() -> None:
    assets = download_head()
    service = DecisionService(model_dir=str(assets))
    closed = build_closed(np.random.default_rng(1))
    incoming = build_incoming(np.random.default_rng(2))
    if not 40 <= len(closed) <= 80:
        raise SystemExit(f"Expected 40..80 closed tickets, got {len(closed)}")
    if not 15 <= len(incoming) <= 25:
        raise SystemExit(f"Expected 15..25 incoming tickets, got {len(incoming)}")

    matrix = np.stack([case["vector"] for case in closed]).astype(np.float32)
    ids = [case["id"] for case in closed]
    labels = [case["queue"] for case in closed]
    handle = service.register_index(matrix, ids, labels)

    import faiss

    partitions = {}
    for queue in QUEUES:
        rows = [case for case in closed if case["queue"] == queue]
        index = faiss.IndexFlatL2(DIM)
        index.add(np.stack([case["vector"] for case in rows]).astype(np.float32))
        partitions[queue] = {
            "index": index,
            "ids": [case["id"] for case in rows],
            "outcomes": [case["utility"] for case in rows],
        }
    outcomes = OutcomeService()
    store = outcomes.register_store(FaissOutcomeAdapter(partitions, tag=TEXT_TAG))

    instruction = unit_from({AX["instruction"]: 1.0}, 0.0, np.random.default_rng(0))
    described = {
        "type": "Choice",
        "instructions_vec": instruction.tolist(),
        "options": [
            {"label": queue, "vector": unit_from({AX[queue]: 1.0}, 0.0, np.random.default_rng(0)).tolist()}
            for queue in QUEUES
        ],
    }
    fits = {
        "type": "Noul",
        "instructions_vec": instruction.tolist(),
        "options": [
            {"label": "false", "vector": unit_from({AX["off"]: 1.0}, 0.0, np.random.default_rng(0)).tolist()},
            {
                "label": "true",
                "vector": unit_from({AX[queue]: 1.0 for queue in QUEUES}, 0.0, np.random.default_rng(0)).tolist(),
            },
        ],
    }

    listed = list(QUEUES)
    before = {}
    outcome_rng = np.random.default_rng(3)
    for ticket in incoming:
        before[ticket["id"]] = {
            "decision": decide_reference(service, ticket["vector"], handle, described, fits),
            "outcome": decide_outcome(outcomes, ticket["vector"], store, listed, outcome_rng),
        }

    wallet = next(ticket for ticket in incoming if ticket["id"] == "INC-1880")
    written = {
        "id": wallet["id"],
        "queue": "digital-assets",
        "title": wallet["title"],
        "body": wallet["body"],
        "utility": 1.0,
        "vector": wallet["vector"],
        "kind": "written-back",
        "sender": wallet["sender"],
    }
    matrix_after = np.vstack([matrix, written["vector"]]).astype(np.float32)
    ids_after = ids + [written["id"]]
    labels_after = labels + ["digital-assets"]
    handle_after = service.register_index(matrix_after, ids_after, labels_after)

    digital_index = faiss.IndexFlatL2(DIM)
    digital_index.add(written["vector"][None].astype(np.float32))
    partitions["digital-assets"] = {
        "index": digital_index,
        "ids": [written["id"]],
        "outcomes": [written["utility"]],
    }
    options_after = listed + ["digital-assets"]
    followups = {}
    for ticket_id in ("INC-1881", "INC-1401"):
        ticket = next(item for item in incoming if item["id"] == ticket_id)
        followups[ticket_id] = {
            "decision": decide_reference(service, ticket["vector"], handle_after, described, fits),
            "outcome": decide_outcome(outcomes, ticket["vector"], store, options_after, outcome_rng),
        }

    assert_tour(
        {ticket_id: record["decision"] for ticket_id, record in before.items()},
        followups["INC-1881"]["decision"],
        followups["INC-1401"]["decision"],
    )

    catalog = {case["id"]: catalog_row(case) for case in closed}
    catalog[written["id"]] = catalog_row(written)
    for ticket in incoming:
        if ticket["id"] not in catalog:
            catalog[ticket["id"]] = catalog_row(ticket)

    head_config = json.loads((Path(assets) / "config.json").read_text())
    payload = {
        "provenance": {
            "package": "venn-vdm",
            "version": pkg_version("venn-vdm"),
            "importName": "venn",
            "commit": COMMIT,
            "tag": "v0.1.0",
            "headRepo": HEAD_REPO_ID,
            "headRevision": HEAD_REVISION,
            "headReader": head_config.get("reader"),
            "vectors": "authored",
            "embedderDownloaded": False,
            "note": (
                "Authored unit vectors, not EmbeddingGemma embeddings. "
                "The 1.5 GB reader was not downloaded. Choice and Noul were scored by the published venn-1 head."
            ),
            "command": "python scripts/generate_traces.py",
            "threshold": THRESHOLD,
            "referenceK": K,
            "closedCount": len(closed),
            "incomingCount": len(incoming),
            "license": "MIT",
            "preview": "research preview",
        },
        "queues": [
            {"id": "access", "label": "Access", "description": "Sign-in, passwords, and one-time codes."},
            {"id": "payments", "label": "Payments", "description": "Posted charges, refunds, holds, and transfers."},
            {"id": "cards", "label": "Cards", "description": "Plastic, PIN, freeze, and replacement."},
            {"id": "disputes", "label": "Disputes", "description": "Chargebacks and merchant disagreements."},
            {"id": "digital-assets", "label": "Digital assets", "description": "Wallets and stablecoin transfers. Opened by write-back."},
        ],
        "catalog": catalog,
        "setup": {
            "referenceIndex": envelope(
                "DecisionService.register_index",
                {"vectors": matrix.tolist(), "ids": ids, "outcomes": labels},
                {"index_ref": handle},
            ),
            "outcomeStore": {
                "api": "OutcomeService.register_store",
                "request": {
                    "adapter": "FaissOutcomeAdapter",
                    "tag": TEXT_TAG.to_dict(),
                    "partitions": {queue: {"ids": partitions[queue]["ids"], "outcomes": partitions[queue]["outcomes"]} for queue in QUEUES},
                },
                "response": {"store": store},
            },
        },
        "incoming": [
            {"id": ticket["id"], **before[ticket["id"]]}
            for ticket in incoming
        ],
        "writeback": {
            "note": (
                "Venn does not write the store. The app appended the resolved wallet ticket, "
                "registered a new reference index, and added a digital-assets partition on the live outcome adapter."
            ),
            "appended": catalog_row(written),
            "referenceIndex": envelope(
                "DecisionService.register_index",
                {"vectors": matrix_after.tolist(), "ids": ids_after, "outcomes": labels_after},
                {"index_ref": handle_after},
            ),
            "followups": [
                {"id": ticket_id, **followups[ticket_id]}
                for ticket_id in ("INC-1881", "INC-1401")
            ],
        },
        "tour": [
            {
                "id": "access",
                "ticketId": "INC-1401",
                "phase": "before",
                "kicker": "A familiar lockout",
                "narration": "Password and one-time codes. Closed tickets and the queue descriptions name the same queue.",
            },
            {
                "id": "payments",
                "ticketId": "INC-1510",
                "phase": "before",
                "kicker": "A refund that has not posted",
                "narration": "The customer can sign in and the card is in hand. Both paths name Payments.",
            },
            {
                "id": "convention",
                "ticketId": "INC-1604",
                "phase": "before",
                "kicker": "Words that point at the wrong queue",
                "narration": "The wording sounds like a payment. Duplicate-line filings were resolved in Disputes, and that history is nearer than the Payments description.",
            },
            {
                "id": "florist",
                "ticketId": "INC-1702",
                "phase": "before",
                "kicker": "Does not fit this queue",
                "narration": "An internal invoice, not a cardholder. History abstains. The fit question says it does not belong. Descriptions can still name a listed queue: that signal is not a guardrail.",
            },
            {
                "id": "wallet",
                "ticketId": "INC-1880",
                "phase": "before",
                "kicker": "A kind of ticket the desk has not seen",
                "narration": "No closed wallet case exists, so history will not name a queue. Resolving it and writing the case back is how a new queue enters the model.",
                "action": {"id": "writeback", "label": "Resolve in Digital assets and write back", "to": "wallet-next"},
            },
            {
                "id": "wallet-next",
                "ticketId": "INC-1881",
                "phase": "after",
                "kicker": "The next similar ticket",
                "narration": "One written-back case is now the nearest reference, so this ticket routes to Digital assets. The four descriptions still cannot name that queue.",
            },
        ],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2, allow_nan=False) + "\n")

    steps = {}
    for ticket_id, pair in before.items():
        steps[ticket_id] = project_pair(pair)
    for ticket_id, pair in followups.items():
        steps[ticket_id + ":after"] = project_pair(pair)
    replay = {
        "provenance": payload["provenance"],
        "queues": payload["queues"],
        "catalog": payload["catalog"],
        "tour": payload["tour"],
        "steps": steps,
        "source": "Projected from traces.json. Vectors are omitted here; the exact envelopes are in that file.",
    }
    REPLAY.write_text(json.dumps(replay, indent=2, allow_nan=False) + "\n")

    def brief(record: dict) -> str:
        queue = answer(record, "queue")
        described_answer = answer(record, "described")
        yes = answer(record, "fits")["probabilities"]["true"]
        return (
            f"history={queue['answer']} ({queue['confidence']:.3f}, margin {queue['margin']:.3f}) "
            f"described={described_answer['answer']} ({described_answer['confidence']:.3f}) "
            f"fit_yes={yes:.3f} precedents={','.join(queue['evidence_ids'][:5])}"
        )

    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")
    print(f"venn-vdm {payload['provenance']['version']} commit {COMMIT}")
    print(f"closed {len(closed)} incoming {len(incoming)} index {handle[:12]}")
    for step in payload["tour"]:
        source = followups if step["phase"] == "after" else before
        print(f"{step['id']:12} {step['ticketId']} {brief(source[step['ticketId']]['decision'])}")


if __name__ == "__main__":
    main()
