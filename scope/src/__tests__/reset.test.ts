import { describe, it, expect, beforeEach } from 'vitest'
import { useScopeStore } from '../stores/scopeStore'

describe('Store Actions: Data Reset', () => {

    beforeEach(() => {
        // "Dirty" state simulates completed test session with user info
        useScopeStore.setState({
            userName: 'Test User',
            platforms: { desktop: true, web: true, mobile: false, ar: false },
            completionDate: Date.now(),
            testSteps: [{
                type: 'prompt',
                data: {
                    prompt: 'A test question',
                    level: 1,
                    diagram: []
                },
                questionIndex: 0
            }],
            results: [null],
        })
    })

    it('resetUserInfo should clear all user-specific and test-related data', () => {
        expect(useScopeStore.getState().userName).toBe('Test User')
        expect(useScopeStore.getState().testSteps.length).toBeGreaterThan(0)

        useScopeStore.getState().resetUserInfo()

        const state = useScopeStore.getState()

        expect(state.userName).toBe('')
        expect(state.platforms).toEqual({ desktop: false, web: false, mobile: false, ar: false })
        expect(state.completionDate).toBeNull()
        expect(state.testSteps).toEqual([])
        expect(state.results).toEqual([])
    })
})
