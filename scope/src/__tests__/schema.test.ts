import { describe, it, expect } from 'vitest'
import QUESTIONS from '../../public/questions.json'
import type { QuestionConfig } from '../types/QuestionConfig'

describe('Question Schema Integrity', () => {
    const allQuestions: QuestionConfig[] = QUESTIONS

    it('should require a canaryIntent for all canary questions', () => {
        const canaryQuestions = allQuestions.filter(q => q.canary)

        for (const question of canaryQuestions) {
            expect(question).toHaveProperty('canaryIntent')
            expect(typeof question.canaryIntent).toBe('string')
            expect(question.canaryIntent).not.toBe('')
        }
    })

    it('should only allow the context property on level 3 questions', () => {
        const questionsWithContext = allQuestions.filter(q => q.context !== undefined)

        for (const question of questionsWithContext) {
            expect(question.level).toBe(3)
        }
    })
})
