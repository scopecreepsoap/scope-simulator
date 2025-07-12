import type { QuestionConfig } from '../types/QuestionConfig'

export class ScopeManager {
    questions: QuestionConfig[]
    currentIndex: number = 0
    timeLimit: number // seconds
    startTime: number
    level: number

    constructor(allQuestions: QuestionConfig[], level: number, timeLimit: number, selectedQuestions?: QuestionConfig[]) {
        this.level = level
        this.timeLimit = timeLimit
        this.questions = selectedQuestions ?? allQuestions.filter(q => q.level === level)
        this.startTime = Date.now()
    }

    getCurrentQuestion(): QuestionConfig {
        return this.questions[this.currentIndex]
    }

    next(): boolean {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++
            return true
        }
        return false
    }

    isFinished(): boolean {
        return this.currentIndex >= this.questions.length - 1
    }

    getElapsedTime(): number {
        return (Date.now() - this.startTime) / 1000
    }

    getRemainingTime(): number {
        return Math.max(this.timeLimit - this.getElapsedTime(), 0)
    }
}
