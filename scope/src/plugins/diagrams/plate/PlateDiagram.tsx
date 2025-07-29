import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './PlateDiagram.module.css'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import type { DiagramProps } from '../../../types/plugin'

interface Position {
    x: number
    y: number
}

export const PlateDiagram: React.FC<DiagramProps> = ({ initialValue, onAnswerChange, mode }) => {
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
            <div className={styles.backgroundArea}>
                <div 
                    className={styles.plate}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHovered(false)}
                    onClick={handleClick}
                    style={hovered ? {
                        ['--hover-x' as any]: `${hoverPos.x}%`,
                        ['--hover-y' as any]: `${hoverPos.y}%`
                    } : {}}
                >
                    {hovered && isInteractive && (
                        <div 
                            className={styles.hoverIndicator}
                            style={{
                                left: `${hoverPos.x}%`,
                                top: `${hoverPos.y}%`,
                            }}
                        />
                    )}
                    
                    {clickPos && (
                        <motion.div
                            className={styles.clickIndicator}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                left: `${clickPos.x}%`,
                                top: `${clickPos.y}%`,
                                width: 48,
                                height: 48,
                                marginLeft: -24,
                                marginTop: -24,
                            }}
                        >
                            <OpenWithIcon style={{ fontSize: 48, width: 48, height: 48 }} />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}