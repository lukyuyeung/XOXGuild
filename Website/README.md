# XOX Guilds

Buildless static XOX Guilds concept. Serve `dist/` with any HTTP server. All assets are local.

## Implemented
- Responsive leaderboard with demonstration period switching and volume sorting.
- Guild search, policy filters, bookmarks, detail dialogs and empty results state.
- Browser-local joining, approval applications, cancellation, guild creation and membership management.
- Explicit demo wallet/profile, accessible dialogs, keyboard search shortcut, focus states and reduced-motion support.

## Data and integration
All records are illustrative fixtures. Membership, applications and custom guilds are persisted in localStorage on the current browser only. No production wallet, contract, API, reward or battle service is connected. Period values are illustrative multipliers, not historical data. Production integration must replace fixtures and implement server-authoritative eligibility, capacity, approvals and contract transactions.

## Assets
Hero, banner and demo emblems are crops of the user-supplied Guild V2 concept. Official XOX mark is extracted from the supplied brand PDF cover. No confidential PDF content is distributed. Fonts: Inter and Barlow Condensed via Fontsource (SIL OFL).

## Validation
Browser checks at 1440, 768 and 390 pixels; no document overflow. Tested search, save, join, leave, create and persistence with no JavaScript errors. Static site needs no install or build.

## Guild workspace pages
- `#/discover`: searchable guild discovery, membership filters, saved guilds and sorting.
- `#/rankings`: podium, complete ranking table, illustrative periods and search.
- `#/guild/:id`: overview, volume chart, contributors and progression concept.
- `#/guild/:id/members` and `/activity`: sample roster with search/sort and concept timeline.
- `#/arena`, `/format`, `/rewards`: battle showcase, proposed format and rewards concept.
- `#/my-guild`: no-membership state, local applications and active membership dashboard.
- `#/my-guild?preview=1`: sample member dashboard without changing actual membership.
- My Guild `/members`, `/missions`, `/settings`: roster, mission/reward concepts and founder-editable local guild settings. Preview query is supported on each section.
- `#/create`: three-step guild creation, validation and review.

All routes share navigation, breadcrumbs, responsive shells and persisted demo state. Hash routing supports refresh, direct links and browser history with static hosting. Guild profile links can be copied locally; the site does not send invitations.

Workspace validation: 14 routes/states at 1440, 768 and 390 pixels (42 renders), no document overflow or JavaScript errors. Search, bookmarks, no results, guild profile navigation, join, leave, applications/cancellation, three-step creation, founder settings and reload persistence tested in Chromium.

## Walkthrough-aligned guild journey
The current flow follows the user-supplied CreateGuild and XOXContent recordings, with the user's later direction taking precedence: guilds have no member limit, and numeric eligibility/progression/reward parameters remain adjustable demo settings.

- Creation: identity, preset/uploaded emblem, multiple tags and live preview; membership mode and optional volume/VIP/assets settings; editable rules, announcement and launch confirmation. Founder welcome leads to Dashboard.
- Membership: profile context, confirmation/application, welcome and Dashboard. Local applications remain cancellable.
- Dashboard: team metrics including Guild Points, progression, Battle/Forum entry points, Daily/Weekly/Event missions, local daily check-in and pinned community notice.
- Battle: shares and gap derived from the same fixture values, combined-volume milestone states, sample personal contribution and match-volume contributor roster. No live event or claim is represented as genuine.
- Forum: `#/forum/:guildId`, pinned announcement, role-labelled sample roster, local message composer, escaped content and founder-editable pinned notice. Messages are never sent to other people and no simulated reply is generated.
- Settings: local founders can edit community rules, announcement and optional entry values. No capacity control exists.
- Existing local draft guilds migrate to a neutral New guild label; no invented starting tier/capacity is imposed.

Validation for this revision: JavaScript syntax; DOM-driven integration checks across 16 routes/states; joins/welcome, task tabs, local check-in, local forum posting, escaping, application cancellation, three-step creation, presets/tags, settings, pinned notice and persisted data. CSS parsed through the DOM stylesheet parser. A browser automation session was unavailable in this revision, so fresh rendered visual/responsive QA remains unverified. Previous revision's browser checks do not establish this revision's visual result.

## Competition-first redesign
- New Guild Open landing page with original generated metallic-shield artwork (art file retained locally), a primary multi-guild leaderboard and separate views for total volume, per-member contribution and participation. These are perspectives for the prototype, not finalized competition scoring.
- Competition hub covers preparation, demo leader entry, in-progress contributions and post-season provisional/review/final previews. Roster, transfer, copied-volume and settlement rules are explicitly pending design.
- Guild Leader strategy discovery and profiles show clearly illustrative returns, drawdown, history and positions. Copy trading is independent from membership. Three-step simulated copy setup records allocation, position-sizing choice, per-position cap, plan loss threshold and leverage cap. Plans can be paused, resumed and stopped. No wallet, actual funds, orders or execution are connected.
- A single accessible non-modal chat dock lives at the bottom right across every route. It preserves open state, message drafts and channel selection during navigation; drafts are isolated per room. Season lounge and guild conversation messages save only on this browser. No external messages or fake automatic replies are sent. Minimize and Escape return to the main experience.
- The team dashboard now leads with season standing, the next guild gap, cumulative team volume and personal contribution, with optional leader strategy exploration. Two-guild Battle is a separate progression challenge, including a result/progression preview, without affecting main season standings.
- Official XOX logo remains sourced from the provided brand PDF; the new competition illustration contains no invented XOX logo.

Validation: 20 routes/states rendered through the DOM; all JS syntax and stylesheet parsing; leaderboard metrics/search, cross-page chat/draft persistence, room separation and escaped messages; leader filtering; copy plan allocation/limit calculations, confirmation, pause/resume/stop; membership/dashboard; sample result-state switching; founder entry and browser-local persistence. Fresh real-browser rendered desktop/mobile verification is unavailable in this environment and remains unverified. All trading/performance/event states are explicit demos.

## Guild-member-only copy policy (supersedes earlier independent-copy discovery)
The user's clarified model is now authoritative: every leader's performance is public, including on the homepage, but only members of that leader's guild can configure copying. Public cards and leader profiles link to performance and guild discovery; the action to configure a plan lives inside the matching guild's member workspace. Joining does not activate copying automatically. A guild leader does not copy their own strategy.

Eligibility is checked at setup entry, each setup transition, final submission and plan resume. Preview mode does not grant actual demo membership. A membership change pauses ineligible running demo plans and removes resume actions; a rejoin still requires explicit resume. Historical plans can be reviewed or stopped. These are frontend prototype controls and do not replace future server-side membership checks or actual execution controls.

The new homepage headline explains team trading directly: Trade Together / Climb Together. Banner artwork uses equally sized guild shields around one shared circular arena, with contribution paths feeding the common field. There is no podium and no predetermined winner. Multiple emblems represent the open multi-guild field; their count is decorative, not a fixed competition limit. The main season leaderboard remains above leader-performance discovery, with two-guild Battle as secondary progression content.

Validation: 16 current routes/states; public cards/profile contain no copy-setup action; anonymous, preview-only and foreign-guild attempts denied; matching member setup, pause/resume, membership-loss auto-pause, forged resume denial, rejoin explicit resume, submit-time membership recheck, and persistent chat tested through DOM integration. JS syntax and all stylesheet parsing passed. Fresh browser-rendered visual QA remains unavailable.

Guild World homepage update (2026-11-03)
- Three equal projected community territories: The Huddle, Memeland and Hilumia; independent transparent artwork supports later expansion.
- Collapsible map remembers display preference; supports fullscreen, pointer pan, keyboard pan, zoom and reset.
- Own guild opens member dashboard; visitor preview opens public community introduction and leader performance. Community member routes are gated in the demo UI.
- Member chat room selection is restricted to lounge and actual current guild. Copying requires actual same-guild member status.
- Original demo memberships are preserved; no automatic reassignment to a featured community.
- Illustrative avatars and sample performance are not official community appointments or live data. No real membership, funds or messages are transmitted.
- Validation: JSDOM integration checks cover 12 routes, plot equality, collapse persistence, fullscreen, zoom/reset, visitor selection, member navigation, private member route, chat isolation and copying eligibility. A fresh real-browser visual inspection was unavailable in this environment.

Shared-world environment and battle journey (2026-11-03)
- Painted shared ocean, reefs, basalt coasts, mist, navigational beacons and connective routes now sit behind independent equal-sized community districts.
- A state-aware next-action rail connects discovery, member home, briefing, head-to-head battle and personal season story.
- Sample battle stages: preparation, pairing, active match, provisional review and final result. Briefing acknowledgement precedes advancement.
- Members may create explicitly fictional contribution records with bounded inputs. No exchange API, order, wallet or financial reward is connected.
- Saved round badges provide cosmetic tower progression; duplicate awards are prevented. Starting a new round archives the previous contribution journal.
- Team registration remains leader-managed. Public leader results, same-guild member-only copying and private chat restrictions are preserved.
- Integration validation covers the full sample round, archived history, map interactions, visitor/member boundaries and copy eligibility. Real-browser visual QA remains unavailable.

Unified visual redesign (2026-11-03)
- Replaced the separate island/tower cutouts on the homepage with one art-directed environment: four community districts, continuous sea, shared twilight, reefs, contact shadows, ships and connected docks.
- Preserved the approved XOX tower, summit O symbol, Memeland's angular 9GAG sail and Bunny Warriors' rabbit/fox towers. All original district art remains available for interior headers and later world revisions.
- Added Bunny Warriors as one community/one guild with public Visit, member entry, private chat and an illustrative member-only leader strategy.
- Four territory interaction regions share one geometry and area; world-layout.json documents map coordinates and expansion constraints. New communities require an updated art composition and matching registry, rather than squeezing existing districts.
- Homepage now flows from the world to a compact next action, featured head-to-head match, season standings, community directory and public leaders. Reduced repeated card layouts, bright outlines and labels.
- Functional checks cover all four community routes, equal interaction regions, map controls, Bunny join/member routing/chat/copy access, four-community standings and the full sample battle journey. The unified illustration was inspected directly. Fresh real-browser layout screenshots remain unavailable in this environment.

Eight veiled districts (2026-11-03)
- Expanded the integrated world art to twelve equal-allocation community territories: four revealed and eight city silhouettes behind atmospheric fog.
- Eight independent labels read exactly ???. Selecting one opens an unrevealed-community explanation with no invented identity, member count, ranking, leader or joining action.
- Reserved map regions remain separate from actual guild records; discovery, rankings and membership continue to show only the four revealed communities.
- Adjusted map/label coordinates to inspected artwork, preserved a full-world default view, and updated world-layout.json for later community reveals.
- Checks: eight veiled labels and explanation interactions; twelve identical territory geometries/areas; four real standings entries; unchanged membership during all veiled-city interactions; map collapse/expand plus existing member access and battle journey checks. Real browser layout QA remains unavailable.

Trader-first homepage (2026-11-03)
- Re-centred the first screen on joining a community and competing, with a restrained XOX tower visual and an honest event summary. Schedule, rewards and final scoring remain unannounced.
- Anonymous visitors reach searchable community cards directly after the hero; each offers profile review and joining. Invite links/IDs resolve to a guild profile before joining and show errors for unknown guilds.
- Actual members receive a personal guild panel with season position, stage-aware opponent, simulated round contribution, trade preview, team chat and next-step actions. No opponent is invented before sample matchmaking.
- Season standings and public leader performance remain visible. The twelve-territory world is moved lower, defaults to collapsed under a new preference key, and loads its artwork lazily; users can still expand, pan and zoom it.
- Validation: anonymous/member state changes, search and reset on both home and discovery, valid/invalid invite review, joining, trade preview, member chat, contribution/opponent refresh, map controls and eight veiled entries, membership/copy boundaries and eleven subpage routes. Real-browser visual QA remains unavailable.

Community identity and Pudgy naming (2026-11-03)
- The community/guild is Pudgy Penguins; The Huddle is stored separately as its city. The existing huddle ID, membership, chats, journal and copy eligibility remain unchanged. Searching either name finds the guild; map city labels may use The Huddle.
- Replaced the illustrative PP avatar with a transparent-background adaptation of the user-provided blue penguin PFP. The same character now appears as the guild avatar, restrained repeated print and decorative mascot in relevant community surfaces.
- Community discovery cards use individual city cover artwork. Pudgy additionally uses its character print, ice-blue palette and home-city label.
- Pudgy members receive a community-specific homepage hero and subtle member-board pattern; public/member guild headers, join review and welcome screen share the same identity. Trading, battle and chat controls keep the shared XOX UI.
- Validation covers naming/city separation, both search terms, avatar path, themed cards/member homepage/guild header, join and welcome artwork, existing join/chat/copy access and battle/contribution flows. Asset alpha inspected; real-browser visual QA remains unavailable.

Persistent season leaderboard layout (2026-11-03)
- Moved competition summary to an independent horizontal strip above the homepage columns. Replaced all anonymous/member homepage banner imagery with a restrained typographic competition banner; no tower, city or PFP layer appears in it.
- Desktop: participation/search/member journey on the left, a sticky season leaderboard on the right. Current guild highlighting, exact gap to the immediately higher guild, volume/per-member/participation comparisons and links to full standings share one data calculation. Metric selection stays in sync with the full rankings page.
- Smaller screens: a sticky compact ranking summary opens an expandable standings list. The user's rank and gap update with the selected comparison metric.
- Head-to-head battles remain in the main content, separate from the season board. Preserved community PFPs/cards, public leader performance, joining, member chat and optional copying.
- Moved the interactive map off the homepage into #/world with navigation/footer entry points. The standalone map retains four revealed guilds, eight veiled cities, fullscreen/pan/zoom and own-guild navigation.
- Validation covers independent event placement, no homepage banner images/map, exact own rank/gaps across comparison metrics, join/search/trade preview/chat/copy boundaries, standalone map and fullscreen persistence, plus eleven subpage routes. Actual browser geometry/visual inspection remains unavailable.

Navigation reduction and seven guild tiers (2026-11-03)
- Primary guild navigation now contains Overview and My Guild. Competition, full standings, guild leaders, Guild World, the rank guide and guild creation live in one native More disclosure menu; outside click and Escape close it.
- Removed the repeated banner rules shortcut, homepage footer world shortcut, duplicate founder CTA and personal-position leaderboard link. The persistent standings panel remains the primary ranking entry.
- Introduced Bronze, Silver, Gold, Platinum, Diamond, Master and Legend in one black-titanium / machined-metal badge family. Tier silhouette, chevrons and upper ridges distinguish ranks; muted metal accents transition to XOX blue at the upper tiers. No ribbons, rainbow reflections or feathered wings.
- Added a seven-tier guide with a material concept study and simplified scalable interface icons. Integrated badges into discovery cards, leaderboard rows, join review, member panels, community headers and guild progression.
- Guild tier is explicitly separate from season placement. No thresholds or production promotions were invented; new guilds retain unranked status pending rules.
- Validation: reduced navigation/duplicate links, seven ordered tiers, badge integration across relevant UI states, metric refresh, join and nine routes/copy boundaries; all seven SVG assets parse. Badge art inspected directly; real-browser layout QA remains unavailable.

Rank badge redesign v2 (2026-11-03)
- Removed all military stripe / chevron accumulation. Seven tiers now have distinct silhouettes: low pentagon, narrow kite, broad hexagon, wide-shoulder octagon, vertical rhombus, split blade and interlocking obsidian frame.
- Separated Silver's neutral brushed steel from Platinum's smoked alloy and petrol-teal inserts. Higher tiers use ice-crystal facets, indigo cobalt ceramic/titanium, and obsidian/white-gold material identities.
- Added dedicated compact SVG assets rather than scaling the material version down. Leaderboard rows use 20px compact icons; chips use the compact version; large displays retain faceted material vectors.
- Updated concept artwork and the rank guide with actual-size 20px/24px and grayscale previews. Large concept study and vector interface execution are explicitly identified.
- Validation: seven distinct compact contours and accent colors; fourteen SVG files parse; compact selection in leaderboard and small chips vs large gallery assets; existing nav, join, badge integration, metric refresh and access checks. Inspected the material board and rendered vector examples. Real-browser layout QA remains unavailable.

Approved shared-shield badges and readability pass (2026-11-03)
- Replaced the rejected different-silhouette system with one exact shared outline in all compact/vector badges, preserving existing guild tier state.
- Added seven transparent production material artworks following the reviewed copper, steel, gold, platinum/petrol, crystal-inlay, reinforced Master and XOX-brand Legend direction. Master has a broader cobalt/indigo ceramic band, heavier armor and silver O; Legend reserves the full electric-blue O and white dot.
- Larger badge placements now use material WebP artwork. The leaderboard/chips use purpose-built compact SVGs matching the same shield and palette. Updated the seven-tier study and guide text.
- Raised undersized fixed font declarations across existing styles to at least12px. Added a responsive readability layer:14px body copy,16px inputs,14px leaderboard names/values and larger controls; widened the desktop rail and allowed labels/actions to wrap. Checkbox/radio controls remain proportionate.
- Preserved the simplified navigation, independent event strip, image-free homepage banner, member workflow and standalone world.
- Verification: functional navigation/join/badge/ranking/access checks; computed type checks for14px copy,16px inputs,14px leaderboard names; identical outline validation across14 vectors; no fixed font-size below12px in stylesheets; transparent alpha and direct visual inspection of all7 production artworks. Browser layout/geometry checks remain unavailable.

Guild team workspace (2026-11-03)
- Rebuilt own-guild routes into one working page: identity/role/tier, prominent next/current matchup, leader-pinned instructions, team/personal contribution dashboard, concise objectives, guild copying and searchable members. Removed self-entry/discovery/next-move panels and member/copy/mission tabs.
- The season leaderboard remains on the right for own guild and public visits; smaller screens retain the compact ranking disclosure. Public visits do not expose team pins or member rosters.
- Existing sample guilds show an explicitly labelled upcoming fixture; new/unmatched guilds show an unassigned opponent. Live/review/final sample stages use the existing round totals. No fabricated live timer is introduced.
- Leader-only local controls edit the team pin and open/close a selected Leader or Analyst strategy. Members independently configure allocations/limits using the existing review flow. Disabling copying or changing the provider pauses affected plans; provider-specific eligibility prevents resuming an obsolete strategy.
- Analyst selection uses a sample roster member, with provider identity tied to that member. Availability never opts members in. No live registrations, orders, rewards or external messages are sent.
- #/my-guild?preview=1 offers a read-only Pudgy Penguins member layout without changing membership. Existing my-guild member/mission/copy links resolve to the single workspace; settings remain a contextual membership option.
- Validation covers preview/actual guild layout, sample opponent, pin edit/escaping, member search/chat, owner policy controls, independent copy setup, pause/resume/provider change/disable, analyst identity, public privacy and legacy subroutes. Real-browser visual/geometry verification remains unavailable.
