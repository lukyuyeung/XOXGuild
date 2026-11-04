# CODEX IMPLEMENTATION BRIEF — XOX Guild Homepage 9+/10

You are the senior UI/UX engineer and product designer working on **XOX Perpetual DEX Guilds**. Upgrade the existing Guild homepage to an exceptional **Premium Futuristic Trading** experience while preserving all real behavior and architecture.

## Source references

- `../assets/About_XOX_Q3_2026.pdf`: brand/product framing, not a publishable copy source.
- `../assets/Guild_Current_Walkthrough.mp4`, `Guild_Current_Top.png`, `Guild_Current_Bottom.png`, `Guild_Current_Contact_Sheet.png`: actual old homepage.
- `../assets/Guild_V2_Visual_Concept.png`: target art direction / information hierarchy, **not** a pixel-perfect specification or evidence of real data.
- Live demo: https://xox.exchange/demo/guild_web/index.html
- Official site: https://xox.exchange

## First steps (mandatory)

1. Explore the repository/framework/build scripts, file tree, routes, CSS/design tokens, available original image/logo assets, and current Guild feature components.
2. Run the project using existing scripts. Capture baseline screenshots at desktop (1440px), tablet (768px), and mobile (390px) if environment allows. Inspect interactions and console/network errors.
3. Identify APIs vs fixture/mock data. Make a short inventory of what is working, what is demo-only, and which new v2 features need backend support.
4. Propose a component-level implementation plan, then implement it within current stack. **Prefer editing existing source to rewriting the app.**

## Core redesign

### A. Hero / identity
- Premium black and navy backdrop, reserved electric blue glow and carefully crafted 3D shield or official guild assets (if supplied).
- Primary title 'TRADE TOGETHER. COMPETE AS A GUILD.'
- CTA 'Find a Guild' scrolls/navigates to functioning Guild Discovery; 'Create Guild' opens functioning existing flow.
- Do not embed generated faux XOX logo in UI. Use actual source asset.

### B. Ranking
- Preserve the data table and existing sort/ranking logic.
- Enhance top 3 status without reducing legibility; numbers align correctly; consider 14D/30D/All Time only if the backend supports them.
- Correct any mismatch of a 'Top 10' label vs number of rows shown; handle empty/loading/error states.

### C. Guild Battle spotlight
- Make a refined opposing guilds panel with emblems, clear score/volume measure, status, optional time remaining, result/reward details and one prominent 'View Battle' action.
- **Only show LIVE if backed by actual state.** If API/battle unavailable, show scheduled/coming soon or the existing supported view.
- Never hard-code the mockup’s volumes, 58.7/41.3, season or rewards as product facts.

### D. Discovery & recommendations
- Discovery cards must line up data labels with their actual values: tier, 14D volume, guild points when relevant, membership and join requirements.
- Join buttons should be genuinely connected to existing Guild actions and respect eligibility.
- Recommendation area should show honest reason tags; without personalized recommendation logic, label the area 'Featured' or 'Explore' instead of 'For You'.

### E. Create Guild banner
- Keep/promote existing polished lower CTA; align effects with hero; correct navigation to existing create flow.

## Guardrails

- Preserve existing smart-contract, wallet/authentication, trade, guild membership and reward logic.
- Avoid introducing new APIs or fake successful actions; build empty/skeleton/error UI if data unavailable.
- All claims/metrics must come from trusted data or be explicitly marked 'Demo'.
- No new unrelated colors, mascot, RPG character, generic cyberpunk city, or questionable crypto/financial promises.
- Keep all existing product copy localized where localization infrastructure exists.
- Follow accessibility (AA contrast where feasible, focus states, semantic controls, reduced motion) and responsive layouts.
- Do not make real functional UI text part of a background graphic.

## Verification / acceptance

- No broken existing Guild routes / working Join / Create / View actions.
- Desktop 1440px, tablet 768px, mobile 390px render without overflow/overlap.
- Ranking labels, stats, guild tier and membership data do not contradict one another.
- No false 'LIVE' or placeholder metric presented as genuine.
- Strong visual hierarchy: Hero > Ranking + Battle > Discover > Create Guild.
- Contrast readable; heavy 3D FX do not obscure data.
- Pass available lint/build/tests and fix obvious console errors.
- Provide before/after screenshots and a concise changelog, then list any backend-dependent remaining work.

## Ask only when blocked

If assets/API details are unavailable, implement the best faithful design using existing assets and safe empty states, and explicitly flag remaining unknowns rather than inventing project facts.
