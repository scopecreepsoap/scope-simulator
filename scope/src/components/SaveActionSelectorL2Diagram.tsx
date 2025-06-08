import React, { useState } from 'react'
import styles from '../styles/SaveActionSelectorL2Diagram.module.css'


export const SaveActionSelectorL2Diagram: React.FC = () => {
    const [selected, setSelected] = useState<'left' | 'right' | null>(null)
    const [hovered, setHovered] = useState<'left' | 'right' | null>(null)

    const numInputs = 6

    const handleClick = (zone: 'left' | 'right') => {
        setSelected(prev => (prev === zone ? null : zone))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.dialogBox}>
                <div className={styles.formArea}>
                    {Array.from({ length: numInputs }).map((_, index) => (
                        <div className={styles.inputRow} key={index}>
                            <div className={styles.labelShape} />
                            <div className={styles.inputShape} />
                        </div>
                    ))}
                </div>

                <div className={styles.buttonRow}>
                    <div
                        className={`${styles.button} ${hovered === 'left' ? styles.hover : ''} ${selected === 'left' ? styles.selected : ''}`}
                        onMouseEnter={() => setHovered('left')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => handleClick('left')}
                    />
                    <div
                        className={`${styles.button} ${hovered === 'right' ? styles.hover : ''} ${selected === 'right' ? styles.selected : ''}`}
                        onMouseEnter={() => setHovered('right')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => handleClick('right')}
                    />
                </div>
            </div>
        </div>
    )
}
