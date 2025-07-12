import React, { useState, useEffect } from 'react'
import TimerIcon from '@mui/icons-material/Timer'
import WatchIcon from '@mui/icons-material/Watch'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import styles from '../styles/ScopeHome.module.css'
import scopeIcon from '../assets/logo.png'
import { ScopeManager } from './ScopeManager'
import { QUESTIONS } from '../data/questions'
import type { QuestionConfig } from '../types/QuestionConfig'
import ScopeTooltip from './ScopeTooltip'
import strings from "../data/strings";
import {DifficultyInfo} from "./DifficultyInfo";

interface ScopeHomeProps {
    onStart: (manager: ScopeManager) => void
}

export const ScopeHome: React.FC<ScopeHomeProps> = ({ onStart }) => {
    const [selectedTime, setSelectedTime] = useState<number | null>(null)
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

    function canSupportTime(
        minutes: number,
        questions: QuestionConfig[]
    ) {
        const totalAvailableSec = questions.reduce((sum, q) => {
            const maxSec = q.level === 1 ? 10 : q.level === 2 ? 20 : 30
            return sum + maxSec
        }, 0)
        const requiredSec = minutes * 60

        return totalAvailableSec >= requiredSec
    }

    function getEstimatedQuestionsForLevel(
        level: number,
        totalSeconds: number,
        questions: QuestionConfig[]
    ) {
        let avgSec = 7
        if (level === 2) avgSec = 15
        else if (level === 3) avgSec = 22

        const maxQuestions = Math.floor(totalSeconds / avgSec)
        const levelQuestions = questions.filter(q => q.level === level)

        return levelQuestions.slice(0, maxQuestions)
    }

    useEffect(() => {
        if (selectedTime !== null && selectedLevel !== null) {
            const totalSeconds = selectedTime * 60
            const subset = getEstimatedQuestionsForLevel(
                selectedLevel,
                totalSeconds,
                QUESTIONS
            )

            const manager = new ScopeManager(
                QUESTIONS,
                selectedLevel,
                totalSeconds,
                subset
            )
            onStart(manager)
        }
    }, [selectedTime, selectedLevel, onStart])

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>

                {/* NAVIGATION */}
                <nav className={styles.nav}>
                    <span className={styles.activeNavItem}>{strings.labels.chooseScope}</span>
                    <span className={styles.disabledNavItem}>{strings.labels.loadScope}</span>
                    <span className={styles.disabledNavItem}>{strings.labels.about}</span>
                    <img
                        src={scopeIcon}
                        className={styles.scopeIcon}
                        alt={`${strings.labels.chooseScope} Logo`}
                    />
                </nav>

                {/* DURATION */}
                <div className={styles.section}>
                    <div className={styles.sectionLabel}>{strings.labels.duration}</div>
                    <div className={styles.optionsRow}>
                        {[1, 2, 3].map((min) => {
                            const canUse = canSupportTime(min, QUESTIONS)
                            const disabled = !canUse
                            const tooltipTitle = disabled ? strings.tooltips.noDuration : ''

                            return (
                                <div key={min} className={styles.option}>
                                    <ScopeTooltip title={tooltipTitle} disableHoverListener={!disabled}>
                                        <div
                                            className={[
                                                styles.card,
                                                styles.durationCard,
                                                selectedTime === min && styles.selected,
                                                disabled && styles.disabled,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                            onClick={() => {
                                                if (!disabled) {
                                                    setSelectedTime(
                                                        selectedTime === min ? null : min
                                                    )
                                                }
                                            }}
                                        >
                                            {min === 1 && <TimerIcon sx={{ fontSize: 60, color: '#163AC2' }} />}
                                            {min === 2 && <WatchIcon sx={{ fontSize: 60, color: '#163AC2' }} />}
                                            {min === 3 && <HourglassTopIcon sx={{ fontSize: 60, color: '#163AC2' }} />}
                                        </div>
                                    </ScopeTooltip>
                                    <div className={styles.cardLabel}>{min} min</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* DIFFICULTY */}
                <div className={styles.section}>
                    <div className={styles.sectionLabel}>
                        {strings.labels.difficulty}
                        <DifficultyInfo />
                    </div>
                    <div className={styles.optionsRow}>
                        {[1, 2, 3].map((lvl) => {
                            const hasLevelQuestions = QUESTIONS.some(q => q.level === lvl)
                            const disabled = !hasLevelQuestions
                            const tooltipTitle = disabled ? strings.tooltips.noDifficulty : ''
                            const isSelected = selectedLevel === lvl

                            return (
                                <div key={lvl} className={styles.option}>
                                    <ScopeTooltip title={tooltipTitle} disableHoverListener={!disabled}>
                                        <div
                                            className={[
                                                styles.card,
                                                styles.difficultyCard,
                                                isSelected && styles.selectedDifficulty,
                                                disabled && styles.disabled,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                            onClick={() => {
                                                if (!disabled) {
                                                    setSelectedLevel(isSelected ? null : lvl)
                                                }
                                            }}
                                        >
                                            {lvl === 1 && <LooksOneIcon sx={{ fontSize: 60, color: '#21D1EB' }} />}
                                            {lvl === 2 && <LooksTwoIcon sx={{ fontSize: 60, color: '#21D1EB' }} />}
                                            {lvl === 3 && <Looks3Icon sx={{ fontSize: 60, color: '#21D1EB' }} />}
                                        </div>
                                    </ScopeTooltip>
                                    <div className={styles.cardLabel}>
                                        {lvl === 1 && strings.labels.natural}
                                        {lvl === 2 && strings.labels.interpretive}
                                        {lvl === 3 && strings.labels.contextual}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
