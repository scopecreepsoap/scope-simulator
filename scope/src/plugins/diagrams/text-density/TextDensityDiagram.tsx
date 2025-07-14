import React, { useState, useMemo } from 'react'
import styles from './TextDensityDiagram.module.css'
import { loremIpsum } from 'lorem-ipsum'

const MIN_SPACING = 8
const MAX_SPACING = 40
const CONTAINER_HEIGHT = 400
const FIXED_LINE_HEIGHT = 16

export const TextDensityDiagram: React.FC = () => {
    const [spacing, setSpacing] = useState(16)
    const [showText, setShowText] = useState(false)

    const totalUnitHeight = spacing + FIXED_LINE_HEIGHT
    const numLines = useMemo(() => {
        return Math.floor(CONTAINER_HEIGHT / totalUnitHeight)
    }, [spacing])

    const loremLines = useMemo(() => {
        return Array.from({ length: numLines }, () =>
            loremIpsum({ count: 1, units: 'sentences' })
        )
    }, [numLines])

    return (
        <div className={styles.wrapper}>
            {/* Left: Diagram Box */}
            <div className={styles.diagramBox}>
                <div className={styles.diagramInner}>
                    {Array.from({ length: numLines }).map((_, idx) => (
                        <div key={idx} className={styles.lineGroup}>
                            {showText ? (
                                <p
                                    className={styles.lineText}
                                    style={{ lineHeight: `${FIXED_LINE_HEIGHT}px`, fontSize: `${FIXED_LINE_HEIGHT}px` }}
                                >
                                    {loremLines[idx]}
                                </p>
                            ) : (
                                <div
                                    className={styles.lineBar}
                                    style={{ height: `${FIXED_LINE_HEIGHT}px` }}
                                />
                            )}
                            <div
                                className={styles.highlight}
                                style={{ height: `${spacing}px` }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Controls */}
            <div className={styles.controls}>
                <input
                    type="range"
                    min={MIN_SPACING}
                    max={MAX_SPACING}
                    step={2}
                    value={spacing}
                    onChange={(e) => setSpacing(Number(e.target.value))}
                    className={styles.verticalSlider}
                />
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={showText}
                        onChange={(e) => setShowText(e.target.checked)}
                    />
                    Show Placeholder Text
                </label>
            </div>
        </div>
    )
}
