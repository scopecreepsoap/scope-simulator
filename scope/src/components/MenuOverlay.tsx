import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/MenuOverlay.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { MenuInfo } from './MenuInfo'
import { InfoPage } from './InfoPage'

interface MenuOverlayProps {
    onBack: () => void
    onNext: () => void
    onExit: () => void
    stepIndex: number
    isInfoVisible: boolean
    setIsInfoVisible: (isVisible: boolean) => void
}

const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
                                                            onBack,
                                                            onNext,
                                                            onExit,
                                                            stepIndex,
                                                            isInfoVisible,
                                                            setIsInfoVisible,
                                                        }) => {
    // The local useState hook has been removed.

    return (
        <div className={styles.overlayContainer}>
            <AnimatePresence mode="wait">
                {!isInfoVisible ? (
                    <motion.div
                        key="main-menu"
                        className={styles.contentWrapper}
                        {...fadeAnimation}
                    >
                        <div className={styles.row}>

                            {/* BACK */}
                            <div className={styles.navItem} onClick={onBack}>
                                <ArrowBackIcon className={styles.icon} />
                                <span className={styles.label}>Back</span>
                            </div>

                            {/* NEXT */}
                            <div className={styles.navItem} onClick={onNext}>
                                <span className={styles.label}>Next</span>
                                <ArrowForwardIcon className={styles.icon} />
                            </div>
                            
                        </div>

                        {/* MENU INFO & PROGRESS */}
                        <MenuInfo stepIndex={stepIndex} />
                        <div className={styles.row}>

                            {/* INFO */}
                            <div
                                className={styles.navItem}
                                onClick={() => setIsInfoVisible(true)}
                            >
                                <InfoOutlinedIcon className={styles.icon} />
                                <span className={styles.label}>Info</span>
                            </div>

                            {/* EXIT */}
                            <div className={styles.navItem} onClick={onExit}>
                                <span className={styles.label}>Exit</span>
                                <CloseIcon className={styles.icon} />
                            </div>

                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="info-page" {...fadeAnimation}>

                        {/* INFO PAGE */}
                        <InfoPage onBack={() => setIsInfoVisible(false)} />

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
