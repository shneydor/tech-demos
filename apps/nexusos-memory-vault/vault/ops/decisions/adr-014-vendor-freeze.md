# ADR 014: Vendor freeze

## Status

Accepted on 2 October 2026.

## Decision

Freeze new Acme Payments endpoints through the March renewal. Checkout may call the existing authorize and capture routes only.

## Consequences

The [[checkout-rewrite]] cannot add a stored-card endpoint until the freeze lifts. [[acme-payments]] remains the only card vendor.
