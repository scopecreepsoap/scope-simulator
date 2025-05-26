import React from 'react'
import { TextDensityDiagram } from './TextDensityDiagram'

interface DiagramRendererProps {
    diagramKey?: string
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagramKey }) => {
    const renderDiagram = () => {
        switch (diagramKey) {
            case 'text-density':
                return <TextDensityDiagram />
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
