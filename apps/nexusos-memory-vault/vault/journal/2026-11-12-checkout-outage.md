# Checkout outage, 12 November 2026

## Timeline

14:10 UTC: authorize calls to Acme Payments time out. Checkout returns 503 for every new order.

14:28 UTC: on-call rolls traffic to the legacy path. The [[incident-response]] first hour is closed at 14:41 UTC.

## Follow-up

The [[checkout-rewrite]] stays behind the [[adr-014-vendor-freeze|vendor freeze]]. No new Acme endpoint was added during the checkout outage.
