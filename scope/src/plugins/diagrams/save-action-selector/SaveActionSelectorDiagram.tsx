import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import styles from './SaveActionSelectorDiagram.module.css'
import type { DiagramProps } from '../../../types/plugin'

export const SaveActionSelectorDiagram: React.FC<DiagramProps> = ({ initialValue, onAnswerChange, mode }) => {
    const [selected, setSelected] = useState<'left' | 'right' | null>(null)
    const [hovered, setHovered] = useState<'left' | 'right' | null>(null)

    useEffect(() => {
        setSelected(initialValue?.selection ?? null)
    }, [initialValue])

    const isInteractive = mode === 'interactive'

    const handleClick = (zone: 'left' | 'right') => {
        if (!isInteractive) return
        const newSelection = selected === zone ? null : zone
        setSelected(newSelection)
        onAnswerChange(newSelection ? { selection: newSelection } : null)
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
                        onMouseEnter={() => isInteractive && setHovered('left')}
                        onMouseLeave={() => isInteractive && setHovered(null)}
                        onClick={() => handleClick('left')}
                    >
                        {selected === 'left' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TaskAltIcon className={styles.icon} />
                            </motion.div>
                        )}
                    </div>
                    <div
                        className={`${styles.button} ${styles.rightButton} ${
                            hovered === 'right' ? styles.hover : ''
                        } ${selected === 'right' ? styles.selected : ''}`}
                        onMouseEnter={() => isInteractive && setHovered('right')}
                        onMouseLeave={() => isInteractive && setHovered(null)}
                        onClick={() => handleClick('right')}
                    >
                        {selected === 'right' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TaskAltIcon className={styles.icon} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
