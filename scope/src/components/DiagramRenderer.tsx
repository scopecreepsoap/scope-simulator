import React from 'react'
import { TextDensityDiagram } from './diagrams/TextDensityDiagram'
import {QuadrantSelectorDiagram} from "./diagrams/QuadrantSelectorDiagram";
import {SaveActionSelectorDiagram} from "./diagrams/SaveActionSelectorDiagram";
import {SaveActionSelectorL2Diagram} from "./diagrams/SaveActionSelectorL2Diagram";
import {MenuSettingsSelectorDiagram} from "./diagrams/MenuSettingsSelectorDiagram";
import {NoDiagramFound} from "./diagrams/NoDiagramFound";
import styles from '../styles/QuestionArea.module.css'

interface DiagramRendererProps {
    diagramKeys?: string[]
    index?: number
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagramKeys, index }) => {
    const renderDiagram = (key: string) => {
        switch (key) {
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
                return <NoDiagramFound />
        }
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {typeof index === 'number' && (
                <div className={styles.index} style={{ color: 'transparent', left: '50%', textShadow: '1px 1px 0 #1c2c4a, -1px -1px 0 midnightblue' }}>
                    {index + 1}
                </div>
            )}
            {diagramKeys?.map((key, i) => (
                <React.Fragment key={`${key}-${i}`}>
                    {renderDiagram(key)}
                </React.Fragment>
            ))}
        </div>
    )
}
