import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './QuadrantSelectorDiagram.module.css'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt'
import type { DiagramProps } from '../../../types/plugin'

interface Position {
    x: number
    y: number
}

const QUADRANT_MAP: Record<number, string> = {
    0: 'top-left',
    1: 'top-right',
    2: 'bottom-left',
    3: 'bottom-right',
    4: 'center',
};

const NAME_TO_INDEX_MAP: Record<string, number> = {
    'top-left': 0,
    'top-right': 1,
    'bottom-left': 2,
    'bottom-right': 3,
    'center': 4,
};

export const QuadrantSelectorDiagram: React.FC<DiagramProps> = ({ initialValue, onAnswerChange }) => {
    const [hovered, setHovered] = useState<number | null>(null)
    const [hoverPos, setHoverPos] = useState<Position>({ x: 50, y: 50 })
    const [selected, setSelected] = useState<number | null>(null)
    const [iconPos, setIconPos] = useState<Position | null>(null)

    useEffect(() => {
        const selectedQuadrantName = initialValue?.quadrant
        if (selectedQuadrantName && typeof selectedQuadrantName === 'string') {
            setSelected(NAME_TO_INDEX_MAP[selectedQuadrantName] ?? null)
            setIconPos(initialValue?.pos ?? null)
        } else {
            setSelected(null)
            setIconPos(null)
        }
    }, [initialValue])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setHovered(index)
        setHoverPos({ x, y })
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const newQuadrantName = QUADRANT_MAP[index]

        if (selected === index) {
            setSelected(null)
            setIconPos(null)
            onAnswerChange(null)
        } else {
            setSelected(index)
            setIconPos({ x, y })
            onAnswerChange({ quadrant: newQuadrantName, pos: { x, y } })
        }
    }

    const quadrants = [0, 1, 2, 3, 4]

    return (
        <div className={styles.wrapper}>
            <div className={styles.dialogBox}>
                <div className={styles.ovalContainer}>
                    <div className={styles.quadrantGrid} />
                    <div className={styles.ovalLarge} />
                    <div className={styles.ovalMedium} />
                    <div className={styles.ovalSmall} />
                </div>
                {quadrants.map((index) => (
                    <div
                        key={index}
                        className={
                            `${styles.quadrant} ${styles[`q${index}`]} ` +
                            `${hovered === index ? styles.hovered : ''} ` +
                            `${selected === index ? styles.selected : ''}`
                        }
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={(e) => handleClick(e, index)}
                        style={hovered === index ? {
                            ['--x' as any]: `${hoverPos.x}%`,
                            ['--y' as any]: `${hoverPos.y}%`
                        } : {}}
                    >
                        {selected === index && iconPos && (
                            <motion.div
                                className={styles.icon}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    left: `${iconPos.x}px`,
                                    top: `${iconPos.y}px`,
                                }}
                            >
                                <HighlightAltIcon fontSize="inherit" />
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
