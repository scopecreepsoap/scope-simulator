import { useEffect, useState, useCallback, useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './styles/App.module.css'
import { MenuOverlay } from './components/MenuOverlay'
import { QuestionArea } from './components/QuestionArea'
import { DiagramRenderer } from './components/DiagramRenderer'
import { ScopeHome } from './components/ScopeHome'
import strings from './data/strings'
import { useScopeStore } from './stores/scopeStore'
import { BeginScope } from './components/BeginScope'
import { ScopeComplete } from './components/ScopeComplete'
import {ScopeResults} from "./components/ScopeResults";

function App() {
    const [manualOpenTime, setManualOpenTime] = useState(0)
    const [isInfoVisible, setIsInfoVisible] = useState(false)
    const hasShownToast = useRef(false)
    const {
        appStatus,
        testSteps,
        currentIndex,
        nextQuestion,
        previousQuestion,
        returnToHome,
        isMenuVisible,
        openMenu,
        closeMenu,
    } = useScopeStore()


    /**
     * 🔵 MENU CONTROLS
     */
    const handleBack = useCallback(() => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
        previousQuestion()
    }, [previousQuestion])

    const handleNext = useCallback(() => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
        nextQuestion()
    }, [nextQuestion])

    const handleExit = () => {
        closeMenu()
        returnToHome()
    }


    /**
     * 🔴 APP LOGIC
     */

    // Run test timer
    useEffect(() => {
        let timerInterval: number

        if (appStatus === 'running') {
            const { startTime, timeLimit, endTest } = useScopeStore.getState()

            // 🟢 Only run timer if time limit specified
            if (timeLimit > 0) {
                timerInterval = window.setInterval(() => {
                    const elapsedTime = (Date.now() - startTime) / 1000
                    const newRemainingTime = Math.max(timeLimit - elapsedTime, 0)

                    if (newRemainingTime <= 0) {
                        clearInterval(timerInterval)
                        endTest()
                    }
                }, 1000)
            }
        }

        return () => {
            clearInterval(timerInterval)
        }
    }, [appStatus])

    // Click 'Spacebar' to show Menu, '←' to go Back, '→' to go Next
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement

            if (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && target.getAttribute('type')
                !== 'range')
            ) {
                return; // Allow using space in UI fields
            }

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
                if (isMenuVisible) { // 🟢
                    closeMenu()
                } else if (appStatus === 'running' || appStatus === 'ready' || appStatus === 'loaded') {
                    openMenu()
                    setManualOpenTime(Date.now())
                }
            }

            if (useScopeStore.getState().appStatus === 'running') {
                if (event.code === 'ArrowLeft' || key === 'a') {
                    handleBack()
                } else if (event.code === 'ArrowRight' || key === 'd') {
                    handleNext()
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isMenuVisible, closeMenu, openMenu, handleBack, handleNext, appStatus, setManualOpenTime])

    // Show menu if mouse moves to corners of page
    // Hide menu if mouse moves to center of page
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Exit early and do nothing if the info page is visible
            if (isInfoVisible) return

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
                (x < cornerZoneSize && y < cornerZoneSize) ||
                (x > innerWidth - cornerZoneSize && y < cornerZoneSize) ||
                (x < cornerZoneSize && y > innerHeight - cornerZoneSize) ||
                (x > innerWidth - cornerZoneSize && y > innerHeight - cornerZoneSize)

            if (inCenterZone && isMenuVisible) {
                if (Date.now() - manualOpenTime > 1000) {
                    closeMenu()
                }
            }

            if (inCornerZone && !isMenuVisible &&
                    (appStatus === 'running' || appStatus === 'ready' || appStatus === 'loaded')) {
                openMenu()
                setManualOpenTime(Date.now())
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [isMenuVisible, closeMenu, openMenu, isInfoVisible, appStatus, manualOpenTime, setManualOpenTime])

    // Notification -> 'Press Spacebar for Menu'
    useEffect(() => {
        if (!hasShownToast.current && appStatus === 'ready') {
            toast(strings.notifications.pressSpace)
            hasShownToast.current = true
        }
    }, [appStatus])

    // Go into fullscreen when test starts
    useEffect(() => {
        const { fullscreenDisabled } = useScopeStore.getState()

        if (appStatus === 'running' && !fullscreenDisabled) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(
                    `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
                )
            })
        }
    }, [appStatus])

    const currentStep = testSteps[currentIndex]
    const transitionKey = `${currentIndex}`


    /**
     * 🟢 RENDER UI
     */
    return (
        <div className={styles.appContainer}>

            {/* NOTIFICATIONS */}
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'transparent',
                        color: '#79cfff',
                        fontWeight: '500',
                        fontSize: '16px',
                        letterSpacing: '0.03em',
                        padding: '14px 20px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        boxShadow:
                            '1px 1px 0 midnightblue, 10px 10px 50px rgba(0, 0, 155, 0.7)',
                        border: '0',
                    },
                }}
            />

            {/* SCOPE HOME */}
            <motion.div
                className={styles.screen}
                animate={{
                    filter:
                        appStatus === 'ready' || appStatus === 'finished'
                            ? 'blur(10px)'
                            : 'blur(0px)',
                    opacity: appStatus === 'configuring' || appStatus === 'loaded' ? 1 : 0,
                    pointerEvents: appStatus === 'configuring' || appStatus === 'loaded' ? 'auto' : 'none',
                }}
                transition={{ duration: 0.3 }}
            >
                <ScopeHome />
            </motion.div>

            {/* BEGIN SCOPE */}
            <motion.div
                className={styles.screen}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: appStatus === 'ready' ? 1 : 0,
                    pointerEvents: appStatus === 'ready' ? 'auto' : 'none',
                }}
                transition={{ duration: 0.3 }}
            >
                <BeginScope />
            </motion.div>

            {/* SCOPE EXAM */}
            <motion.div
                className={`${styles.screen} ${styles.mainContent}`}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: appStatus === 'running' ? 1 : 0,
                    pointerEvents: appStatus === 'running' ? 'auto' : 'none',
                }}
            >
                {currentStep && (
                    <motion.div
                        key={transitionKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.stepContainer}
                    >
                        {currentStep.type === 'diagram' ? (
                            <DiagramRenderer
                                diagramKeys={[currentStep.diagramKey]}
                                index={currentStep.questionIndex}
                                context={currentStep.parentQuestion.context}
                            />
                        ) : (
                            <QuestionArea
                                question={currentStep.data}
                                index={currentStep.questionIndex}
                            />
                        )}
                    </motion.div>
                )}
            </motion.div>

            {/* SCOPE COMPLETE */}
            <motion.div
                className={styles.screen}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: appStatus === 'finished' ? 1 : 0,
                    pointerEvents: appStatus === 'finished' ? 'auto' : 'none',
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <ScopeComplete />
            </motion.div>

            {/* VIEW RESULTS */}
            <motion.div
                className={styles.resultsScreen}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: appStatus === 'review' ? 1 : 0,
                    pointerEvents: appStatus === 'review' ? 'auto' : 'none',
                }}
                transition={{ duration: 0.3 }}
            >
                <ScopeResults />
            </motion.div>

            {/* MENU OVERLAY */}
            <AnimatePresence>
                {isMenuVisible && (
                    <motion.div
                        className={styles.menuOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <MenuOverlay
                            onBack={handleBack}
                            onNext={handleNext}
                            onExit={handleExit}
                            stepIndex={currentIndex}
                            isInfoVisible={isInfoVisible}
                            setIsInfoVisible={setIsInfoVisible}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default App
