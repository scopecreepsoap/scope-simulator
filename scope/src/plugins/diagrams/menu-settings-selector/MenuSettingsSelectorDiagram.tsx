import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SettingsIcon from '@mui/icons-material/Settings'
import styles from './MenuSettingsSelectorDiagram.module.css'

export const MenuSettingsSelectorDiagram: React.FC = () => {
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
    const [hoveredHalf, setHoveredHalf] = useState<{ seg: string; half: 'top' | 'bottom' } | null>(null)
    const [selection, setSelection] = useState<Record<string, 'top' | 'bottom'>>({})

    const top1Ref = useRef<HTMLDivElement>(null)
    const top2Ref = useRef<HTMLDivElement>(null)
    const top3Ref = useRef<HTMLDivElement>(null)
    const top4Ref = useRef<HTMLDivElement>(null)
    const top6Ref = useRef<HTMLDivElement>(null)
    const bottomLeftRef = useRef<HTMLDivElement>(null)
    const bottomRightRef = useRef<HTMLDivElement>(null)

    const enterSegment = (seg: string) => {
        setHoveredSegment(seg)
        setHoveredHalf(null)
    }
    const leaveSegment = (seg?: string) => {
        if (seg && selection[seg]) return
        setHoveredSegment(null)
        setHoveredHalf(null)
    }

    const leaveHalf = () => setHoveredHalf(null)

    const clickHalf = (which: 'top' | 'bottom', seg: string) => {
        setSelection(prev => {
            const isSame = prev[seg] === which
            if (isSame) {
                setHoveredSegment(null)
                setHoveredHalf(null)
                return {}
            }
            return { [seg]: which }
        })
        setHoveredHalf({ seg, half: which })
    }

    const offset = (ref: React.RefObject<HTMLDivElement | null>) =>
        ref.current?.offsetLeft ?? 0
    const top1Left = offset(top1Ref)
    const top2Left = offset(top2Ref)
    const top3Left = offset(top3Ref)
    const top4Left = offset(top4Ref)
    const bottomLeft = offset(bottomLeftRef)

    const renderDropdown = (key: string, top?: number, bottom?: number, left?: number, right?: number, panelClass?: string) => (
        <AnimatePresence>
            {(hoveredSegment === key || selection[key]) && (
                <motion.div
                    className={`${panelClass}`}
                    style={{ top, bottom, left, right }}
                    onMouseEnter={() => enterSegment(key)}
                    onMouseLeave={() => leaveSegment(key)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {['top', 'bottom'].map(which => (
                        <div
                            key={which}
                            className={[
                                styles.half,
                                hoveredHalf?.seg === key && hoveredHalf.half === which ? styles.halfHover : '',
                                selection[key] === which ? styles.halfSelected : ''
                            ].join(' ')}
                            onMouseEnter={() => setHoveredHalf({ seg: key, half: which as 'top' | 'bottom' })}
                            onMouseLeave={leaveHalf}
                            onClick={() => clickHalf(which as 'top' | 'bottom', key)}
                        >
                            {selection[key] === which && (
                                <motion.div
                                    className={styles.icon}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <SettingsIcon fontSize="inherit" />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )

    return (
        <div className={styles.wrapper}>
            <div className={styles.dialogBox}>
                <div className={styles.topBar}>
                    <div ref={top1Ref} className={`${styles.segment} ${styles.segment1} ${styles.hoverable}`} onMouseEnter={() => enterSegment('top1')} onMouseLeave={() => leaveSegment('top1')} />
                    <div ref={top2Ref} className={`${styles.segment} ${styles.segment2} ${styles.hoverable}`} onMouseEnter={() => enterSegment('top2')} onMouseLeave={() => leaveSegment('top2')} />
                    <div ref={top3Ref} className={`${styles.segment} ${styles.segment3} ${styles.hoverable}`} onMouseEnter={() => enterSegment('top3')} onMouseLeave={() => leaveSegment('top3')} />
                    <div ref={top4Ref} className={`${styles.segment} ${styles.segment4} ${styles.hoverable}`} onMouseEnter={() => enterSegment('top4')} onMouseLeave={() => leaveSegment('top4')} />
                    <div className={`${styles.segment} ${styles.segment5}`} />
                    <div ref={top6Ref} className={`${styles.segment} ${styles.segment6} ${styles.hoverable}`} onMouseEnter={() => enterSegment('top6')} onMouseLeave={() => leaveSegment('top6')} />
                </div>

                {renderDropdown('top1', 32, undefined, top1Left, undefined, `${styles.dropdownPanelTop} ${styles.dropdownTop1}`)}
                {renderDropdown('top2', 32, undefined, top2Left, undefined, `${styles.dropdownPanelTop} ${styles.dropdownTop2}`)}
                {renderDropdown('top3', 32, undefined, top3Left, undefined, `${styles.dropdownPanelTop} ${styles.dropdownTop3}`)}
                {renderDropdown('top4', 32, undefined, top4Left, undefined, `${styles.dropdownPanelTop} ${styles.dropdownTop4}`)}
                {renderDropdown('top6', 32, undefined, undefined, 0, `${styles.dropdownPanelTop} ${styles.dropdownTop6}`)}

                <div className={styles.bottomBar}>
                    <div ref={bottomLeftRef} className={`${styles.segment} ${styles.bottomLeftSegment} ${styles.hoverable}`} onMouseEnter={() => enterSegment('bottomLeft')} onMouseLeave={() => leaveSegment('bottomLeft')} />
                    <div className={styles.bottomMiddleSegment} />
                    <div ref={bottomRightRef} className={`${styles.segment} ${styles.bottomRightSegment} ${styles.hoverable}`} onMouseEnter={() => enterSegment('bottomRight')} onMouseLeave={() => leaveSegment('bottomRight')} />
                </div>

                {renderDropdown('bottomLeft', undefined, 32, bottomLeft, undefined, `${styles.dropdownPanelBottom} ${styles.dropdownBottom}`)}
                {renderDropdown('bottomRight', undefined, 32, undefined, 0, `${styles.dropdownPanelBottom} ${styles.dropdownBottom}`)}
            </div>
        </div>
    )
}
