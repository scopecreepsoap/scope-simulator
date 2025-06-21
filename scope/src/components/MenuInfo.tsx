import React from 'react'
import styles from '../styles/MenuInfo.module.css'
import {ProgressTracker} from "./ProgressTracker";
import { QUESTIONS } from '../data/questions'

interface MenuInfoProps {
    currentPage: number
    showDiagram: boolean
}

export const MenuInfo: React.FC<MenuInfoProps> = ({currentPage,showDiagram} ) => (
    <div className={styles.menuContent}>
        <h1 className={styles.menuTitle}>Menu</h1>

        <div className={styles.section}>
            <div className={styles.sectionLabel}>Keyboard</div>
            <div className={styles.keyRow}>
                <div className={styles.keyGroup}>
                    <span className={styles.key}>←</span>
                    <span className={styles.key}>A</span>
                    <span className={styles.instruction}>Go to previous slide</span>
                </div>
                <div className={styles.keyGroup}>
                    <span className={styles.key}>→</span>
                    <span className={styles.key}>D</span>
                    <span className={styles.instruction}>Go to next slide</span>
                </div>
                <div className={styles.keyGroup}>
                    <span className={styles.spacekey}>Space</span>
                    <span className={styles.instruction}>Show/Hide menu</span>
                </div>
            </div>
        </div>

        <div className={styles.section}>
            <div className={styles.sectionLabel}>Mouse</div>
            <div className={styles.keyRow}>
                <div className={styles.keyGroup}>
                    <span className={styles.mouseAction}>Hover corners</span>
                    <span className={styles.mouseInstruction}>Open menu</span>
                </div>
                <div className={styles.keyGroup}>
                    <span className={styles.mouseAction}>Hover center</span>
                    <span className={styles.mouseInstruction}>Hide menu</span>
                </div>
            </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.progressBlock}>
            <div className={styles.sectionLabel}>Current SCOPE Progress</div>

            <ProgressTracker
                totalQuestions={QUESTIONS.length}
                totalDiagrams={QUESTIONS.reduce((acc, q) => acc + q.diagram.length, 0)}
                currentIndex={(currentPage - 1) * 2 + (showDiagram ? 1 : 0)}
            />
        </div>
    </div>
)
