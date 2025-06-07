import React, { useState } from 'react'
import styles from '../styles/QuadrantSelectorDiagram.module.css'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt'

interface Position {
    x: number
    y: number
}

export const QuadrantSelectorDiagram: React.FC = () => {
    const [hovered, setHovered] = useState<number | null>(null)
    const [hoverPos, setHoverPos] = useState<Position>({ x: 50, y: 50 })
    const [selected, setSelected] = useState<number | null>(null)
    const [iconPos, setIconPos] = useState<Position | null>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setHovered(index)
        setHoverPos({ x, y })
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const rawX = e.clientX - rect.left
        const rawY = e.clientY - rect.top

        const padding = 48
        let x = rawX
        let y = rawY

        if (index === 4) {
            // Center oval clamping
            const radiusX = rect.width / 2 - padding
            const radiusY = rect.height / 2 - padding
            const centerX = rect.width / 2
            const centerY = rect.height / 2

            const dx = rawX - centerX
            const dy = rawY - centerY
            const angle = Math.atan2(dy, dx)

            const clampedX = Math.min(Math.abs(dx), radiusX)
            const clampedY = Math.min(Math.abs(dy), radiusY)

            x = centerX + clampedX * Math.cos(angle)
            y = centerY + clampedY * Math.sin(angle)
        } else {
            // Standard square clamping
            x = Math.max(padding, Math.min(rect.width - padding, rawX))
            y = Math.max(padding, Math.min(rect.height - padding, rawY))
        }

        if (
            selected === index &&
            iconPos &&
            Math.abs(iconPos.x - rawX) < 40 &&
            Math.abs(iconPos.y - rawY) < 40
        ) {
            setSelected(null)
            setIconPos(null)
        } else {
            setSelected(index)
            setIconPos({ x, y })
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
                            <HighlightAltIcon
                                className={styles.icon}
                                style={{ left: `${iconPos.x}px`, top: `${iconPos.y}px` }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
