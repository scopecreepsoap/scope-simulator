import React from 'react'
import styles from './NoDiagramFound.module.css'
import noDiagramImg from '../../assets/no-diagram.png'

export const NoDiagramFound: React.FC = () => (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <img src={noDiagramImg} alt="No Diagram Found" />
            <div className={styles.instruction}>No Diagram Found</div>
        </div>
    </div>
)
