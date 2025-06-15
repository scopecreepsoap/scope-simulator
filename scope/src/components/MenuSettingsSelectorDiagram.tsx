import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SettingsIcon from '@mui/icons-material/Settings'
import styles from '../styles/MenuSettingsSelectorDiagram.module.css'

interface Position { x: number; y: number }

export const MenuSettingsSelectorDiagram: React.FC = () => {
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
    const [hoveredHalf, setHoveredHalf] = useState<'top' | 'bottom' | null>(null)
    const [clickedHalf, setClickedHalf] = useState<'top' | 'bottom' | null>(null)
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
    const [selectedPos, setSelectedPos] = useState<Position | null>(null)

    // refs for offset calculations
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
        if (selectedSegment === seg) return
        setHoveredSegment(null)
        setHoveredHalf(null)
    }

    const enterHalf = (which: 'top' | 'bottom') => setHoveredHalf(which)
    const leaveHalf = () => setHoveredHalf(null)

    const clickHalf = (
        which: 'top' | 'bottom',
        seg: string,
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        setClickedHalf(prev => (prev === which ? null : which))
        setSelectedSegment(prev => (prev === seg ? null : seg))
        // center icon
        const r = e.currentTarget.getBoundingClientRect()
        setSelectedPos({ x: r.left + r.width/2, y: r.top + r.height/2 })
    }

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
                        onMouseLeave={() => leaveSegment('top1')}
                    />
                    <div
                        ref={top2Ref}
                        className={`${styles.segment} ${styles.segment2} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('top2')}
                        onMouseLeave={() => leaveSegment('top2')}
                    />
                    <div
                        ref={top3Ref}
                        className={`${styles.segment} ${styles.segment3} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('top3')}
                        onMouseLeave={() => leaveSegment('top3')}
                    />
                    <div
                        ref={top4Ref}
                        className={`${styles.segment} ${styles.segment4} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('top4')}
                        onMouseLeave={() => leaveSegment('top4')}
                    />
                    <div className={`${styles.segment} ${styles.segment5}`} />
                    <div
                        ref={top6Ref}
                        className={`${styles.segment} ${styles.segment6} ${styles.hoverable}`}
                        onMouseEnter={() => enterSegment('top6')}
                        onMouseLeave={() => leaveSegment('top6')}
                    />
                </div>

                {/* — Top1 Dropdown — */}
                {(hoveredSegment === 'top1' || selectedSegment === 'top1') && (
                    <div
                        className={`${styles.dropdownPanelTop} ${styles.dropdownTop1}`}
                        style={{ top: 32, left: top1Left }}
                        onMouseEnter={() => enterSegment('top1')}
                        onMouseLeave={() => leaveSegment('top1')}
                    >
                        {/* halves… */}
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='top'?styles.halfHover:'',
                                clickedHalf==='top'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('top','top1',e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='bottom'?styles.halfHover:'',
                                clickedHalf==='bottom'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('bottom','top1',e)}
                        />
                    </div>
                )}

                {/* — Top2 Dropdown — */}
                {(hoveredSegment==='top2'||selectedSegment==='top2')&&(
                    <div
                        className={`${styles.dropdownPanelTop} ${styles.dropdownTop2}`}
                        style={{ top:32,left:top2Left }}
                        onMouseEnter={()=>enterSegment('top2')}
                        onMouseLeave={()=>leaveSegment('top2')}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='top'?styles.halfHover:'',
                                clickedHalf==='top'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('top','top2',e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='bottom'?styles.halfHover:'',
                                clickedHalf==='bottom'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('bottom','top2',e)}
                        />
                    </div>
                )}

                {/* — Top3 Dropdown — */}
                {(hoveredSegment==='top3'||selectedSegment==='top3')&&(
                    <div
                        className={`${styles.dropdownPanelTop} ${styles.dropdownTop3}`}
                        style={{ top:32,left:top3Left }}
                        onMouseEnter={()=>enterSegment('top3')}
                        onMouseLeave={()=>leaveSegment('top3')}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='top'?styles.halfHover:'',
                                clickedHalf==='top'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('top','top3',e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='bottom'?styles.halfHover:'',
                                clickedHalf==='bottom'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('bottom','top3',e)}
                        />
                    </div>
                )}

                {/* — Top4 Dropdown — */}
                {(hoveredSegment==='top4'||selectedSegment==='top4')&&(
                    <div
                        className={`${styles.dropdownPanelTop} ${styles.dropdownTop4}`}
                        style={{ top:32,left:top4Left }}
                        onMouseEnter={()=>enterSegment('top4')}
                        onMouseLeave={()=>leaveSegment('top4')}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='top'?styles.halfHover:'',
                                clickedHalf==='top'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('top','top4',e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='bottom'?styles.halfHover:'',
                                clickedHalf==='bottom'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('bottom','top4',e)}
                        />
                    </div>
                )}

                {/* — Top6 Dropdown — */}
                {(hoveredSegment==='top6'||selectedSegment==='top6')&&(
                    <div
                        className={`${styles.dropdownPanelTop} ${styles.dropdownTop6}`}
                        style={{ top:32,right:0 }}
                        onMouseEnter={()=>enterSegment('top6')}
                        onMouseLeave={()=>leaveSegment('top6')}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='top'?styles.halfHover:'',
                                clickedHalf==='top'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('top','top6',e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='bottom'?styles.halfHover:'',
                                clickedHalf==='bottom'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('bottom','top6',e)}
                        />
                    </div>
                )}

                {/* — Bottom Bar — */}
                <div className={styles.bottomBar}>
                    <div
                        ref={bottomLeftRef}
                        className={`${styles.segment} ${styles.bottomLeftSegment} ${styles.hoverable}`}
                        onMouseEnter={()=>enterSegment('bottomLeft')}
                        onMouseLeave={()=>leaveSegment('bottomLeft')}
                    />
                    <div className={styles.bottomMiddleSegment}/>
                    <div
                        ref={bottomRightRef}
                        className={`${styles.segment} ${styles.bottomRightSegment} ${styles.hoverable}`}
                        onMouseEnter={()=>enterSegment('bottomRight')}
                        onMouseLeave={()=>leaveSegment('bottomRight')}
                    />
                </div>

                {/* — Bottom Left Dropdown — */}
                {(hoveredSegment==='bottomLeft'||selectedSegment==='bottomLeft')&&(
                    <div
                        className={`${styles.dropdownPanelBottom} ${styles.dropdownBottom}`}
                        style={{ bottom:32,left:bottomLeft }}
                        onMouseEnter={()=>enterSegment('bottomLeft')}
                        onMouseLeave={()=>leaveSegment('bottomLeft')}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='top'?styles.halfHover:'',
                                clickedHalf==='top'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('top','bottomLeft',e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='bottom'?styles.halfHover:'',
                                clickedHalf==='bottom'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('bottom','bottomLeft',e)}
                        />
                    </div>
                )}

                {/* — Bottom Right Dropdown — */}
                {(hoveredSegment==='bottomRight'||selectedSegment==='bottomRight')&&(
                    <div
                        className={`${styles.dropdownPanelBottom} ${styles.dropdownBottom}`}
                        style={{ bottom:32,right:0 }}
                        onMouseEnter={()=>enterSegment('bottomRight')}
                        onMouseLeave={()=>leaveSegment('bottomRight')}
                    >
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='top'?styles.halfHover:'',
                                clickedHalf==='top'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('top')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('top','bottomRight',e)}
                        />
                        <div
                            className={[
                                styles.half,
                                hoveredHalf==='bottom'?styles.halfHover:'',
                                clickedHalf==='bottom'?styles.halfSelected:'',
                            ].join(' ')}
                            onMouseEnter={()=>enterHalf('bottom')}
                            onMouseLeave={leaveHalf}
                            onClick={e=>clickHalf('bottom','bottomRight',e)}
                        />
                    </div>
                )}

                {/* — Settings Icon when clicked — */}
                {selectedPos && (
                    <motion.div
                        className={styles.icon}
                        style={{ left:selectedPos.x,top:selectedPos.y }}
                        initial={{ opacity:0 }}
                        animate={{ opacity:1 }}
                        exit={{ opacity:0 }}
                        transition={{ duration:0.3 }}
                    >
                        <SettingsIcon fontSize="inherit"/>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
