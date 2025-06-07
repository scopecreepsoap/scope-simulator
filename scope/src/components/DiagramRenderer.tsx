import React from 'react'
import { TextDensityDiagram } from './TextDensityDiagram'
import {QuadrantSelectorDiagram} from "./QuadrantSelectorDiagram";

interface DiagramRendererProps {
    diagramKey?: string
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagramKey }) => {
    const renderDiagram = () => {
        switch (diagramKey) {
            case 'text-density':
                return <TextDensityDiagram />
            case 'quadrant-selector':
                return <QuadrantSelectorDiagram />
            default:
                return <p style={{ color: 'var(--text-medium)' }}>No diagram found for "{diagramKey}"</p>
        }
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {renderDiagram()}
        </div>
    )
}
