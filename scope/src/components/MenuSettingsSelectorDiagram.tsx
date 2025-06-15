import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SettingsIcon from '@mui/icons-material/Settings'
import styles from '../styles/MenuSettingsSelectorDiagram.module.css'

interface Position {
    x: number
    y: number
}

export const MenuSettingsSelectorDiagram: React.FC = () => {
    // Which “segment” is hovered: top1…top4, bottomLeft, bottomRight
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
    // Which half of the open menu is hovered
    const [hoveredHalf, setHoveredHalf] = useState<'top' | 'bottom' | null>(
        null
    )
    // Which half has been clicked (toggled)
    const [clickedHalf, setClickedHalf] = useState<'top' | 'bottom' | null>(
        null
    )
    // Where to place the Settings icon
    const [selectedPos, setSelectedPos] = useState<Position | null>(null)

    // Refs to measure left offsets
    const top1Ref = useRef<HTMLDivElement>(null)
    const top2Ref = useRef<HTMLDivElement>(null)
    const top3Ref = useRef<HTMLDivElement>(null)
    const top4Ref = useRef<HTMLDivElement>(null)
    const bottomLeftRef = useRef<HTMLDivElement>(null)
    const bottomRightRef = useRef<HTMLDivElement>(null)

    /** Helpers to open/close segments */
    const enterSegment = (seg: string) => {
        setHoveredSegment(seg)
        setHoveredHalf(null)
        setClickedHalf(null)
    }
    const leaveSegment = () => {
        setHoveredSegment(null)
        setHoveredHalf(null)
    }

    /** Half-menu interactions */
    const enterHalf = (which: 'top' | 'bottom') => setHoveredHalf(which)
    const leaveHalf = () => setHoveredHalf(null)
    const clickHalf = (
        which: 'top' | 'bottom',
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        setClickedHalf(prev => (prev === which ? null : which))
        // center the icon in that half
        const r = e.currentTarget.getBoundingClientRect()
        const x = r.left + r.width / 2
        const y =
            r.top + (which === 'top' ? r.height / 4 : (3 * r.height) / 4)
        setSelectedPos({ x, y })
    }

    /** Compute left/right for each dropdown */
    const offset = (ref: React.RefObject<HTMLDivElement | null>) =>
        ref.current?.offsetLeft ?? 0
    const top1Left = offset(top1Ref)
    const top2Left = offset(top2Ref)
    const top3Left = offset(top3Ref)
    const top4Left = offset(top4Ref)
    const bottomLeft = offset(bottomLeftRef)

    return (
        <div className={styles.wrapper}>
            <div className={styles.dialogBox}>
                {/* — Top Bar — */}
                <div className={styles.topBar}>
                    <div
                        ref={top1Ref}
                        className={`${styles.segment} ${styles.segment1} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('top1')}
                        onMouseLeave={leaveSegment}
                    />
                    <div
                        ref={top2Ref}
                        className={`${styles.segment} ${styles.segment2} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('top2')}
                        onMouseLeave={leaveSegment}
                    />
                    <div
                        ref={top3Ref}
                        className={`${styles.segment} ${styles.segment3} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('top3')}
                        onMouseLeave={leaveSegment}
                    />
                    <div
                        ref={top4Ref}
                        className={`${styles.segment} ${styles.segment4} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('top4')}
                        onMouseLeave={leaveSegment}
                    />
                    {/* dead space */}
                    <div className={`${styles.segment} ${styles.segment5}`} />
                </div>

                {/* — Top1 Dropdown — */}
                {hoveredSegment === 'top1' && (
                    <div
                        className={`${styles.dropdownPanelTop} ${styles.dropdownTop1}`}
                        style={{ top: 32, left: top1Left }}
                        onMouseLeave={leaveSegment}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'top' ? styles.halfHover : '',
                                clickedHalf === 'top' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('top', e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'bottom' ? styles.halfHover : '',
                                clickedHalf === 'bottom' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('bottom', e)}
                        />
                    </div>
                )}

                {/* — Top2 Dropdown — */}
                {hoveredSegment === 'top2' && (
                    <div
                        className={`${styles.dropdownPanelTop} ${styles.dropdownTop2}`}
                        style={{ top: 32, left: top2Left }}
                        onMouseLeave={leaveSegment}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'top' ? styles.halfHover : '',
                                clickedHalf === 'top' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('top', e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'bottom' ? styles.halfHover : '',
                                clickedHalf === 'bottom' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('bottom', e)}
                        />
                    </div>
                )}

                {/* — Top3 Dropdown — */}
                {hoveredSegment === 'top3' && (
                    <div
                        className={`${styles.dropdownPanelTop} ${styles.dropdownTop3}`}
                        style={{ top: 32, left: top3Left }}
                        onMouseLeave={leaveSegment}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'top' ? styles.halfHover : '',
                                clickedHalf === 'top' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('top', e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'bottom' ? styles.halfHover : '',
                                clickedHalf === 'bottom' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('bottom', e)}
                        />
                    </div>
                )}

                {/* — Top4 Dropdown — */}
                {hoveredSegment === 'top4' && (
                    <div
                        className={`${styles.dropdownPanelTop} ${styles.dropdownTop4}`}
                        style={{ top: 32, left: top4Left }}
                        onMouseLeave={leaveSegment}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'top' ? styles.halfHover : '',
                                clickedHalf === 'top' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('top', e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'bottom' ? styles.halfHover : '',
                                clickedHalf === 'bottom' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('bottom', e)}
                        />
                    </div>
                )}

                {/* — Bottom Bar — */}
                <div className={styles.bottomBar}>
                    <div
                        ref={bottomLeftRef}
                        className={`${styles.segment} ${styles.bottomLeftSegment} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('bottomLeft')}
                        onMouseLeave={leaveSegment}
                    />
                    <div className={styles.bottomMiddleSegment} />
                    <div
                        ref={bottomRightRef}
                        className={`${styles.segment} ${styles.bottomRightSegment} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('bottomRight')}
                        onMouseLeave={leaveSegment}
                    />
                </div>

                {/* — Bottom Left Dropdown — */}
                {hoveredSegment === 'bottomLeft' && (
                    <div
                        className={`${styles.dropdownPanelBottom} ${styles.dropdownBottom}`}
                        style={{ bottom: 32, left: bottomLeft }}
                        onMouseLeave={leaveSegment}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'top' ? styles.halfHover : '',
                                clickedHalf === 'top' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('top', e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'bottom' ? styles.halfHover : '',
                                clickedHalf === 'bottom' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('bottom', e)}
                        />
                    </div>
                )}

                {/* — Bottom Right Dropdown — */}
                {hoveredSegment === 'bottomRight' && (
                    <div
                        className={`${styles.dropdownPanelBottom} ${styles.dropdownBottom}`}
                        style={{ bottom: 32, right: 0 }}
                        onMouseLeave={leaveSegment}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'top' ? styles.halfHover : '',
                                clickedHalf === 'top' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('top', e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf === 'bottom' ? styles.halfHover : '',
                                clickedHalf === 'bottom' ? styles.halfSelected : '',
                            ].join(' ')}
                            onMouseEnter={() => enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e => clickHalf('bottom', e)}
                        />
                    </div>
                )}

                {/* — Settings Icon when clicked — */}
                {selectedPos && (
                    <motion.div
                        className={styles.icon}
                        style={{ left: selectedPos.x, top: selectedPos.y }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SettingsIcon fontSize="inherit" />
                    </motion.div>
                )}
            </div>
        </div>
    )
}
