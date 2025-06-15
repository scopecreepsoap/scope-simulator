import { useEffect, useState, useCallback } from 'react'
import styles from './styles/App.module.css'
import { MenuOverlay } from './components/MenuOverlay'
import { QUESTIONS } from './data/questions'
import { QuestionArea } from './components/QuestionArea'
import { DiagramRenderer } from './components/DiagramRenderer'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
    const [currentPage, setCurrentPage] = useState(1)
    const [menuVisible, setMenuVisible] = useState(false)
    const [menuClosing, setMenuClosing] = useState(false)
    const [showDiagram, setShowDiagram] = useState(false)

    const handleBack = useCallback(() => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur() // avoid issue with slider adjusting
        }

        if (showDiagram) {
            setShowDiagram(false) // go back to question
        } else {
            setCurrentPage((prev) => Math.max(1, prev - 1))
            setShowDiagram(true) // go to diagram of previous question
        }
    }, [showDiagram])

    const handleNext = useCallback(() => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur() // avoid issue with slider adjusting
        }

        if (!showDiagram) {
            setShowDiagram(true) // go to diagram for current question
        } else if (currentPage < QUESTIONS.length) {
            setCurrentPage((prev) => prev + 1) // go to next question
            setShowDiagram(false)
        }
    }, [currentPage, showDiagram])

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

            const zoneSize = 100 // px

            const centerX = innerWidth / 2
            const centerY = innerHeight / 2

            const inCenterZone =
                x > centerX - zoneSize &&
                x < centerX + zoneSize &&
                y > centerY - zoneSize &&
                y < centerY + zoneSize

            const inCornerZone =
                (x < zoneSize && y < zoneSize) || // top-left
                (x > innerWidth - zoneSize && y < zoneSize) || // top-right
                (x < zoneSize && y > innerHeight - zoneSize) || // bottom-left
                (x > innerWidth - zoneSize && y > innerHeight - zoneSize) // bottom-right

            if (inCenterZone && menuVisible && !menuClosing) {
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
    const transitionKey = `${currentPage}-${showDiagram}`

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
                        {!showDiagram ? (
                            <QuestionArea
                                question={QUESTIONS[currentPage - 1]}
                                index={currentPage - 1}
                            />
                        ) : (
                            <DiagramRenderer
                                diagramKey={QUESTIONS[currentPage - 1].diagram}
                                index={currentPage - 1}
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
                    />
                </div>
            )}
        </div>
    )
}

export default App
