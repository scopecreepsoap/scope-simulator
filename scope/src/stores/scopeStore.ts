import { create } from 'zustand'
import type { QuestionConfig } from '../types/QuestionConfig'
import type { Answer } from '../types/plugin'
import {downloadFile} from "../utils/download";
import diagramRegistry from "../plugins/registry";

const initialSessionState = {
    userName: '',
    platforms: { desktop: false, web: false, mobile: false, ar: false },
    completionDate: null,
    testSteps: [],
    results: [],
};

export type TestStep =
    | { type: 'prompt'; data: QuestionConfig; questionIndex: number }
    | {
    type: 'diagram'
    diagramKey: string
    parentQuestion: QuestionConfig
    questionIndex: number
}

interface PlatformSelection {
    desktop: boolean;
    web: boolean;
    mobile: boolean;
    ar: boolean;
}

interface ScopeState {
    appStatus: 'configuring' | 'ready' | 'running' | 'finished' | 'review'
    allQuestions: QuestionConfig[]
    questionsLoading: boolean
    selectedTime: number | null
    selectedLevel: number | null
    testSteps: TestStep[]
    results: Answer[]
    currentIndex: number
    startTime: number
    timeLimit: number
    fullscreenDisabled: boolean
    userName: string
    platforms: PlatformSelection;
    completionDate: number | null
}

interface ScopeActions {
    loadQuestions: () => Promise<void>
    setSelectedTime: (time: number | null) => void
    setSelectedLevel: (level: number | null) => void
    prepareTest: () => void
    beginTest: () => void
    previousQuestion: () => void
    nextQuestion: () => void
    endTest: () => void
    returnToHome: () => void
    toggleFullscreenDisabled: () => void
    recordAnswer: (stepIndex: number, answer: Answer) => void
    viewResults: () => void
    setUserName: (name: string) => void
    setPlatforms: (platforms: PlatformSelection) => void;
    resetUserInfo: () => void;
    downloadJson: () => void
}

const ESTIMATED_TIMES: { [key: number]: number } = {
    1: 7.5,
    2: 15,
    3: 22.5,
}

export const useScopeStore = create<ScopeState & ScopeActions>((set, get) => ({
    appStatus: 'configuring',
    allQuestions: [],
    questionsLoading: false,
    selectedTime: null,
    selectedLevel: null,
    currentIndex: 0,
    startTime: 0,
    timeLimit: 0,
    fullscreenDisabled: false,
    ...initialSessionState,

    loadQuestions: async () => {
        if (get().allQuestions.length > 0 || get().questionsLoading) return

        set({ questionsLoading: true })
        try {
            const response = await fetch('/questions.json')
            if (!response.ok) throw new Error('Failed to load questions.json')
            const questions = await response.json()
            set({ allQuestions: questions, questionsLoading: false })
        } catch (error) {
            console.error('Could not fetch or parse questions:', error)
            set({ questionsLoading: false })
        }
    },

    setPlatforms: (platforms) => set({ platforms }),
    setSelectedTime: (time) => set({ selectedTime: time }),
    setSelectedLevel: (level) => set({ selectedLevel: level }),

    /**
     * Prepares the test by generating the question list based on user selections
     * and putting the app into the 'ready' state.
     */
    prepareTest: () => {
        const { selectedLevel, selectedTime, allQuestions } = get()
        if (!selectedLevel || !selectedTime || !allQuestions.length) return

        const totalTimeInSeconds = selectedTime * 60
        let timeUsed = 0
        const finalTestQuestions: QuestionConfig[] = []
        const availableQuestions = structuredClone(allQuestions)
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
            results: Array(finalTestSteps.length).fill(null),
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
            set({ appStatus: 'finished', completionDate: Date.now() })
        }
    },
    endTest: () => set({ appStatus: 'finished' }),
    returnToHome: () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        }
        set({
            ...initialSessionState,
            appStatus: 'configuring',
            selectedTime: null,
            selectedLevel: null,
        })
    },

    toggleFullscreenDisabled: () =>
        set((state) => ({ fullscreenDisabled: !state.fullscreenDisabled })),

    recordAnswer: (stepIndex, newAnswerData) => {
        set((state) => {
            const newResults = [...state.results]
            const existingAnswer = state.results[stepIndex] || {}
            newResults[stepIndex] = { ...existingAnswer, ...newAnswerData }
            return { results: newResults }
        })
    },

    viewResults: () => set({ appStatus: 'review' }),

    setUserName: (name) => set({ userName: name }),

    downloadJson: () => {
        const { userName, completionDate, platforms, results, testSteps } = get()

        const groupedQuestions = new Map<number, any>()

        testSteps.forEach((step, index) => {
            const questionIndex = step.questionIndex

            // Initialize question object if it's the first time we've seen it
            if (!groupedQuestions.has(questionIndex)) {
                const questionData = step.type === 'prompt' ? step.data : step.parentQuestion
                groupedQuestions.set(questionIndex, {
                    questionIndex: questionIndex,
                    prompt: questionData.prompt,
                    level: questionData.level,
                    canary: questionData.canary,
                    canaryIntent: questionData.canaryIntent,
                    diagramResults: [],
                })
            }

            // If step is a diagram, calculate its results and add it to parent question
            if (step.type === 'diagram') {
                const result = results[index]
                let canaryStatus = 'n/a'

                if (step.parentQuestion.canary) {
                    const plugin = diagramRegistry.get(step.diagramKey)
                    if (plugin?.evaluator.canaryCheck) {
                        canaryStatus = plugin.evaluator.canaryCheck(result, step.parentQuestion)
                    }
                }

                groupedQuestions.get(questionIndex)?.diagramResults.push({
                    diagramKey: step.diagramKey,
                    result,
                    canaryStatus,
                })
            }
        })

        const testData = Array.from(groupedQuestions.values())

        const dataToSave = {
            userName,
            completionDate,
            platforms,
            testData,
        };
        const content = JSON.stringify(dataToSave, null, 2)
        downloadFile('scope-results.json', content, 'application/json')
    },

    resetUserInfo: () => {
        set(initialSessionState)
    },

}))
