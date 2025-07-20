import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { motion } from 'framer-motion'
import styles from '../styles/BeginScope.module.css'
import scopeHomeStyles from '../styles/ScopeHome.module.css'
import { useScopeStore } from '../stores/scopeStore'

export const BeginScope: React.FC = () => {
    const {
        beginTest,
        returnToHome,
        toggleFullscreenDisabled,
        fullscreenDisabled,
    } = useScopeStore()

    // Enable/Disable auto-fullscreen
    const handleDisableFullScreen = () => toggleFullscreenDisabled()

    return (
        <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* TEST START ICON */}
            <NoteAltIcon className={styles.clipboardIcon} />

            {/* SCOPE COMPLETE */}
            <div className={styles.content}>
                <h1 className={styles.title}>SCOPE Ready</h1>

                <div className={styles.optionsRow}>

                    {/* RETURN HOME */}
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`}
                            onClick={returnToHome}
                        >
                            <HomeIcon
                                sx={{ fontSize: 60, color: '#21D1EB' }}
                            />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>
                            Return Home
                        </div>
                    </div>

                    {/* DISABLE FULLSCREEN */}
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={[
                                scopeHomeStyles.card,
                                scopeHomeStyles.difficultyCard,
                                fullscreenDisabled && scopeHomeStyles.selectedDifficulty,
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            onClick={handleDisableFullScreen}
                        >
                            <FullscreenIcon
                                sx={{ fontSize: 60, color: '#21D1EB' }}
                            />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>
                            Disable Fullscreen
                        </div>
                    </div>

                    {/* BEGIN SCOPE */}
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.durationCard}`}
                            onClick={beginTest}
                        >
                            <PlayArrowIcon
                                sx={{ fontSize: 60, color: '#163AC2' }}
                            />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>
                            Begin SCOPE
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
