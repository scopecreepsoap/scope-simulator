# Case Study: text-density

## Question Prompt
> When does this layout become most readable?

## Diagram Used
**Plugin**: `text-density`

This interactive diagram displays a block of abstract UI resembling stacked content rows. The user can **adjust a vertical slider** to change the **line height (spacing)** between these rows. A toggle labeled “Show Placeholder Text” reveals rotating lorem ipsum text that dynamically populates each row, allowing the user to evaluate real-world readability rather than pattern repetition.

The layout simulates a **UI or content section** that could appear in various software applications (e.g., settings menus, profile lists, or notifications).

## UX Concept Tested
This question tests the user’s **preference for line height spacing**, which directly impacts visual scannability, reading comfort, and perceived clarity.

Unlike prescriptive spacing rules used in design systems, this test prioritizes:
- **Natural preference** over compliance
- **Readability perception** under minimal instruction
- Impact of **real text** versus abstract shapes

## Level & Role
- **Level**: 2 (Structural)
- **Type**: Readability Preference

This is a higher-level structural test, as users must **evaluate layout comfort** through direct interaction rather than observation. The presence of actual (but randomized) text deepens the decision process.

## Design Intent
The slider allows fine-tuned control over line height to find the "just right" zone of readability. By enabling the placeholder text toggle, users can switch from abstract blocks to actual content to simulate how real interfaces feel at various spacings.

The **lorem ipsum updates with every slider interaction** to ensure users don’t fixate on content itself but evaluate spacing dynamics. Font size is locked to prevent bias from scale manipulation.

## What This Question Reveals
- Variance in user preference for **density vs space**
- Whether users prefer **compactness or clarity**
- If placeholder content affects perceived readability
- Potential **age, accessibility, or device-related trends** (e.g., older users favor more spacing)

## Known Considerations
- While there are design system recommendations (e.g., WCAG, Material), user preference may differ
- Users with low vision or dyslexia may favor different spacing
- Smaller monitors or higher pixel density displays may bias toward tighter spacing

## Summary
This test surfaces subjective comfort zones for **line spacing in software UIs**. By combining abstract spacing controls with real-time content and variability, it captures nuanced user preferences that may challenge rigid typographic defaults. This offers insight into what “readable” really means in varied, user-driven contexts.
