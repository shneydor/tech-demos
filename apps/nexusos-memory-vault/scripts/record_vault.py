#!/usr/bin/env python3
"""Install nexusos 0.1.0 and record CLI JSON for the Northline vault.

Build-time only. The browser never runs this script. Output is
src/data/capture.json, which the static page imports.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VAULT = ROOT / "vault"
OUT = ROOT / "src" / "data" / "capture.json"
VENV = ROOT / ".venv"
QUERIES = [
    "vendor freeze",
    "on-call",
    "checkout outage",
    "deploy window",
    "acme payments",
    "failover drill",
]
DECISION = "ops/decisions/adr-014-vendor-freeze.md"
DRILL = "inbox/failover-drill.md"


def venv_python() -> Path:
    if os.name == "nt":
        return VENV / "Scripts" / "python.exe"
    return VENV / "bin" / "python"


def venv_nexusos() -> Path:
    if os.name == "nt":
        return VENV / "Scripts" / "nexusos.exe"
    return VENV / "bin" / "nexusos"


def run(cmd: list[str], cwd: Path) -> str:
    result = subprocess.run(cmd, cwd=cwd, check=False, capture_output=True, text=True)
    if result.returncode != 0:
        sys.stderr.write(result.stdout)
        sys.stderr.write(result.stderr)
        raise SystemExit(f"command failed ({result.returncode}): {' '.join(cmd)}")
    return result.stdout


def ensure_install() -> Path:
    python = venv_python()
    if not python.exists():
        subprocess.run([sys.executable, "-m", "venv", str(VENV)], check=True)
    run(
        [
            str(python),
            "-m",
            "pip",
            "install",
            "--disable-pip-version-check",
            "nexusos==0.1.0",
        ],
        ROOT,
    )
    binary = venv_nexusos()
    if not binary.exists():
        raise SystemExit(f"nexusos was not installed at {binary}")
    return binary


def nx_json(binary: Path, args: list[str]) -> dict:
    stdout = run([str(binary), *args], ROOT)
    return json.loads(stdout)


def rewrite_paths(value: object, workspace: Path) -> object:
    """Replace this machine's temp workspace path with the portable label `vault`."""
    root = str(workspace.resolve())
    if isinstance(value, str):
        if value == root:
            return "vault"
        prefix = root + "/"
        if value.startswith(prefix):
            return "vault/" + value[len(prefix) :]
        return value
    if isinstance(value, list):
        return [rewrite_paths(item, workspace) for item in value]
    if isinstance(value, dict):
        return {key: rewrite_paths(item, workspace) for key, item in value.items()}
    return value


def main() -> None:
    binary = ensure_install()
    version_line = run([str(binary), "version"], ROOT).strip()
    version = version_line.removeprefix("nexusos ").strip()

    with tempfile.TemporaryDirectory(prefix="nexusos-vault-") as tmp:
        workspace = Path(tmp) / "vault"
        shutil.copytree(VAULT, workspace)
        # Blank template: keep the company notes only. The starter template
        # drops in SCHEMA.md, which is not part of this vault.
        run([str(binary), "init", "--template", "blank", "--adopt", str(workspace)], ROOT)
        run([str(binary), "index", "--workspace", str(workspace), "--json"], ROOT)
        status = nx_json(binary, ["status", "--workspace", str(workspace), "--json"])
        browse = nx_json(binary, ["browse", "--workspace", str(workspace), "--json"])
        searches = {
            term: nx_json(
                binary,
                ["search", term, "--workspace", str(workspace), "--limit", "8", "--json"],
            )
            for term in QUERIES
        }
        reads: dict[str, dict] = {}
        links: dict[str, dict] = {}
        contexts: dict[str, dict] = {}
        for doc in browse["documents"]:
            path = doc["path"]
            reads[path] = nx_json(binary, ["read", path, "--workspace", str(workspace), "--json"])
            links[path] = nx_json(binary, ["links", path, "--workspace", str(workspace), "--json"])
            contexts[path] = nx_json(
                binary, ["context", path, "--workspace", str(workspace), "--json"]
            )

        capture = rewrite_paths(
            {
                "tool": "nexusos",
                "version": version,
                "version_line": version_line,
                "queries": QUERIES,
                "status": status,
                "browse": browse,
                "searches": searches,
                "reads": reads,
                "links": links,
                "contexts": contexts,
            },
            workspace,
        )

    if not isinstance(capture, dict):
        raise SystemExit("capture was not an object")

    if capture["version"] != "0.1.0":
        raise SystemExit(f"expected nexusos 0.1.0, got {capture['version']!r}")
    if capture["status"]["status"] != "ready":
        raise SystemExit(f"index was not ready: {capture['status']}")

    docs = {doc["path"]: doc for doc in capture["browse"]["documents"]}
    if DECISION not in docs:
        raise SystemExit(f"missing {DECISION}; indexed {sorted(docs)}")
    if docs[DECISION]["collection"] != "decisions":
        raise SystemExit(f"{DECISION} collection is {docs[DECISION]['collection']!r}, want decisions")

    hits = capture["searches"]["vendor freeze"]["results"]
    if not hits or hits[0]["relative_path"] != DECISION:
        raise SystemExit(f"vendor freeze top hit was not {DECISION}: {hits[:1]}")

    for path in docs:
        if path not in capture["reads"] or path not in capture["links"] or path not in capture["contexts"]:
            raise SystemExit(f"missing read/links/context for {path}")

    context = capture["contexts"][DECISION]
    if not context["headings"] or not any(isinstance(heading.get("line"), int) for heading in context["headings"]):
        raise SystemExit(f"decision context is missing a heading line: {context['headings']}")
    if not context["linked"]:
        raise SystemExit(f"decision context has no linked paths: {context}")

    drill_out = capture["links"][DRILL]["outgoing"]
    if not any(link["resolution_state"] == "unresolved" for link in drill_out):
        raise SystemExit(f"expected an unresolved link on {DRILL}: {drill_out}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(capture, indent=2) + "\n")
    print(f"wrote {OUT} ({len(docs)} documents, nexusos {version})")


if __name__ == "__main__":
    main()
