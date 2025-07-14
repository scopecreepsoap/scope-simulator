import React from 'react'
import styles from './NoDiagramFound.module.css'
import noDiagramImg from '../../assets/no-diagram.png'
import type { DiagramProps } from '../../types/plugin'

export const NoDiagramFound: React.FC<Partial<DiagramProps>> = ({ mode = 'interactive' }) => (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <img src={noDiagramImg} alt="No Diagram Found" />
            {mode === 'interactive' && <div className={styles.instruction}>No Diagram Found</div>}
        </div>
    </div>
)
