# 01: Snooze an Article onto the Snoozed list

**What to build:** The reader can snooze an Inbox Article until tomorrow morning. It leaves the Inbox and appears on the Snoozed list with one wake instant: 05:00 on the next local calendar date in the timezone the caller passes. A snooze at 04:00, at 05:00, in the evening, or on Friday still uses that next date, and weekends are ordinary days. The Snoozed list is soonest wake first, and the same wake stays newest save first. Snoozing an Article already on the list resets that same rule from now. The save time does not change. An archived Article cannot be snoozed.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Snoozing an Inbox Article removes it from the Inbox and shows it on the Snoozed list with its wake instant.
- [ ] The wake instant is 05:00 on the next local calendar date in the timezone the caller passes, stored once at snooze time.
- [ ] A snooze at 04:00 wakes at 05:00 on the next date, not in an hour.
- [ ] A snooze at 05:00, and a snooze late in the evening, both wake at 05:00 on the next date.
- [ ] A Friday snooze wakes at 05:00 on Saturday.
- [ ] The Snoozed list is soonest wake first. Articles that share a wake instant stay newest save first.
- [ ] Snoozing an Article already on the Snoozed list resets the same rule from now.
- [ ] The save time stays the time the Article was first saved.
- [ ] Snooze does not apply to an archived Article, and the Archive stays out of the Inbox.
- [ ] The caller passes `now` and the timezone. The module does not read the computer clock or the host timezone.
