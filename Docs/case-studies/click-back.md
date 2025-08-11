# Case Study: click-back

## Question Prompt
> Where would you click to go back?

## Diagram Used
**Plugin**: `quadrant-selector`

This diagram displays an abstract dialog box divided into four corner quadrants and a center area. No icons, labels, or interface elements are shown—only a softly styled grid with subtle radial ovals to guide spatial perception. Users are asked to click where they expect the "back" action to occur.

## UX Concept Tested
This question tests **spatial expectation and UI intuition** regarding the placement of a “back” button or action in dialogs. Specifically, it investigates:

- Whether users associate the **top-left** area with "go back"
- If users exhibit **cross-platform behavior carryover** (e.g., mobile vs desktop)
- Whether affordance perception exists in the absence of labels/icons

## Level & Role
- **Level**: 1 (Natural)
- **Type**: Canary
- **Intent**: `"back"`

This is a simple, intuitive question placed in the test to create a sense of comfort and familiarity. It serves as a **canary** to gauge whether users are behaving predictably in basic UI tasks.

## Canary Logic
The answer is evaluated with the following logic:

- `top-left`: ✅ Pass
- `top-right`: ⚠️ Unsure
- `anything else`: ❌ Fail

*Failing multiple canaries signals unreliability in the user’s answers and may disqualify the test results.*

## Design Intent
The `quadrant-selector` intentionally removes labels and affordances. It centers the user’s attention with layered radial gradients, encouraging instinctive behavior. The question requires no instruction reading—only spatial intuition.

### Encouragement through Ease
Because this question feels easy to most users, it creates a **positive momentum effect** during the test. Users feel confident in their understanding of the task, which can improve engagement and reduce early drop-off.

## What This Question Reveals
- Whether users expect the "back" action in the **top-left** even without labels
- How strong spatial UI schemas are in the absence of text
- If users are carrying **mobile-first navigation habits**
- Potential **cultural or platform biases** (e.g., RTL vs LTR reading direction)

## Known Considerations
- Some users interpret "go back" as "close," leading them to select `top-right`
- Small percentage of users may misinterpret due to non-standard UI backgrounds

## Summary
This question functions both as a **UX expectation probe** and a **test integrity canary**. Its simplicity is intentional, allowing users to exhibit natural instincts without distraction—making it a valid baseline in the SCOPE UX Simulator.
