import { useEffect, useState } from 'react'
import styles from './styles/App.module.css'
import { MenuOverlay } from './components/MenuOverlay'
import { QUESTIONS } from './data/questions'
import { QuestionArea } from './components/QuestionArea'
import {DiagramRenderer} from "./components/DiagramRenderer.tsx";

function App() {
    const [currentPage, setCurrentPage] = useState(1)
    const [menuVisible, setMenuVisible] = useState(false)
    const [menuClosing, setMenuClosing] = useState(false)
    const [showDiagram, setShowDiagram] = useState(false)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
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
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [menuVisible])

    // Hide menu if mouse moves to center of page
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e
            const { innerWidth, innerHeight } = window

            const zoneSize = 250 // px

            const centerX = innerWidth / 2
            const centerY = innerHeight / 2

            const inZone =
                x > centerX - zoneSize / 2 &&
                x < centerX + zoneSize / 2 &&
                y > centerY - zoneSize / 2 &&
                y < centerY + zoneSize / 2

            if (inZone && menuVisible && !menuClosing) {
                setMenuClosing(true)
                setTimeout(() => {
                    setMenuVisible(false)
                    setMenuClosing(false)
                }, 250)
            }
        }

        if (menuVisible) {
            window.addEventListener('mousemove', handleMouseMove)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [menuVisible, menuClosing])


    console.log('QUESTIONS:', QUESTIONS)
    console.log(QUESTIONS[currentPage - 1])

    const handleBack = () => {
        if (showDiagram) {
            setShowDiagram(false) // go back to question
        } else {
            setCurrentPage((prev) => Math.max(1, prev - 1))
            setShowDiagram(true) // go to diagram of previous question
        }
    }

    const handleNext = () => {
        if (!showDiagram) {
            setShowDiagram(true) // go to diagram for current question
        } else if (currentPage < QUESTIONS.length) {
            setCurrentPage((prev) => prev + 1) // go to next question
            setShowDiagram(false)
        }
    }

    const handleInfo = () => console.log('Info button clicked!')
    const handleExit = () => console.log('Exit button clicked!')

    return (
        <div className={styles.appContainer}>
            <div className={styles.mainContent}>
                {!showDiagram ? (
                    <QuestionArea
                        question={QUESTIONS[currentPage - 1]}
                        index={currentPage - 1}
                    />
                ) : (
                    <DiagramRenderer
                        diagramKey={QUESTIONS[currentPage - 1].diagram}
                    />
                )}
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
