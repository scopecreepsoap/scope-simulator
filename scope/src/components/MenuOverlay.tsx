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
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
                                                            onBack,
                                                            onNext,
                                                            onInfo,
                                                            onExit,
                                                        }) => (
    <div className={styles.menuOverlay}>
        <div className={styles.row}>
            <div className={styles.navItem} onClick={onBack}>
                <ArrowBackIcon className={styles.icon} />
                <span className={styles.label}>Back</span>
            </div>
            <div className={styles.navItem} onClick={onNext}>
                <span className={styles.label}>Next</span>
                <ArrowForwardIcon className={styles.icon} />
            </div>
        </div>
        <MenuInfo />
        <div className={styles.row}>
            <div className={styles.navItem} onClick={onInfo}>
                <InfoOutlinedIcon className={styles.icon} />
                <span className={styles.label}>Info</span>
            </div>
            <div className={styles.navItem} onClick={onExit}>
                <span className={styles.label}>Exit</span>
                <CloseIcon className={styles.icon} />
            </div>
        </div>
    </div>
)
