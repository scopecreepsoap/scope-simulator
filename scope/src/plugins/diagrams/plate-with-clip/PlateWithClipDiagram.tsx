import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './PlateWithClipDiagram.module.css'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt'
import type { DiagramProps } from '../../../types/plugin'

interface Position {
    x: number
    y: number
}

export const PlateWithClipDiagram: React.FC<DiagramProps> = ({ initialValue, onAnswerChange, mode }) => {
    const [hovered, setHovered] = useState(false)
    const [hoverPos, setHoverPos] = useState<Position>({ x: 50, y: 50 })
    const [clickPos, setClickPos] = useState<Position | null>(null)

    const isInteractive = mode === 'interactive'

    useEffect(() => {
        if (initialValue?.position) {
            setClickPos(initialValue.position)
        } else {
            setClickPos(null)
        }
    }, [initialValue])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isInteractive) return
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setHovered(true)
        setHoverPos({ x, y })
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isInteractive) return

        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        // Toggle selection if clicking near the same spot
        if (clickPos && Math.abs(clickPos.x - x) < 5 && Math.abs(clickPos.y - y) < 5) {
            setClickPos(null)
            onAnswerChange(null)
        } else {
            const newPos = { x, y }
            setClickPos(newPos)
            onAnswerChange({ position: newPos })
        }
    }

    return (
        <div className={styles.wrapper}>
            <div 
                className={styles.dialogBox}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHovered(false)}
                onClick={handleClick}
                style={hovered ? {
                    ['--x' as any]: `${hoverPos.x}%`,
                    ['--y' as any]: `${hoverPos.y}%`
                } : {}}
            >
                <div className={styles.plateContainer}>
                    <div className={styles.plate} />
                    
                    {/* Clip attached to the plate */}
                    <div className={styles.clip} />
                    
                    {/* Dimension line */}
                    <div className={styles.dimensionLine}>
                        <div className={styles.dimensionArrowLeft} />
                        <div className={styles.dimensionArrowRight} />
                    </div>
                </div>
                
                {/* Hover effect - above everything */}
                {hovered && isInteractive && (
                    <div className={styles.hoverOverlay} />
                )}
                
                {/* Click indicator - above everything */}
                {clickPos && (
                    <motion.div
                        className={styles.icon}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            left: `${clickPos.x}%`,
                            top: `${clickPos.y}%`,
                        }}
                    >
                        <HighlightAltIcon fontSize="inherit" />
                    </motion.div>
                )}
            </div>
        </div>
    )
}