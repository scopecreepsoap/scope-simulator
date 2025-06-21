import { test, expect } from 'vitest'
import { QUESTIONS } from '../data/questions'

test('Question+diagram count must not exceed 64', () => {
    const totalSteps = QUESTIONS.reduce<number>(
        (acc, q) => acc + 1 + q.diagram.length,
        0
    )
    expect(totalSteps).toBeLessThanOrEqual(64)
})
