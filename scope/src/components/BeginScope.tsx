import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import { motion } from 'framer-motion'
import styles from '../styles/BeginScope.module.css'
import scopeHomeStyles from '../styles/ScopeHome.module.css'
import { useScopeStore } from '../stores/scopeStore'

export const BeginScope: React.FC = () => {
    const { beginTest, returnToHome } = useScopeStore()

    return (
        <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* TEST START ICON */}
            <NoteAltIcon className={styles.clipboardIcon} />

            {/* BEGIN SCOPE */}
            <div className={styles.content}>
                <h1 className={styles.title} onClick={beginTest}>
                    Begin SCOPE
                </h1>

                {/* RETURN HOME */}
                <div className={`${scopeHomeStyles.option} ${styles.homeButtonContainer}`}>
                    <div
                        className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`}
                        onClick={returnToHome}
                    >
                        <HomeIcon sx={{ fontSize: 60, color: '#21D1EB' }} />
                    </div>
                    <div className={scopeHomeStyles.cardLabel}>Return Home</div>
                </div>
            </div>
        </motion.div>
    )
}
