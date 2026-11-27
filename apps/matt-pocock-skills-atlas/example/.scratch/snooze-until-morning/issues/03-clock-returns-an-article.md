# 03: The clock returns an Article to the top of the Inbox

**What to build:** Computing the Inbox or the Snoozed list at or after the wake instant returns the updated Article list. The Article becomes an Inbox Article, the scheduled wake is stored as the return time and then cleared, and the Snoozed list no longer shows it. It sits above Articles the clock has never brought back. A later return time ranks above an earlier one, and the same return time stays newest save first, so an Article due Monday and one due Tuesday, both noticed on Wednesday, stay Tuesday then Monday. It is not due a second time. Opening the Inbox does not drop it into ordinary save-time order, and a later save stays below that top group. Archiving it removes it for good. Snoozing it again takes it off the top and back onto the Snoozed list until the clock brings it back.

**Blocked by:** 01. Snooze an Article onto the Snoozed list

**Status:** ready-for-agent

- [ ] Computing the Inbox or the Snoozed list with `now` at or after the wake instant returns the updated Article list, and the caller keeps it.
- [ ] The Article's status becomes `inbox`, the scheduled wake is stored as the return time and then cleared, and the Snoozed list no longer shows it.
- [ ] The wake instant itself counts as due. If Shelf is closed at 05:00, the Article is back the next time either list is computed.
- [ ] A returned Article is not due a second time, and a later computation does not give it a fresh tomorrow.
- [ ] The returned Article sits at the top of the Inbox, above Articles the clock has never brought back. A later return time ranks above an earlier one. The same return time stays newest save first.
- [ ] An Article due Monday and an Article due Tuesday, both noticed on Wednesday, stay Tuesday then Monday.
- [ ] Opening the Inbox does not drop a returned Article into ordinary save-time order. A newly saved Article stays below the top group.
- [ ] A returned row is the title, the URL, and the save time: no badge and no wake-time label. The save time is unchanged.
- [ ] Archiving a clock-returned Article removes it from the Inbox, and it stays out.
- [ ] Snoozing a returned Article takes it off the top and onto the Snoozed list under the same tomorrow-morning rule, until the clock brings it back again.
