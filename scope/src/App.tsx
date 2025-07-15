import { useEffect, useState, useCallback, useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import styles from './styles/App.module.css'
import { MenuOverlay } from './components/MenuOverlay'
import { QuestionArea } from './components/QuestionArea'
import { DiagramRenderer } from './components/DiagramRenderer'
import { ScopeHome } from './components/ScopeHome'
import strings from './data/strings'
import { useScopeStore } from './stores/scopeStore'
import { BeginScope } from './components/BeginScope'
import { ScopeComplete } from './components/ScopeComplete'

function App() {
    const [menuVisible, setMenuVisible] = useState(false)
    const [menuClosing, setMenuClosing] = useState(false)
    const [manualOpenTime, setManualOpenTime] = useState(0)
    const hasShownToast = useRef(false)
    const {
        appStatus,
        testSteps,
        currentIndex,
        nextQuestion,
        previousQuestion,
        returnToHome,
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

    const handleInfo = () => console.log('Info button clicked!')
    const handleExit = () => returnToHome()


    /**
     * 🔴 APP LOGIC
     */

    // Run test timer
    useEffect(() => {
        let timerInterval: number

        if (appStatus === 'running') {
            const { startTime, timeLimit, endTest } = useScopeStore.getState()

            timerInterval = window.setInterval(() => {
                const elapsedTime = (Date.now() - startTime) / 1000
                const newRemainingTime = Math.max(timeLimit - elapsedTime, 0)

                if (newRemainingTime <= 0) {
                    toast('SCOPE Complete')
                    clearInterval(timerInterval)
                    endTest()
                }
            }, 1000)
        }

        return () => {
            clearInterval(timerInterval)
        }
    }, [appStatus])

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
            const inCenterZone = x > centerX - centerZoneSize / 2 &&
                x < centerX + centerZoneSize / 2 && y > centerY - centerZoneSize / 2 &&
                y < centerY + centerZoneSize / 2
            const inCornerZone = (x < cornerZoneSize && y < cornerZoneSize) ||
                (x > innerWidth - cornerZoneSize && y < cornerZoneSize) ||
                (x < cornerZoneSize && y > innerHeight - cornerZoneSize) ||
                (x > innerWidth - cornerZoneSize && y > innerHeight - cornerZoneSize)

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
    }, [menuVisible, menuClosing, manualOpenTime])

    // Notification -> 'Press Spacebar for Menu'
    useEffect(() => {
        if (!hasShownToast.current && appStatus === 'configuring') {
            toast(strings.notifications.pressSpace)
            hasShownToast.current = true
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
                    opacity: appStatus === 'configuring' ? 1 : 0,
                    pointerEvents: appStatus === 'configuring' ? 'auto' : 'none',
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

            {/* MENU OVERLAY */}
            {menuVisible && (
                <div
                    className={`${styles.menuOverlay} ${
                        menuClosing ? styles.fadeOut : ''
                    }`}
                >
                    <MenuOverlay
                        onBack={handleBack}
                        onNext={handleNext}
                        onInfo={handleInfo}
                        onExit={handleExit}
                        stepIndex={currentIndex}
                    />
                </div>
            )}
        </div>
    )
}

export default App
