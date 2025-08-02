import React, { useEffect, useState } from 'react'
import TimerIcon from '@mui/icons-material/Timer'
import WatchIcon from '@mui/icons-material/Watch'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import styles from '../styles/ScopeHome.module.css'
import scopeIcon from '../assets/logo.png'
import type { QuestionConfig } from '../types/QuestionConfig'
import ScopeTooltip from './ScopeTooltip'
import strings from '../data/strings'
import { DifficultyInfo } from './DifficultyInfo'
import { useScopeStore } from '../stores/scopeStore'
import About from './About'
import type { NavView } from '../types/navigation'
import { InfoPage } from './InfoPage'

export const ScopeHome: React.FC = () => {
    const [currentView, setCurrentView] = useState<NavView>('Choose')
    const [isInfoPageVisible, setIsInfoPageVisible] = useState(false)
    const {
        selectedTime,
        selectedLevel,
        setSelectedTime,
        setSelectedLevel,
        prepareTest,
        allQuestions,
        loadQuestions,
    } = useScopeStore()

    // Show 'Begin SCOPE' screen
    useEffect(() => {
        if (selectedTime !== null && selectedLevel !== null) {
            prepareTest()
        }
    }, [selectedTime, selectedLevel, prepareTest])

    // Load SCOPE questions
    useEffect(() => {
        loadQuestions()
    }, [loadQuestions])

    function canSupportTime(minutes: number, questions: QuestionConfig[]) {
        const totalAvailableSec = questions.reduce((sum, q) => {
            const maxSec = q.level === 1 ? 10 : q.level === 2 ? 20 : 30
            return sum + maxSec
        }, 0)
        const requiredSec = minutes * 60

        return totalAvailableSec >= requiredSec
    }

    const renderContent = () => {
        if (currentView === 'About') {
            return <About />
        }

        return (
            <>
                {/* DURATION */}
                <div className={styles.section}>
                    <div className={styles.sectionLabel}>
                        {strings.labels.duration}
                    </div>
                    <div className={styles.optionsRow}>
                        {[1, 2, 3].map((min) => {
                            const canUse = canSupportTime(min, allQuestions)
                            const disabled = !canUse
                            const tooltipTitle = disabled
                                ? strings.tooltips.noDuration
                                : ''

                            return (
                                <div key={min} className={styles.option}>
                                    <ScopeTooltip
                                        title={tooltipTitle}
                                        disableHoverListener={!disabled}
                                    >
                                        <div
                                            className={[
                                                styles.card,
                                                styles.durationCard,
                                                selectedTime === min &&
                                                styles.selected,
                                                disabled && styles.disabled,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                            onClick={() => {
                                                if (!disabled) {
                                                    setSelectedTime(
                                                        selectedTime === min
                                                            ? null
                                                            : min
                                                    )
                                                }
                                            }}
                                        >
                                            {min === 1 && (
                                                <TimerIcon
                                                    sx={{
                                                        fontSize: 60,
                                                        color: '#163AC2',
                                                    }}
                                                />
                                            )}
                                            {min === 2 && (
                                                <WatchIcon
                                                    sx={{
                                                        fontSize: 60,
                                                        color: '#163AC2',
                                                    }}
                                                />
                                            )}
                                            {min === 3 && (
                                                <HourglassTopIcon
                                                    sx={{
                                                        fontSize: 60,
                                                        color: '#163AC2',
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </ScopeTooltip>
                                    <div className={styles.cardLabel}>
                                        {min} min
                                    </div>
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
                            const hasLevelQuestions = allQuestions.some(
                                (q) => q.level === lvl
                            )
                            const disabled = !hasLevelQuestions
                            const tooltipTitle = disabled
                                ? strings.tooltips.noDifficulty
                                : ''
                            const isSelected = selectedLevel === lvl

                            return (
                                <div key={lvl} className={styles.option}>
                                    <ScopeTooltip
                                        title={tooltipTitle}
                                        disableHoverListener={!disabled}
                                    >
                                        <div
                                            className={[
                                                styles.card,
                                                styles.difficultyCard,
                                                isSelected &&
                                                styles.selectedDifficulty,
                                                disabled && styles.disabled,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                            onClick={() => {
                                                if (!disabled) {
                                                    setSelectedLevel(
                                                        isSelected ? null : lvl
                                                    )
                                                }
                                            }}
                                        >
                                            {lvl === 1 && (
                                                <LooksOneIcon
                                                    sx={{
                                                        fontSize: 60,
                                                        color: '#21D1EB',
                                                    }}
                                                />
                                            )}
                                            {lvl === 2 && (
                                                <LooksTwoIcon
                                                    sx={{
                                                        fontSize: 60,
                                                        color: '#21D1EB',
                                                    }}
                                                />
                                            )}
                                            {lvl === 3 && (
                                                <Looks3Icon
                                                    sx={{
                                                        fontSize: 60,
                                                        color: '#21D1EB',
                                                    }}
                                                />
                                            )}
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
            </>
        )
    }

    // Show Info from menu above SCOPE home page
    if (isInfoPageVisible) {
        return <InfoPage onBack={() => setIsInfoPageVisible(false)} />
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                {/* NAVIGATION */}
                <nav className={styles.nav}>

                    {/* CHOOSE SCOPE */}
                    <span
                        className={
                            currentView === 'Choose'
                                ? styles.activeNavItem
                                : styles.navItem
                        }
                        onClick={() => setCurrentView('Choose')}
                    >
                        {strings.labels.chooseScope}
                    </span>

                    {/* LOAD SCOPE */}
                    <span className={styles.disabledNavItem}>
                        {strings.labels.loadScope}
                    </span>

                    {/* ABOUT */}
                    <span
                        className={
                            currentView === 'About'
                                ? styles.activeNavItem
                                : styles.navItem
                        }
                        onClick={() => setCurrentView('About')}
                    >
                        {strings.labels.about}
                    </span>

                    {/* MY INFO */}
                    <ScopeTooltip title={strings.tooltips.myInfo}>
                        <img
                            src={scopeIcon}
                            className={styles.scopeIcon}
                            alt={`${strings.labels.chooseScope} Logo`}
                            onClick={() => setIsInfoPageVisible(true)}
                            style={{ cursor: 'pointer' }}
                        />
                    </ScopeTooltip>
                </nav>

                {renderContent()}
            </div>
        </div>
    )
}
