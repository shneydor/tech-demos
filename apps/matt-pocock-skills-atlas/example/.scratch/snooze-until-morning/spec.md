Status: ready-for-agent

## Problem Statement

The reader keeps a local reading list on one machine. They can save an Article into the Inbox and archive an Article so it leaves the Inbox. They want to snooze an Article until tomorrow morning so it leaves the Inbox and comes back then. While it is waiting they need to see it and be able to take it back. There is no snooze, no clock, and no second list today.

## Solution

One snooze command uses one rule: tomorrow morning is 05:00 on the next local calendar date. The Article leaves the Inbox and appears on a Snoozed list with the wake instant. The reader can unsnooze it early, putting it back in the Inbox at its original save time, or archive it from that list so it does not come back. There is no timer and no notification. The next time the Inbox or the Snoozed list is computed at or after the wake instant, the clock returns the Article to the top of the Inbox and the Snoozed list no longer shows it.

## User Stories

1. As a reader, I want to snooze an Inbox Article until tomorrow morning, so that it leaves the Inbox and comes back then.
2. As a reader, I want one snooze command and one rule, so that I do not pick a time and I do not use a settings screen.
3. As a reader, I want tomorrow morning to mean 05:00 on the next local calendar date, so that every snooze means the same morning.
4. As a reader, I want a snooze at 04:00 to wake at 05:00 on the next date, so that it does not come back in an hour.
5. As a reader, I want a snooze at 05:00 to wake at 05:00 on the next date, so that snoozing on the morning hour does not make the Article due immediately.
6. As a reader, I want a snooze late in the evening to wake at 05:00 on the next date, so that the rule follows the next calendar date.
7. As a reader, I want Saturday and Sunday treated as ordinary days, so that a Friday snooze wakes on Saturday at 05:00.
8. As a reader, I want 05:00 resolved in this machine's local timezone, so that morning is my morning.
9. As a reader, I want the wake instant stored once when I snooze, so that a later visit does not compute a fresh tomorrow.
10. As a reader, I want the Article to become due at the wake instant itself, so that 05:00 counts as back.
11. As a reader, I want the Article to stay due after that instant, so that missing the morning does not roll it forward and does not limit it to a morning window.
12. As a reader, I want a Snoozed list, so that I can see what is waiting.
13. As a reader, I want the Snoozed list to show the Article and its wake instant, so that I know when it comes back.
14. As a reader, I want the Snoozed list ordered soonest wake first, so that the next Article due is at the top.
15. As a reader, I want Articles that share a wake instant to stay newest save first on the Snoozed list, so that a shared morning keeps save order.
16. As a reader, I want to snooze an Article that is already on the Snoozed list, so that the same rule is applied again from now.
17. As a reader, I want that reset at 04:00 to move the wake to 05:00 on the next date, so that resetting uses the same rule as a first snooze.
18. As a reader, I want to unsnooze an Article from the Snoozed list, so that I can read it before the wake instant.
19. As a reader, I want unsnooze to put the Article back in the Inbox immediately at its original save time, so that taking it back early is not a clock return.
20. As a reader, I want unsnooze to be the only action that puts an Article back at its original save time, so that the clock return and the early return stay different.
21. As a reader, I want an unsnoozed Article to have no return time, so that it joins the ordinary Inbox.
22. As a reader, I want to archive an Article from the Snoozed list, so that it does not return at 05:00.
23. As a reader, I want that archive to clear the wake instant, so that nothing later makes the Article due.
24. As a reader, I want an archived Article to stay out of the Inbox, so that the Archive still means put away.
25. As a reader, I want snooze to be refused for an archived Article, so that snooze does not bring the Archive back.
26. As a reader, I want no notification and no background timer, so that Shelf does not wake itself.
27. As a reader, I want a due Article to come back the next time the Inbox or the Snoozed list is computed, so that leaving Shelf closed at 05:00 does not lose it.
28. As a reader, I want that computation to hand back the updated Article list, so that I can keep the list and the return sticks.
29. As a reader, I want the clock to store the scheduled wake as the return time and then clear the scheduled wake, so that the Article is not due a second time and the top of the Inbox still has a time to sort on.
30. As a reader, I want a clock-returned Article at the top of the Inbox, above Articles the clock has never brought back, so that I see it first.
31. As a reader, I want that top place to last until I archive the Article or snooze it again, so that opening the Inbox does not drop it into ordinary save-time order.
32. As a reader, I want a later return time above an earlier return time, so that the later morning stays higher in the top group.
33. As a reader, I want Articles with the same return time newest save first, so that one shared morning keeps save order.
34. As a reader, I want an Article due Monday and an Article due Tuesday, both noticed on Wednesday, to stay Tuesday then Monday, so that the order follows the scheduled mornings and not the time I opened Shelf.
35. As a reader, I want a newly saved Article to join the ordinary Inbox below the clock-returned group, so that a new save does not climb above Articles the clock already brought back.
36. As a reader, I want the rest of the Inbox newest save first, so that Articles with no return time keep today's order.
37. As a reader, I want a returned row to show the title, the URL, and the save time, so that it looks like any other Inbox Article.
38. As a reader, I want no badge and no wake-time label on a returned row, so that coming back adds nothing to the row.
39. As a reader, I want the Snoozed list to drop an Article once the clock has returned it, so that waiting and returned stay separate.
40. As a reader, I want to snooze a returned Article again with the same rule, so that I can send it to another morning.
41. As a reader, I want snoozing it again to take it off the top of the Inbox, so that it waits on the Snoozed list until the clock brings it back again.
42. As a reader, I want each snooze to be a single morning, so that snooze does not recur.
43. As a reader, I want to archive a clock-returned Article from the Inbox, so that I can put it away after it comes back and it stays out.
44. As a reader, I want the save time to stay the time I first saved the Article, so that snooze, unsnooze, and the clock return do not rewrite it.
45. As a reader, I want the current time and the timezone supplied by the caller, so that the inbox module does not read the computer clock or the host timezone.

## Implementation Decisions

- Extend the existing inbox module. It remains a pure set of operations on Articles. Callers pass the Article list. Operations that need the clock pass `now`. Operations that resolve a local calendar date also pass an IANA timezone. The module does not read the computer clock or the host timezone. A valid zone is the caller's responsibility.
- An Article is `inbox`, `snoozed`, or `archived`. Saving an Article still puts it in the Inbox. The save time does not change when the Article is snoozed, unsnoozed, or returned by the clock.
- Snooze applies to an Inbox Article, including one the clock has already returned, and to an Article already on the Snoozed list. It does not apply to an archived Article.
- Snooze sets the status to `snoozed` and stores one scheduled wake instant. That instant is 05:00 on the next local calendar date in the timezone the caller passed, resolved from `now`. It is the next date even when `now` is 04:00, even when `now` is 05:00, and even when the next date is a weekend. The same rule is used for a first snooze and for a reset.
- The scheduled wake is not recomputed on later views. The Article is due when `now` is at or after that instant. It does not become due only inside a morning window, and it does not move to a later morning on its own.
- Computing the Inbox or the Snoozed list takes the Article list and `now`, applies the clock return, and returns the updated Article list for the caller to keep.
- When that computation finds a snoozed Article that is due, it stores the scheduled wake as the return time, clears the scheduled wake, and sets the status to `inbox`. The Article is not due a second time. The Snoozed list no longer shows it.
- The Inbox is the Articles whose status is `inbox`. Articles with a return time form the top group, ordered by return time, later above earlier. The same return time stays newest save first. Articles with no return time follow, newest save first. A new save has no return time, so it joins that ordinary group. Opening the Inbox does not clear a return time.
- The top place ends when the Article is archived or snoozed again. Snoozing it again sets a new scheduled wake from `now` and puts it on the Snoozed list. The next clock return stores that new scheduled wake as the return time.
- The Snoozed list is the Articles whose status is `snoozed`. It shows each Article and its scheduled wake instant, soonest wake first. The same wake instant stays newest save first.
- Unsnooze is available from the Snoozed list. It sets the status to `inbox`, leaves the save time unchanged, and does not store a return time. The Article rejoins the ordinary Inbox at its original save time. Unsnooze is the only action that does that.
- Archive from the Snoozed list sets the status to `archived` and clears the scheduled wake, so the Article does not return at 05:00. Archive of an Inbox Article, including one the clock returned, still removes it from the Inbox, and an archived Article stays out.
- A returned Inbox row is the title, the URL, and the save time. It has no badge and no wake-time label. The Snoozed list is where the wake instant is shown.

## Testing Decisions

- Test external behavior only: the Article list that comes back, which Articles are in the Inbox, which are on the Snoozed list, their order, their status, the scheduled wake, the return time, and the save time. Do not test private structure.
- Test the inbox module only, through the same pure seam the current test uses. Pass Articles, `now`, and an IANA timezone. Do not add DOM tests.
- Prior art is the existing test that saves two Articles, archives the newer one, and expects the Inbox to show the older one.
- Cover the confirmed cases: a snooze leaves the Inbox and appears on the Snoozed list with 05:00 on the next local date; 04:00 does not wake in an hour; 05:00 and a weekend follow the next calendar date; resetting a waiting Article applies the rule from `now`; unsnooze returns to the ordinary Inbox at the original save time with no return time; archive from the Snoozed list does not come back; the wake instant itself is due; Shelf closed at 05:00 returns the Article on the next computation of either list; a Monday wake and a Tuesday wake, both noticed on Wednesday, stay Tuesday then Monday; the top group stays above a later save; snoozing a returned Article leaves the top until the clock brings it back again; a returned Article is not due a second time; an archived Article cannot be snoozed.

## Out of Scope

- Notifications, a background timer, and anything that runs when a list is not being computed.
- A custom wake time, a time picker, other snooze presets, and a settings screen.
- Recurring snooze.
- Snooze from the Archive.
- Badges and wake-time labels on an Inbox row.
- Accounts, sync, and more than one reader or machine.
- DOM tests, and any seam other than the inbox module.
- Reading the computer clock or the host timezone. A valid IANA timezone is the caller's responsibility.

## Further Notes

The current domain words are Article, Inbox, and Archive. This feature adds a snoozed status and a Snoozed list, and it keeps those names. The Inbox remains newest save first for Articles with no return time. The clock-returned group is the extra order on top of that.
