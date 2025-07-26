export interface QuestionConfig {
    level: number
    prompt: string
    diagram: string[]
    instruction?: string
    canary?: boolean
    canaryIntent?: string
    /**
     * For Level 3 questions only. Provides an array of custom data to a diagram,
     * enabling unique, context-specific test scenarios that require more than
     * the standard diagram logic.
     */
    context?: any[]
}
