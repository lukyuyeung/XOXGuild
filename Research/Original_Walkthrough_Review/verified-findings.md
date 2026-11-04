# Verified video review — 2026-11-02

Evidence: CreateGuild.mp4 (11.4s), XOXContent.mp4 (29.33s). Inspected complete timeline at one-second intervals plus scene transitions. This is observation of recordings, not interactive website or backend verification. No published source changed during review.

## CreateGuild
- 0–2.77s Basic Profile: name (UI says unique, 3–24 chars, no sensitive words), upload logo / 6 preset emblems, description, multi-select tags (Beginner Friendly, High Volume, Perp Traders, RWA Traders, KOL Community, GenZ, Competitive, Casual, Invite Only). Live right-hand preview name/logo/tags/initial level Bronze, members1/20, role Guild Leader.
- 2.77–6.8s Entry Requirements: Instant Join vs Approval Required; approvers described as leader or vice leaders. Minimum14D volume none/10K/50K/100K USDT/custom; minimum account none/VIP1+/VIP2+/VIP3+/custom; minimum assets/margin none/100/500/1000 USDT/custom. Right summary including approvers (N/A Instant). Demonstrated change50K→10K, VIP2+→VIP1+, none→100USDT.
- 6.8–9.3s Rules & Confirmation: editable rules and announcement; summary identity,logo,tags,method,requirements,role,Bronze,capacity,points0. Copy says discovery when open, later edit from dashboard. Create button closes to homepage; new guild persistence/success not established.
- Existing prototype missing logo/tags/live preview, all eligibility thresholds, rules/announcement; defaults Gold/100 contradict recorded Bronze/20.

## XOXContent
- 0–~3s profile: UniSat LegendLv5,98/100,52.8MUSDT,1,480,000 guildpoints,94 active members; eligibility checks compare guild minima vs user1500USDT/VIP3; eligible JoinNow.
- ~3–4s join confirm card: role Member,capacity bar,one-guild-only notice,Confirm/Cancel.
- ~4–5.63s Welcome screen and EnterGuildDashboard.
- 5.63–15.87s Dashboard: identity,tier/rank,members,14Dvolume,guildpoints,active count,role,TradeToContribute; Battle/Forum links. Overview85% next-level ring,remaining volume/active members/missions and invite. Daily/Weekly/Event tabs actually switched; tasks show goals,progress,rewards,timeleft,actions TradeNow/CheckIn/InviteNewUsers/ViewRanking. DailyPairChallenge,WeeklyVolumeSprint,WeeklyConsistency,EventLeaderboardPush,EventReferralBoost visible partially. Rewards shown as sample Points/USDT/NFT/banner; not production promises.
- 15.87–21.2s WeeklyGuildBattle: LIVE sample/countdown,TradeNow,ViewBattleRules,UniSatvsDeltaWolves,currentvolumes6.8Mvs6.2M,shares52.3vs47.7,gap500K; milestone bar2.5M through100M with locked/unlocked tiers and amounts; MyPersonalContribution128500USDT/rank8/estimated24.6USDT; TopContributors. Existing prototype reduces this to generic concept prose: must restore structure, keep demo label without API.
- 21.2–22.33s returns Dashboard and opens Forum.
- 22.33–29.33s Forum: pinned weekly objective/Edit,member roster42 with GuildLeader/ViceLeader roles and independent scroll,chat bubbles/names/timestamps/self-vs-other,input,voiceicon,plus. Enters aa and sends (own bubble visible),then another sample message appears. No backend/realtime implementation verified. Existing prototype omits Forum entirely.

## Preserve behavior, fix inconsistencies
- Name aa passes despite 3-character stated minimum.
- Preview1/20 vs summary Capacity20/20.
- UniSatLegendLv5 outside battle vs Gold inside battle: grouping or inconsistent fixture unknown.
- 6.8M minus6.2M =600K,not displayed500K.
- Forum42 vs guild98: could be channel/online count; must clarify labels,not assume same metric.
- Existing homepage tags/values misaligned; do not preserve erroneous labels.

## Not demonstrated
Approval branch submitting/approving/rejecting; failing eligibility/full/already-member states; logo upload/custom thresholds; successful creation persistence; founder admin; actual trade/checkin/invite/rules outcomes; ForumEdit/voice/attachment; rewards settlement; backend/wallet/contracts/mobile.

## Redesign priority
P0 restore accurate Create/eligibility/confirm/welcome; P0 rebuild dashboard progression + task tabs; P0 add Forum; P0 Battle milestones/personal contribution/leaderboard; P1 align settings and rankings GuildPoints/discovery requirements/recommendation reasons; then homepage final visual polish. Existing frontend can remain local demo but must label local-only messages, never imitate external send or actual claims.
