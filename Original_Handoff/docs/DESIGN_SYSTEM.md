# XOX Guild — Design Direction v2

## Brand essence

**Premium Fintech × Futuristic 3D × Competitive Guild Trading**

Brand-level slogan from project source: **Easy to Play · Fun to Trade**.

Design goal: users should feel they are joining an elite *trading team*, not a generic RPG guild. Highly legible trading terminal UI with selective cinematic accents.

## Design priorities

- Dark trading terminal shell with disciplined grid and clear hierarchy.
- High-contrast electric blue highlights, monochrome/silver materials; gold/silver/bronze only for rank/achievement meaning.
- Reserve 3D hero-quality visuals for the Hero, battle emblems, and Create Guild CTA. Normal data views stay calm and compact.
- Robust typography and tabular numeric alignment; never fake live market/guild results.
- Official brand logo, sourced from existing code/assets and never improvised or AI-redrawn.

## Provisional palette (approximation, verify against codebase)

- Core black: `#08090C`
- Surface/navy: `#071427`
- Accent blue: `#1479FF`
- Text: `#FFFFFF`
- Muted panel: `#EDF0F5` for light corporate surfaces only
- Green/red reserved for positive/negative performance indicators, not decorative UI.

## Desktop homepage recommended structure

1. **Top navigation:** retain existing XOX shell; clearly selected Guilds state.
2. **Hero:** large headline 'TRADE TOGETHER. COMPETE AS A GUILD.' with clear 'Find a Guild' and secondary 'Create Guild' actions. A strong XOX-approved 3D guild emblem / light trails motif. Avoid overuse of generic sci-fi art.
3. **Market/guild metrics:** optional small 3–4 KPI strip if metrics are real and queryable; hide or show safe empty state otherwise.
4. **Guild rankings:** preserve readable horizontal table and underlying data; 14D / 30D / all-time options only if supported. Clearly differentiate top 3; tabular alignment; trend indicator only when real data exists.
5. **Guild Battle:** high-visibility side panel only if this is a confirmed feature; show live matchup, comparison, countdown and rewards using real data; if not available, show an accurate scheduled/empty state, not fictitious live information.
6. **Find a Guild:** compact discovery cards with consistent columns: name/emblem, tier, real volume/performance, members/capacity, eligibility, real Join/View actions.
7. **Recommended for You:** recommendations must explain eligibility or ranking rationale; if personalized algorithm does not exist, label as 'Explore Guilds' or evidence-based 'Featured Guilds'.
8. **Create Guild CTA:** reuse strong blue/black cinematic motifs from existing lower banner; avoid making every card equally shiny.

## Visual corrections to existing homepage

- Reduce repeated equal-weight grey cards; guide eye from hero → rankings/battle → discovery.
- Fix misaligned card labels and values (e.g. join policy appearing underneath 'Guild Points').
- If 'Top 10' header is shown, render ten when available; otherwise title should reflect actual results or the list should include a clear 'View full ranking'.
- Differentiate Discovery from Recommended — avoid redundant duplicated cards without a rationale.
- Validate tier labels, capacities, totals and labels against the source API.

## Typography and effects

- Clean condensed bold display font for big headings, readable contemporary sans for UI text; use existing licensed fonts if any.
- Typography should be readable at 100% browser zoom without relying on images of text.
- Subtle blue rim lighting, thin borders, depth and controlled bloom; blur only behind decorative art, never data labels.
- Respect `prefers-reduced-motion` and maintain visible keyboard focus.

## Responsive behavior

- Desktop: left main ranking area and right battle panel; discovery/recommendations underneath.
- Tablet: stack ranking and battle; allow horizontal scrolling of dense data tables only within their contained panel.
- Mobile: navigation adapts, hero typography scales, cards stack, table becomes accessible compact list if necessary, actions remain reachable.

## Success bar

Design-review aspiration: 9+/10 for brand fidelity, visual hierarchy, product clarity and implementation quality. This is a subjective target, not a verified usability score.
