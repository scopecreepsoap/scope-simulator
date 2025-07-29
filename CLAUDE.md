# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the Vite development server
- `npm run build` - Run tests, type check, and build for production
- `npm run preview` - Preview the production build locally

### Testing & Quality
- `npm test` - Run all tests once (uses Vitest)
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint for code quality

### Working Directory
All commands should be run from the `scope/` directory, not the repository root.

## Architecture Overview

SCOPE is a React/TypeScript web application that provides an extensible UX testing platform focused on user intuition and visual perception. The architecture emphasizes modularity through a plugin system.

### Core Architecture Patterns

1. **Plugin System**: All interactive diagrams are self-contained plugins in `src/plugins/diagrams/`. Each plugin exports a React component and an evaluator following the `DiagramPlugin` interface.

2. **Dynamic Plugin Loading**: The registry (`src/plugins/registry.ts`) uses Vite's `import.meta.glob` to automatically discover and load all diagram plugins at build time.

3. **State Management**: Uses Zustand for global state (`src/stores/scopeStore.ts`). The store manages user progress, answers, and navigation through the test.

4. **Question Configuration**: Test flow is controlled by `public/questions.json`. Each question references diagram plugins by their folder name and can include contextual data for Level 3 questions.

5. **Time-based Question Selection**: The system dynamically selects questions based on user's chosen time limit (3, 5, 10, or 15 minutes) and difficulty level, prioritizing questions at the selected level and backfilling with lower-level questions if time permits.

### Key Interfaces

- `DiagramProps`: Standard props every diagram component must accept:
  - `initialValue`: Saved answer data
  - `onAnswerChange`: Callback to save answers
  - `mode`: 'interactive' or 'display' (for results page)
  - `context`: Optional data for Level 3 questions

- `DiagramPlugin`: Contract for each plugin:
  - `component`: React component
  - `evaluator`: Object with `printAnswer` and optional `canaryCheck` functions

### Design Philosophy

- **Abstract Visual Language**: Diagrams use simplified shapes and gradients to test UX principles without realistic UI distractions
- **Immersive Experience**: Full-screen, dark-themed interface to focus user attention
- **Extensibility**: New test scenarios can be added by creating new diagram plugins without modifying core code
- **Canary Questions**: Support for control questions that validate user engagement through expected interactions

## Creating New Diagrams

For detailed instructions on creating new diagram plugins, please refer to the comprehensive guide in [Docs/CONTRIBUTING.md](../Docs/CONTRIBUTING.md).

### Quick Start:
1. Create folder in `src/plugins/diagrams/your-diagram-name/`
2. Implement React component accepting `DiagramProps`
3. Create `index.ts` exporting the `DiagramPlugin` contract
4. Add question to `public/questions.json` using the diagram folder name
5. For Level 3 questions, include `context` array and add tests to `src/__tests__/level3.test.ts`

### Available Diagram Types:
- **quadrant-selector**: Divides screen into selectable quadrants
- **plate**: Interactive plate for drag interactions
- **plate-quadrant-selector**: Combines plate with quadrant selection
- **plate-with-clip**: Plate with clip element for duplication tests
- **3d-building**: 3D building visualization for control placement tests
- **homepage-diagram**: Website homepage layout for element placement
- **menu-settings-selector**: Tests menu and settings expectations
- **save-action-selector**: Tests save action button associations
- **text-density**: Adjustable text density for readability tests

See `src/plugins/diagrams/quadrant-selector/` for a complete example implementation.