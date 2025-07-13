import React from 'react'
import styles from '../styles/ProgressTracker.module.css'
import CircleIcon from '@mui/icons-material/Circle'

interface ProgressTrackerProps {
    totalSteps: number
    currentIndex: number // 0-based linear index (prompt = 0, diagram = 1, ...)
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ totalSteps, currentIndex }) => {
    const totalDots = totalSteps

    const elements: React.ReactNode[] = []
    for (let i = 0; i < totalDots; i++) {
        const isActive = i === currentIndex
        elements.push(
            <CircleIcon
                key={i}
                className={`${styles.dot} ${isActive ? styles.active : ''}`}
            />
        )
    }

    return (
        <div className={styles.trackerContainer}>
            {Array.from({ length: Math.ceil(elements.length / 16) }, (_, row) => (
                <div key={row} className={styles.row}>
                    {elements.slice(row * 16, row * 16 + 16)}
                </div>
            ))}
        </div>
    )
}

