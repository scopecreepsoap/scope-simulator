import React from 'react'
import { TextDensityDiagram } from './TextDensityDiagram'
import {QuadrantSelectorDiagram} from "./QuadrantSelectorDiagram";
import {SaveActionSelectorDiagram} from "./SaveActionSelectorDiagram";
import {SaveActionSelectorL2Diagram} from "./SaveActionSelectorL2Diagram";
import {MenuSettingsSelectorDiagram} from "./MenuSettingsSelectorDiagram";

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
            case 'save-action-selector':
                return <SaveActionSelectorDiagram />
            case 'save-action-selector-l2':
                return <SaveActionSelectorL2Diagram />
            case 'menu-settings-selector':
                return <MenuSettingsSelectorDiagram />
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
