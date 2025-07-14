import type { FC } from 'react'

export type Answer = { [key: string]: any } | null
export type CanaryStatus = 'pass' | 'fail' | 'unsure' | 'n/a'

export interface DiagramEvaluator {
    printAnswer: (answer: Answer) => string
    canaryCheck?: (answer: Answer, questionPrompt: string) => CanaryStatus
}

export interface DiagramProps {
    mode: 'interactive' | 'display'
    initialValue: Answer
    onAnswerChange: (answer: Answer) => void
}

export interface DiagramPlugin {
    component: FC<DiagramProps>
    evaluator: DiagramEvaluator
}
