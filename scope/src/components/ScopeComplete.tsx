import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import DownloadIcon from '@mui/icons-material/Download'
import GradingIcon from '@mui/icons-material/Grading'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import { motion } from 'framer-motion'
import styles from '../styles/ScopeComplete.module.css'
import scopeHomeStyles from '../styles/ScopeHome.module.css'
import { useScopeStore } from '../stores/scopeStore'
import strings from "../data/strings";

export const ScopeComplete: React.FC = () => {
    const { returnToHome } = useScopeStore()

    // TODO: Implement save and view
    const handleSave = () => console.log('Save Results clicked!')
    const handleView = () => console.log('View Results clicked!')

    return (
        <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* TEST END ICON */}
            <AssignmentTurnedInIcon className={styles.clipboardIcon} />

            {/* SCOPE COMPLETE */}
            <div className={styles.content}>
                <h1 className={styles.title}>{strings.scopeComplete.title}</h1>

                <div className={styles.optionsRow}>

                    {/* RETURN HOME */}
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`}
                            onClick={returnToHome}
                        >
                            <HomeIcon sx={{ fontSize: 60, color: '#21D1EB' }} />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>{strings.common.returnHome}</div>
                    </div>

                    {/* SAVE RESULTS */}
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`}
                            onClick={handleSave}
                        >
                            <DownloadIcon sx={{ fontSize: 60, color: '#21D1EB' }} />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>{strings.scopeComplete.saveResults}</div>
                    </div>

                    {/* VIEW RESULTS */}
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.durationCard}`}
                            onClick={handleView}
                        >
                            <GradingIcon sx={{ fontSize: 60, color: '#163AC2' }} />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>{strings.common.viewResults}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
