import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import type { DiagramProps } from '../types/plugin';

import { HomepageDiagram } from '../plugins/diagrams/homepage-diagram/HomepageDiagram';

// This placeholder test suite is here to prevent the test runner from failing
describe('Level 3 Test Template', () => {
    it('file validation test', () => {
        expect(true).toBe(true);
    });
});

// This file is a template for contributors to follow when adding tests for new
// Level 3 contextual diagrams. The content is commented out to prevent it from
// running in the test suite. Contributors should copy a 'describe' block,
// uncomment it, and adapt it for their specific component.

/*
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

// 🛑 This is a placeholder for an actual component import.
// You would import your real diagram component like this:
// import { YourDiagramComponent } from '../plugins/diagrams/your-diagram/YourDiagramComponent';

// Assume the CardSorterDiagram component exists for this example.
const CardSorterDiagram: React.FC<DiagramProps> = ({ context }) => {
  if (!context) return null;
  return (
    <div>
      {context.map((card: any) => (
        <div key={card.id}>{card.label}</div>
      ))}
    </div>
  );
};

//
// 🧪 Below is a sample test suite.
// Copy this entire 'describe' block and adapt it for your component.
//
describe('Level 3 Diagram: Card Sorter', () => {
  it('should render cards based on the context prop', () => {
    // 1. Define the mock context your component will receive.
    const mockContext = [
      { id: 'card1', label: 'User Profile' },
      { id: 'card2', label: 'Notifications' },
      { id: 'card3', label: 'Account Settings' },
      { id: 'card4', label: 'Sign Out' },
    ];

    // 2. Define the standard diagram props.
    const mockProps: DiagramProps = {
      initialValue: null,
      onAnswerChange: vi.fn(),
      mode: 'interactive',
      context: mockContext, // Pass your mock context here
    };

    // 3. Render your component with the mock props.
    render(<CardSorterDiagram {...mockProps} />);

    // 4. Assert that the component renders the expected content.
    expect(screen.getByText('User Profile')).not.toBeNull();
    expect(screen.getByText('Notifications')).not.toBeNull();
    expect(screen.getByText('Account Settings')).not.toBeNull();
    expect(screen.getByText('Sign Out')).not.toBeNull();
  });

  it('should render nothing if context is missing or empty', () => {
    const mockProps: DiagramProps = {
      initialValue: null,
      onAnswerChange: vi.fn(),
      mode: 'interactive',
      context: [], // Test with empty context
    };

    const { container } = render(<CardSorterDiagram {...mockProps} />);
    expect(container.firstChild).toBeNull();
  });
});

*/

//
// 🧪 Test suite for the Homepage Diagram.
//
describe('Level 3 Diagram: Homepage', () => {
    it('should call onAnswerChange with coordinates when clicked in interactive mode', () => {
        const mockOnAnswerChange = vi.fn();

        const mockProps: DiagramProps = {
            initialValue: null,
            onAnswerChange: mockOnAnswerChange,
            mode: 'interactive',
            context: [],
        };

        const { getByTestId } = render(<HomepageDiagram {...mockProps} />);

        // Find main clickable element using test ID
        const diagramElement = getByTestId('homepage-diagram');

        // Simulate user click
        fireEvent.click(diagramElement, { clientX: 100, clientY: 200 });

        // Assert callback was called w/ expected data structure
        expect(mockOnAnswerChange).toHaveBeenCalledTimes(1);
        expect(mockOnAnswerChange).toHaveBeenCalledWith(
            expect.objectContaining({
                pos: expect.objectContaining({
                    x: expect.any(Number),
                    y: expect.any(Number),
                }),
            })
        );
    });

    it('should not call onAnswerChange when clicked in display mode', () => {
        const mockOnAnswerChange = vi.fn();

        const mockProps: DiagramProps = {
            initialValue: { pos: { x: 100, y: 200 } },
            onAnswerChange: mockOnAnswerChange,
            mode: 'display',
            context: [],
        };

        const { getByTestId } = render(<HomepageDiagram {...mockProps} />);

        const diagramElement = getByTestId('homepage-diagram');

        // Attempt to click
        fireEvent.click(diagramElement, { clientX: 150, clientY: 250 });

        // Assert nothing happened
        expect(mockOnAnswerChange).not.toHaveBeenCalled();
    });
});