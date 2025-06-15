import React from 'react'
import { TextDensityDiagram } from './TextDensityDiagram'
import {QuadrantSelectorDiagram} from "./QuadrantSelectorDiagram";
import {SaveActionSelectorDiagram} from "./SaveActionSelectorDiagram";
import {SaveActionSelectorL2Diagram} from "./SaveActionSelectorL2Diagram";
import {MenuSettingsSelectorDiagram} from "./MenuSettingsSelectorDiagram";
import styles from '../styles/QuestionArea.module.css'

interface DiagramRendererProps {
    diagramKey?: string
    index?: number
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagramKey, index }) => {
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
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {typeof index === 'number' && (
                <div className={styles.index} style={{ color: 'transparent', left: '50%', textShadow: '1px 1px 0 #1c2c4a, -1px -1px 0 midnightblue' }}>
                    {index + 1}
                </div>
            )}
            {renderDiagram()}
        </div>
    )
}
