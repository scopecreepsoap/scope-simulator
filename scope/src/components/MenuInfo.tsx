import React from 'react'
import styles from '../styles/MenuInfo.module.css'
import { ProgressTracker } from './ProgressTracker'
import { useScopeStore } from '../stores/scopeStore'
import strings from "../data/strings";

interface MenuInfoProps {
    stepIndex: number
}

export const MenuInfo: React.FC<MenuInfoProps> = ({ stepIndex }) => {
    const testSteps = useScopeStore((state) => state.testSteps)

    return (
        <div className={styles.menuContent}>
            {/* TITLE */}
            <h1 className={styles.menuTitle}>{strings.menu.title}</h1>

            {/* KEYBOARD INFO */}
            <div className={styles.section}>
                <div className={styles.sectionLabel}>{strings.menu.keyboard}</div>
                <div className={styles.keyRow}>
                    <div className={styles.keyGroup}>
                        <span className={styles.key}>←</span>
                        <span className={styles.key}>A</span>
                        <span className={styles.instruction}>{strings.menu.previousSlide}</span>
                    </div>
                    <div className={styles.keyGroup}>
                        <span className={styles.key}>→</span>
                        <span className={styles.key}>D</span>
                        <span className={styles.instruction}>{strings.menu.nextSlide}</span>
                    </div>
                    <div className={styles.keyGroup}>
                        <span className={styles.spacekey}>Space</span>
                        <span className={styles.instruction}>{strings.menu.toggleMenu}</span>
                    </div>
                </div>
            </div>

            {/* MOUSE INFO */}
            <div className={styles.section}>
                <div className={styles.sectionLabel}>{strings.menu.mouse}</div>
                <div className={styles.keyRow}>
                    <div className={styles.keyGroup}>
                        <span className={styles.mouseAction}>Hover corners</span>
                        <span className={styles.mouseInstruction}>{strings.menu.openMenu}</span>
                    </div>
                    <div className={styles.keyGroup}>
                        <span className={styles.mouseAction}>Hover center</span>
                        <span className={styles.mouseInstruction}>{strings.menu.hideMenu}</span>
                    </div>
                </div>
            </div>
            <div className={styles.divider} />

            {/* PROGRESS INDICATOR */}
            <div className={styles.progressBlock}>
                <div className={styles.sectionLabel}>{strings.menu.progress}</div>
                <ProgressTracker
                    totalSteps={testSteps.length}
                    currentIndex={stepIndex}
                />
            </div>
        </div>
    )
}
