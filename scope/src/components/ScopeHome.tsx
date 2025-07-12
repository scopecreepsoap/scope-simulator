import React, { useState, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import TimerIcon from '@mui/icons-material/Timer'
import WatchIcon from '@mui/icons-material/Watch'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import InfoIcon from '@mui/icons-material/Info'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon   from '@mui/icons-material/Looks3'
import styles from '../styles/ScopeHome.module.css'
import scopeIcon from '../assets/logo.png'
import { ScopeManager } from './ScopeManager'
import { QUESTIONS } from '../data/questions'

interface ScopeHomeProps {
    onStart: (manager: ScopeManager) => void
}

export const ScopeHome: React.FC<ScopeHomeProps> = ({ onStart }) => {
    const [selectedTime, setSelectedTime] = useState<number | null>(null)
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

    // Launch SCOPE
    useEffect(() => {
        if (selectedTime !== null && selectedLevel !== null) {
            const manager = new ScopeManager(
                QUESTIONS,
                selectedLevel,
                selectedTime * 60
            )
            onStart(manager)
        }
    }, [selectedTime, selectedLevel, onStart])

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>

                {/* NAVIGATION */}
                <nav className={styles.nav}>
                    <span className={styles.activeNavItem}>Choose SCOPE</span>
                    <span className={styles.disabledNavItem}>
                      Load SCOPE
                    </span>
                    <span className={styles.disabledNavItem}>
                      About
                    </span>
                    <img src={scopeIcon} className={styles.scopeIcon} alt="SCOPE Simulator Logo" />
                </nav>

                {/* DURATION */}
                <div className={styles.section}>
                    <div className={styles.sectionLabel}>Duration</div>
                    <div className={styles.optionsRow}>
                        {[1, 2, 3].map((min) => (
                            <div key={min} className={styles.option}>
                                <div
                                    className={[
                                        styles.card,
                                        styles.durationCard,
                                        selectedTime === min && styles.selected,
                                        min === 3 && styles.disabled,
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    onClick={() => {
                                        if (selectedTime === min) setSelectedTime(null)
                                        else if (min !== 3) setSelectedTime(min)
                                    }}
                                    title={min === 3 ? '3 min not implemented yet' : undefined}
                                >
                                    {min === 1 && <TimerIcon sx={{ fontSize: 60, color: '#163AC2' }} />}
                                    {min === 2 && <WatchIcon sx={{ fontSize: 60, color: '#163AC2' }} />}
                                    {min === 3 && <HourglassTopIcon sx={{ fontSize: 60, color: '#163AC2' }} />}
                                </div>
                                <div className={styles.cardLabel}>{min} min</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DIFFICULTY */}
                <div className={styles.section}>
                    <div className={styles.sectionLabel}>
                        Difficulty
                        <InfoIcon className={styles.infoIcon} />
                    </div>
                    <div className={styles.optionsRow}>
                        {[1, 2, 3].map((lvl) => (
                            <div key={lvl} className={styles.option}>
                                <Tooltip
                                    title={lvl === 3 ? 'Level 3 not implemented yet' : ''}
                                    arrow
                                    disableHoverListener={lvl !== 3}
                                >
                                    <div
                                        className={[
                                            styles.card,
                                            styles.difficultyCard,
                                            selectedLevel === lvl && styles.selectedDifficulty,
                                            lvl === 3 && styles.disabled,
                                        ]
                                            .filter(Boolean)
                                            .join(' ')}
                                        onClick={() => {
                                            if (selectedLevel === lvl) setSelectedLevel(null)
                                            else if (lvl !== 3) setSelectedLevel(lvl)
                                        }}
                                    >
                                        {lvl === 1 && <LooksOneIcon sx={{ fontSize: 60, color: '#21D1EB' }} />}
                                        {lvl === 2 && <LooksTwoIcon sx={{ fontSize: 60, color: '#21D1EB' }} />}
                                        {lvl === 3 && <Looks3Icon sx={{ fontSize: 60, color: '#21D1EB' }} />}
                                    </div>
                                </Tooltip>
                                <div className={styles.cardLabel}>
                                    {lvl === 1 && 'Natural'}
                                    {lvl === 2 && 'Interpretive'}
                                    {lvl === 3 && 'Contextual'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
