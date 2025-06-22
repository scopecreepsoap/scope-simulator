import { useEffect, useState, useCallback, useMemo } from 'react'
import styles from './styles/App.module.css'
import { MenuOverlay } from './components/MenuOverlay'
import { QUESTIONS } from './data/questions'
import { QuestionArea } from './components/QuestionArea'
import { DiagramRenderer } from './components/DiagramRenderer'
import { motion, AnimatePresence } from 'framer-motion'
import type {QuestionConfig} from "./types/QuestionConfig";

function App() {
    const [stepIndex, setStepIndex] = useState(0)
    const [menuVisible, setMenuVisible] = useState(false)
    const [menuClosing, setMenuClosing] = useState(false)
    const [manualOpenTime, setManualOpenTime] = useState(0)

    type Step =
        | { type: 'prompt'; question: QuestionConfig; questionIndex: number }
        | { type: 'diagram'; diagramKey: string; questionIndex: number }

    const steps: Step[] = useMemo(() => {
        return QUESTIONS.flatMap((q, qIndex) => [
            { type: 'prompt', question: q, questionIndex: qIndex },
            ...q.diagram.map((d: string): Step => ({
                type: 'diagram',
                diagramKey: d,
                questionIndex: qIndex
            }))
        ])
    }, [])

    const currentStep = steps[stepIndex]

    const handleBack = useCallback(() => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur() // avoid issue with slider adjusting
        }
        setStepIndex((prev) => Math.max(0, prev - 1))
    }, [])

    const handleNext = useCallback(() => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
        setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))
    }, [steps.length])

    // Click 'Spacebar' to show Menu, '←' to go Back, '→' to go Next
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const active = document.activeElement
            const isArrowKey = event.code === 'ArrowLeft' || event.code === 'ArrowRight'

            // Prevent arrow key presses from accidentally adjusting slider
            if (active instanceof HTMLInputElement && active.type === 'range' && isArrowKey) {
                event.preventDefault()
                active.blur()
            }

            const key = event.key.toLowerCase()

            if (event.code === 'Space') {
                event.preventDefault()
                if (menuVisible) {
                    setMenuClosing(true)
                    setTimeout(() => {
                        setMenuVisible(false)
                        setMenuClosing(false)
                    }, 250)
                } else {
                    setMenuVisible(true)
                    setManualOpenTime(Date.now())
                }
            } else if (event.code === 'ArrowLeft' || key === 'a') {
                handleBack()
            } else if (event.code === 'ArrowRight' || key === 'd') {
                handleNext()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [menuVisible, handleBack, handleNext])

    // Show menu if mouse moves to corners of page
    // Hide menu if mouse moves to center of page
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e
            const { innerWidth, innerHeight } = window

            // Pixels (px)
            const centerZoneSize = 500
            const cornerZoneSize = 100

            const centerX = innerWidth / 2
            const centerY = innerHeight / 2

            const inCenterZone =
                x > centerX - centerZoneSize / 2 &&
                x < centerX + centerZoneSize / 2 &&
                y > centerY - centerZoneSize / 2 &&
                y < centerY + centerZoneSize / 2

            const inCornerZone =
                (x < cornerZoneSize && y < cornerZoneSize) || // top-left
                (x > innerWidth - cornerZoneSize && y < cornerZoneSize) || // top-right
                (x < cornerZoneSize && y > innerHeight - cornerZoneSize) || // bottom-left
                (x > innerWidth - cornerZoneSize && y > innerHeight - cornerZoneSize) // bottom-right

            if (inCenterZone && menuVisible && !menuClosing && Date.now() - manualOpenTime > 1500) {
                setMenuClosing(true)
                setTimeout(() => {
                    setMenuVisible(false)
                    setMenuClosing(false)
                }, 250)
            }

            if (inCornerZone && !menuVisible && !menuClosing) {
                setMenuVisible(true)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [menuVisible, menuClosing])

    const handleInfo = () => console.log('Info button clicked!')
    const handleExit = () => console.log('Exit button clicked!')

    // Unique key to identify AnimatePresence component
    const transitionKey = `${stepIndex}`

    return (
        <div className={styles.appContainer}>
            <div className={styles.mainContent}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={transitionKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {currentStep.type === 'prompt' ? (
                            <QuestionArea
                                question={currentStep.question}
                                index={currentStep.questionIndex}
                            />
                        ) : (
                            <DiagramRenderer
                                diagramKeys={[currentStep.diagramKey]}
                                index={currentStep.questionIndex}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            {menuVisible && (
                <div className={`${styles.menuOverlay} ${menuClosing ? styles.fadeOut : ''}`}>
                    <MenuOverlay
                        onBack={handleBack}
                        onNext={handleNext}
                        onInfo={handleInfo}
                        onExit={handleExit}
                        stepIndex={stepIndex}
                    />
                </div>
            )}
        </div>
    )
}

export default App
