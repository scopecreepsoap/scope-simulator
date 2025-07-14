# Case Study: menu-settings

## Question Prompt
> Where would you expect to access Settings in this interface?

## Diagram Used
**Plugin**: `menu-settings-selector`

This diagram presents an abstract application interface with multiple potential access points for a menu. It combines elements of **traditional menu bars** (e.g., Windows/macOS top menus) and **web-style bottom toolbars**, creating a hybrid layout. When the user hovers over any hotspot, a **menu panel** opens, and only on click does a gear icon appear inside to represent “Settings.”

There are 7 possible menu bar locations, each with a corresponding split dropdown panel. This results in 14 total answer zones to account for every corner and edge alignment commonly seen in software UIs.

## UX Concept Tested
This question tests **spatial expectations for application settings**, specifically how users infer the location of configuration or preferences access when:

- No labels or visible icons are shown by default
- Menu panels are used to simulate both native and web contexts
- Gear icon appears only **after click**, not as a visual affordance

The test isolates whether a user’s internal model of “Settings” is tied to a **position**, not a label.

## Level & Role
- **Level**: 2 (Structural)

This is a mid-level structural question that requires users to **interpret layout and interface genre** before making a selection. It goes beyond instinct, prompting platform-based reasoning.

## Design Intent
The design deliberately blends **desktop** and **web application** patterns:

- The **top bar** mimics menu bars found in Windows, macOS, or Linux desktop apps.
- The **bottom bar** evokes UI placement seen in many web-based tools and dashboards.

Each clickable area opens a neutral menu panel (with a gear icon revealed post-click). No menu text, icons, or tooltips appear beforehand — emphasizing **position over styling**.

## What This Question Reveals
- Whether users prefer **top-left** (Apple-style), **top-right** (web-style), or other regions
- If desktop vs web exposure shifts spatial assumptions
- Whether corner-based heuristics override actual usage familiarity
- How much **menu bar context** influences interpretation, even abstracted

## Known Considerations
- Some users may miss the gear icon entirely, since it only appears after a click
- Bottom bar alignment may cue web-heavy users toward lower selections
- No option is “wrong,” but patterns provide clustering insights

## Summary
This Level 2 perceptual question uncovers where users believe **Settings** should live within a hybrid interface layout. By blending macOS/Windows-style top menus with web-style bottom bars — and showing the gear icon only on selection — the test captures real-world variance in spatial preferences for application configuration access.
