import React, {useEffect, useState} from 'react'
import styles from './TextDensityDiagram.module.css'
import { loremIpsum } from 'lorem-ipsum'
import type { DiagramProps } from '../../../types/plugin'

const MIN_SPACING = 8
const MAX_SPACING = 40
const CONTAINER_HEIGHT = 400
const FIXED_LINE_HEIGHT = 16
const DEFAULT_SPACING = 16

export const TextDensityDiagram: React.FC<DiagramProps> = ({ initialValue, onAnswerChange, mode }) => {
    const [spacing, setSpacing] = useState(initialValue?.spacing ?? DEFAULT_SPACING)
    const [showText, setShowText] = useState(initialValue?.showText ?? false)

    const numLines = Math.floor(CONTAINER_HEIGHT / (spacing + FIXED_LINE_HEIGHT))

    const loremLines = React.useMemo(() => {
        return Array.from({ length: numLines }, () =>
            loremIpsum({ count: 1, units: 'sentences' })
        )
    }, [numLines])

    const handleSpacingChange = (newSpacing: number) => {
        setSpacing(newSpacing)
        onAnswerChange({ spacing: newSpacing, showText })
    }

    const handleCheckboxChange = (isChecked: boolean) => {
        setShowText(isChecked)
        onAnswerChange({ spacing, showText: isChecked })

        setTimeout(() => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur()
            }
        }, 0)
    }

    useEffect(() => {
        setSpacing(initialValue?.spacing ?? DEFAULT_SPACING)
        setShowText(initialValue?.showText ?? false)
    }, [initialValue])

    return (
        <div className={styles.wrapper}>

            {/* Left: Diagram Box */}
            <div className={styles.diagramBox}>
                <div className={styles.diagramInner}>
                    {Array.from({ length: numLines }).map((_, idx) => (
                        <div key={idx} className={styles.lineGroup}>
                            {showText ? (
                                <p className={styles.lineText} style={{ lineHeight: `${FIXED_LINE_HEIGHT}px`, fontSize: `${FIXED_LINE_HEIGHT}px` }}>
                                    {loremLines[idx]}
                                </p>
                            ) : (
                                <div className={styles.lineBar} style={{ height: `${FIXED_LINE_HEIGHT}px` }} />
                            )}
                            <div className={`${styles.highlight} ${showText ? styles.highlightFaded : ''}`} style={{ height: `${spacing}px` }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Controls */}
            {mode === 'interactive' && (
                <div className={styles.controls}>
                    <input
                        type="range"
                        min={MIN_SPACING}
                        max={MAX_SPACING}
                        step={2}
                        value={spacing}
                        onChange={(e) => handleSpacingChange(Number(e.target.value))}
                        className={styles.verticalSlider}
                    />
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" checked={showText} onChange={(e) => handleCheckboxChange(e.target.checked)} />
                        Show Placeholder Text
                    </label>
                </div>
            )}
        </div>
    )
}
