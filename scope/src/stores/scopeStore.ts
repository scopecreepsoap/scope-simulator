import { create } from 'zustand'
import { QUESTIONS } from '../data/questions'
import type { QuestionConfig } from '../types/QuestionConfig'

export type TestStep =
    | { type: 'prompt'; data: QuestionConfig; questionIndex: number }
    | {
    type: 'diagram'
    diagramKey: string
    parentQuestion: QuestionConfig
    questionIndex: number
}

interface ScopeState {
    appStatus: 'configuring' | 'ready' | 'running' | 'finished'
    selectedTime: number | null
    selectedLevel: number | null
    testSteps: TestStep[]
    currentIndex: number
    startTime: number
    timeLimit: number
    fullscreenDisabled: boolean
}

interface ScopeActions {
    setSelectedTime: (time: number | null) => void
    setSelectedLevel: (level: number | null) => void
    prepareTest: () => void
    beginTest: () => void
    previousQuestion: () => void
    nextQuestion: () => void
    endTest: () => void
    returnToHome: () => void
    toggleFullscreenDisabled: () => void
}

const ESTIMATED_TIMES: { [key: number]: number } = {
    1: 7.5,
    2: 15,
    3: 22.5,
}

export const useScopeStore = create<ScopeState & ScopeActions>((set, get) => ({
    appStatus: 'configuring',
    selectedTime: null,
    selectedLevel: null,
    testSteps: [],
    currentIndex: 0,
    startTime: 0,
    timeLimit: 0,
    fullscreenDisabled: false,

    setSelectedTime: (time) => set({ selectedTime: time }),
    setSelectedLevel: (level) => set({ selectedLevel: level }),

    /**
     * Prepares the test by generating the question list based on user selections
     * and putting the app into the 'ready' state.
     */
    prepareTest: () => {
        const { selectedLevel, selectedTime } = get()
        if (!selectedLevel || !selectedTime) return

        const totalTimeInSeconds = selectedTime * 60
        let timeUsed = 0
        const finalTestQuestions: QuestionConfig[] = []
        const availableQuestions = structuredClone(QUESTIONS)
        const questionsByLevel: { [key: number]: QuestionConfig[] } = { 1: [], 2: [], 3: [] }
        for (const q of availableQuestions) {
            questionsByLevel[q.level].push(q)
        }
        const primaryPool = questionsByLevel[selectedLevel]
        while (primaryPool.length > 0) {
            const estimatedTime = ESTIMATED_TIMES[selectedLevel]
            if (timeUsed + estimatedTime <= totalTimeInSeconds) {
                finalTestQuestions.push(primaryPool.shift()!)
                timeUsed += estimatedTime
            } else { break }
        }
        for (let level = selectedLevel - 1; level >= 1; level--) {
            const backfillPool = questionsByLevel[level]
            while (backfillPool.length > 0) {
                const estimatedTime = ESTIMATED_TIMES[level]
                if (timeUsed + estimatedTime <= totalTimeInSeconds) {
                    finalTestQuestions.push(backfillPool.shift()!)
                    timeUsed += estimatedTime
                } else { break }
            }
        }

        const shuffledQuestions = finalTestQuestions.sort(() => Math.random() - 0.5)

        const finalTestSteps: TestStep[] = []
        shuffledQuestions.forEach((question, questionIndex) => {
            finalTestSteps.push({
                type: 'prompt',
                data: question,
                questionIndex: questionIndex,
            })

            if (question.diagram && question.diagram.length > 0) {
                for (const diagramKey of question.diagram) {
                    finalTestSteps.push({
                        type: 'diagram',
                        diagramKey: diagramKey,
                        parentQuestion: question,
                        questionIndex: questionIndex,
                    })
                }
            }
        })

        set({
            testSteps: finalTestSteps,
            timeLimit: totalTimeInSeconds,
            currentIndex: 0,
            appStatus: 'ready',
        })
    },

    /**
     * Starts the test timer and transitions the app to the 'running' state.
     */
    beginTest: () => {
        set({
            startTime: Date.now(),
            appStatus: 'running',
        })
    },
    previousQuestion: () => {
        const { currentIndex } = get()
        if (currentIndex > 0) {
            set({ currentIndex: currentIndex - 1 })
        }
    },
    nextQuestion: () => {
        const { currentIndex, testSteps } = get()
        if (currentIndex < testSteps.length - 1) {
            set({ currentIndex: currentIndex + 1 })
        } else {
            set({ appStatus: 'finished' })
        }
    },
    endTest: () => set({ appStatus: 'finished' }),
    returnToHome: () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        }
        set({
            appStatus: 'configuring',
            selectedTime: null,
            selectedLevel: null,
            testSteps: [],
        })
    },

    toggleFullscreenDisabled: () =>
        set((state) => ({ fullscreenDisabled: !state.fullscreenDisabled })),

}))
