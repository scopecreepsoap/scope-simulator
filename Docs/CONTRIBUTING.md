# Contributing to SCOPE

Thank you for your interest in contributing to the SCOPE UX Simulator! This guide outlines the process for adding new question diagrams to the platform.

The application is built on an extensible plugin system. Each diagram is a self-contained module that includes its React component and the logic for evaluating its answers.

---

## How to Add a New Diagram Plugin

Follow these steps to create and integrate a new diagram.

### 1. Create the Plugin Folder

All diagram plugins live in `src/plugins/diagrams/`. Create a new folder for your diagram using a unique, descriptive, kebab-case name.

`src/plugins/diagrams/your-new-diagram-name/`

### 2. Create the Diagram Component

Inside your new folder, create your React component file (e.g., `YourNewDiagram.tsx`).

* The component **must** accept a standard set of `DiagramProps`.
* It should use the `mode` prop to conditionally render interactive elements (like sliders or buttons), ensuring they are hidden on the results page (`mode="display"`).

```typescript
import React from 'react';
import type { DiagramProps } from '../../../types/plugin';

export const YourNewDiagram: React.FC<DiagramProps> = ({ initialValue, onAnswerChange, mode }) => {
  const isInteractive = mode === 'interactive';

  // Your component logic here...

  const handleClick = () => {
    if (!isInteractive) return;
    // When the user answers, call onAnswerChange with a JSON-serializable object.
    onAnswerChange({ yourAnswer: 'some-value' });
  };

  return (
    <div>
      {/* Your diagram's JSX */}
      {isInteractive && <button onClick={handleClick}>Submit</button>}
    </div>
  );
};
```

### 3. Create the Plugin Contract

Create an `index.ts` file in your plugin folder. This file defines the plugin contract that SCOPE will use to load and evaluate your diagram.

```ts
import { YourNewDiagram } from './YourNewDiagram'
import type { DiagramPlugin } from '../../../types/plugin'

const yourNewDiagramPlugin: DiagramPlugin = {
  component: YourNewDiagram,

  evaluator: {
    printAnswer: (answer) => {
      if (!answer?.yourAnswer) return 'N/A'
      return `${answer.yourAnswer}`
    },

    canaryCheck: (answer, parentQuestion) => {
      return 'n/a'
    },
  },
}

export default yourNewDiagramPlugin
```

### 4. Adding a Level 3 (Contextual) Question

To add a Level 3 question (highly contextual):

* In `public/questions.json`, set `"level": 3` and include a `"context": [...]` array.
* Ensure your diagram component can handle the `context` prop.
* Add a unit test in `src/__tests__/` to verify correct handling of the `context`.

### 5. Add Your Question to the Test

Update `public/questions.json` with a new question object that uses the `diagramKey` matching your plugin folder name.

---

## Example Walkthrough: The `quadrant-selector` Plugin

### Component: `QuadrantSelectorDiagram.tsx`

```tsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './QuadrantSelectorDiagram.module.css'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt'
// 1. Import the standard 'DiagramProps' type. All diagram components must accept these props.
import type { DiagramProps } from '../../../types/plugin'

// These maps help translate between the quadrant's index (0-4) and a human-readable name.
const QUADRANT_MAP: Record<number, string> = { 0: 'top-left', 1: 'top-right', 2: 'bottom-left', 3: 'bottom-right', 4: 'center' };
const NAME_TO_INDEX_MAP: Record<string, number> = { 'top-left': 0, 'top-right': 1, 'bottom-left': 2, 'bottom-right': 3, 'center': 4 };

export const QuadrantSelectorDiagram: React.FC<DiagramProps> = ({ initialValue, onAnswerChange, mode }) => {
    // Internal state is used for UI animations, like hover effects and icon positioning.
    const [hovered, setHovered] = useState<number | null>(null)
    const [selected, setSelected] = useState<number | null>(null)
    const [iconPos, setIconPos] = useState<{x: number, y: number} | null>(null)

    // 2. A useEffect hook syncs the component's visual state with the saved answer (`initialValue`).
    // This ensures the diagram correctly displays the saved answer on the results page or when navigating back and forth.
    useEffect(() => {
        const selectedQuadrantName = initialValue?.quadrant as string | undefined
        if (selectedQuadrantName) {
            setSelected(NAME_TO_INDEX_MAP[selectedQuadrantName] ?? null)
            setIconPos(initialValue?.pos ?? null)
        } else {
            setSelected(null)
            setIconPos(null)
        }
    }, [initialValue])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        // The `mode` prop is used to disable interactions on the results page.
        if (mode === 'display') return;

        // This component contains complex internal logic to calculate the icon's
        // position and ensure it is not cut off by the container edges.
        const rect = e.currentTarget.getBoundingClientRect();
        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;
        const iconHalfSize = 42;
        let x = rawX;
        let y = rawY;

        const newQuadrantName = QUADRANT_MAP[index]

        // 3. When the user clicks, call the `onAnswerChange` callback prop.
        // This sends the answer data back to the central store. The data should be a simple object.
        if (selected === index) {
            // If the user clicks the same spot, deselect it.
            onAnswerChange(null)
        } else {
            // Otherwise, record the new selection.
            onAnswerChange({ quadrant: newQuadrantName, pos: { x, y } })
        }
    }

    // ...the rest of the rendering logic...

    return (
        // ...JSX for the diagram...
    )
}
```

### Plugin Contract: `index.ts`

```ts
import { QuadrantSelectorDiagram } from './QuadrantSelectorDiagram'
import type { DiagramPlugin, CanaryStatus, QuestionConfig } from '../../../types/plugin'

const quadrantSelectorPlugin: DiagramPlugin = {
  component: QuadrantSelectorDiagram,

  evaluator: {
    printAnswer: (answer) => {
      if (!answer?.quadrant) return 'N/A'
      return (answer.quadrant as string).replace('-', ' ')
    },

    canaryCheck: (answer, parentQuestion): CanaryStatus => {
      const quadrant = answer?.quadrant as string | undefined
      if (!quadrant) return 'fail'

      switch (parentQuestion.canaryIntent) {
        case 'close':
          if (quadrant === 'top-right') return 'pass'
          if (quadrant === 'top-left') return 'unsure'
          return 'fail'

        case 'back':
          if (quadrant === 'top-left') return 'pass'
          return 'fail'

        default:
          return 'n/a'
      }
    },
  },
}

export default quadrantSelectorPlugin
```

---

## Running Tests

After adding a new question, run the data integrity tests:

```bash
npm test
```

---

## Using AI to Accelerate Development

You can use an AI assistant to help create new diagram plugins. To get the best results, you need to provide the AI with the right context about the project's architecture.

### 1. Providing Context to the AI

Copy and paste the following summary to give the AI an overview of the application's design.

> The project is a "SCOPE UX Simulator" built with React, TypeScript, and Vite. It uses a plugin architecture for question diagrams and Zustand for global state management.
>
> **Key Concepts:**
> * **Plugin Architecture**: All diagrams are self-contained modules located in `src/plugins/diagrams/`. The application uses `import.meta.glob` to dynamically find and register all plugins at startup.
> * **Plugin Contract**: Every plugin must export a default object that conforms to the `DiagramPlugin` interface. This contract includes the React `component` and an `evaluator` object.
> * **Component Props**: Every diagram component must accept a standard set of props defined in the `DiagramProps` interface. This includes:
    >     * `initialValue`: The saved answer data from the store.
>     * `onAnswerChange`: A callback function to save new answer data to the store.
>     * `mode`: Either `'interactive'` (for the live test) or `'display'` (for the results page). The component must hide instructions and controls when `mode` is `'display'`.
>     * `context`: Optional data for Level 3 questions.
> * **Evaluator**: The `evaluator` object contains two key functions:
    >     * `printAnswer`: Formats the raw answer object into a human-readable string for the results page.
>     * `canaryCheck`: An optional function to validate answers for canary questions based on `parentQuestion.canaryIntent`.

### 2. Core Files to Provide

For the best results, provide the AI with the following key files. They serve as the ground truth for the application's architecture and coding patterns.

* `src/types/plugin.ts` (Defines the `DiagramPlugin` and `DiagramProps` interfaces).
* `src/stores/scopeStore.ts` (Shows how state is managed).
* `src/components/DiagramRenderer.tsx` (Shows how plugins are rendered during the live test).
* `src/components/ScopeResults.tsx` (Shows how plugins are rendered on the results page).
* `public/questions.json` (Shows how question data is structured).
* **An Existing Plugin**: Provide the folder for an existing plugin (e.g., `src/plugins/diagrams/quadrant-selector/`) as a concrete example to follow.

### 3. Sample AI Prompt

Here is a sample prompt you can adapt to ask an AI to create a new diagram plugin.

> **Prompt:**
>
> You are a UX computer scientist specializing in modern React, TypeScript, and Vite development. Your coding practices are clean and you follow SOLID, DRY, and KISS principles.
>
> I am contributing to a UX simulator with a plugin architecture. I've provided the core architectural files and context above.
>
> My task is to create a new diagram plugin called **`yes-no-selector`**.
>
> **Requirements:**
> 1.  The diagram should display two large, clickable buttons: one labeled "Yes" and one labeled "No".
> 2.  When a user clicks a button, it should become visually selected. Clicking again should deselect it.
> 3.  The component must correctly implement the `DiagramProps` interface (`initialValue`, `onAnswerChange`, `mode`).
> 4.  In `'display'` mode, the buttons should not be clickable.
> 5.  The `onAnswerChange` function should be called with an object like `{ selection: 'yes' }` or `{ selection: 'no' }`.
> 6.  The `evaluator`'s `printAnswer` function should return "Yes" or "No".
>
> Please provide the complete code for the following new files, following the patterns in the provided examples:
> * `src/plugins/diagrams/yes-no-selector/YesNoSelectorDiagram.tsx`
> * `src/plugins/diagrams/yes-no-selector/YesNoSelectorDiagram.module.css`
> * `src/plugins/diagrams/yes-no-selector/index.ts`
### 4. Adding a Level 3 (Contextual) Question

Level 3 questions are designed for highly unique and specific test scenarios that cannot be handled by the standard, reusable diagrams. They allow a contributor to pair a custom set of data with a custom diagram component that is purpose-built to interpret that data.

#### The `context` Property

To enable this, the `QuestionConfig` allows an optional `context` property.

* **Purpose**: The `context` property is an array that holds any custom data you need to pass from your `questions.json` file directly to your diagram component's props.
* **Flexibility (`any[]`)**: The type for this property is intentionally set to `any[]`. This provides maximum flexibility, allowing contributors to design a custom data structure that precisely fits their unique testing scenario. For example, if you were creating a card-sorting test, your context might look like this:

    ```json
    // in public/questions.json
    {
      "level": 3,
      "prompt": "Where would you expect to find the option to change your password?",
      "diagram": ["card-sorter-diagram"],
      "context": [
        { "id": "card1", "label": "User Profile" },
        { "id": "card2", "label": "Notifications" },
        { "id": "card3", "label": "Account Settings" },
        { "id": "card4", "label": "Sign Out" }
      ]
    }
    ```

*Card-sorting example provided by David Garcia.*

#### Contributor Responsibilities

Because Level 3 questions are custom and powerful, they come with a higher degree of responsibility for the contributor.

1.  **Custom Data & Component**: You are responsible for both designing the data structure inside the `context` array and building a diagram component that can correctly receive and render that specific data.
2.  **Robust Implementation**: Your diagram must handle the `context` prop gracefully. It should not break if the `context` array is empty or malformed, as the core SCOPE application does not have a global error state.
3.  **Mandatory Testing**: A new unit test for your Level 3 diagram is **required**. This test must be added to the `src/__tests__/level3.test.tsx`. This file contains examples for testing contextual diagrams. Your test should render your diagram with mock `context` data and assert that it displays correctly and that user interactions are handled as expected. Refer to the existing suites in that file for a concrete example.

Understood. Here is a new section for your `CONTRIBUTING.md` file that incorporates the design principles from the provided mockups.

---
## Design Principles & Mockups

Our design philosophy centers on **abstraction** to create clear and focused user tests. When creating new diagrams, it's crucial to adhere to the established visual language found in the project mockups.

* **Focus on Abstraction**: Diagrams should represent user interfaces in a simplified, abstract form. Instead of creating high-fidelity, realistic UI, use basic shapes, colors, and gradients to represent elements like buttons, fields, and windows. This approach isolates the specific UX concept being tested—such as associating an action with a part of a dialog—without distracting the user with irrelevant details.
* **Follow Visual Language**: Maintain consistency with the existing color palette, gradients, and shapes shown in the mockups. This ensures a cohesive experience throughout the simulator.
* **Reference Mockups**: All reference designs and examples of this abstract style can be found in the project's mockup folder. Before starting a new design, please review the examples located at `./Mockups/v01/_png` to understand the visual direction.

A typical way to conclude a contributing document is with a brief section acknowledging the value of community contributions. Here is a new section you can add to the end of your `CONTRIBUTING.md` file.

---
## Community Acknowledgement

Your contributions are _essential_ to this project. Every plugin, bug fix, and suggestion is valued. Thank you for dedicating your time and expertise to help support SCOPE and advance the field of UX research.