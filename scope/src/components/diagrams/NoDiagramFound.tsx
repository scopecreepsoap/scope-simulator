import React from 'react'
import BrokenImageIcon from '@mui/icons-material/BrokenImage'
import styles from '../../styles/NoDiagramFound.module.css'

export const NoDiagramFound: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <BrokenImageIcon className={styles.icon} />
                <div className={styles.instruction}>No Diagram Found</div>
            </div>
        </div>
    )
}
