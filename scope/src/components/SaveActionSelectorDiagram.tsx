import React, { useState } from 'react'
import styles from '../styles/SaveActionSelectorDiagram.module.css'

export const SaveActionSelectorDiagram: React.FC = () => {
    const [selected, setSelected] = useState<'left' | 'right' | null>(null)
    const [hovered, setHovered] = useState<'left' | 'right' | null>(null)

    const handleClick = (zone: 'left' | 'right') => {
        if (selected === zone) {
            setSelected(null)
        } else {
            setSelected(zone)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.dialogBox}>
                <div className={styles.bar} />
                <div className={styles.buttonRow}>
                    <div
                        className={`${styles.button} ${styles.leftButton} ${
                            hovered === 'left' ? styles.hover : ''
                        } ${selected === 'left' ? styles.selected : ''}`}
                        onMouseEnter={() => setHovered('left')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => handleClick('left')}
                    />
                    <div
                        className={`${styles.button} ${styles.rightButton} ${
                            hovered === 'right' ? styles.hover : ''
                        } ${selected === 'right' ? styles.selected : ''}`}
                        onMouseEnter={() => setHovered('right')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => handleClick('right')}
                    />
                </div>
            </div>
        </div>
    )
}
