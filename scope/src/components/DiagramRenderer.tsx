import React from 'react'
import { useScopeStore } from '../stores/scopeStore'
import styles from '../styles/QuestionArea.module.css'
import diagramRegistry from '../plugins/registry'
import { NoDiagramFound } from './diagrams/NoDiagramFound'
import type { Answer } from '../types/plugin'

interface DiagramRendererProps {
    diagramKeys?: string[]
    index?: number
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagramKeys, index }) => {
    const { recordAnswer, results, currentIndex } = useScopeStore()

    const renderDiagram = (key: string) => {
        const plugin = diagramRegistry.get(key)

        if (!plugin) {
            return <NoDiagramFound />
        }

        const DiagramComponent = plugin.component
        const currentAnswer = results[currentIndex]

        const handleAnswerChange = (answer: Answer) => {
            recordAnswer(currentIndex, answer)
        }

        return (
            <DiagramComponent
                mode="interactive"  // Show instruction and controller
                initialValue={currentAnswer}
                onAnswerChange={handleAnswerChange}
            />
        )
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
