import React from 'react'
import styles from '../styles/MenuOverlay.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CloseIcon from '@mui/icons-material/Close'
import {MenuInfo} from "./MenuInfo";

interface MenuOverlayProps {
    onBack: () => void
    onNext: () => void
    onInfo: () => void
    onExit: () => void
    stepIndex: number
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
                                                            onBack,
                                                            onNext,
                                                            onInfo,
                                                            onExit,
                                                            stepIndex,
                                                        }) => (
    <div className={styles.menuOverlay}>
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
            <div className={styles.navItem} onClick={onInfo}>
                <InfoOutlinedIcon className={styles.icon} />
                <span className={styles.label}>Info</span>
            </div>
            {/* EXIT */}
            <div className={styles.navItem} onClick={onExit}>
                <span className={styles.label}>Exit</span>
                <CloseIcon className={styles.icon} />
            </div>
        </div>
    </div>
)
