import type {QuestionConfig} from '../types/QuestionConfig'

export const QUESTIONS: QuestionConfig[] = [
    {
        prompt: 'When does this layout become most readable?',
        instruction: 'Drag slider up or down',
        diagram: ['text-density'],
        level: 2
    },
    {
        prompt: 'Where would you click to close this dialog?',
        diagram: ['quadrant-selector'],
        level: 1
    },
    {
        prompt: 'What button on a dialog do you associate with Save?',
        instruction: 'This question uses multiple diagrams',
        diagram: ['save-action-selector','save-action-selector-l2'],
        level: 1
    },
    {
        prompt: 'Which part of this dialog would you click to go back?',
        diagram: ['quadrant-selector'],
        level: 1
    },
    {
        prompt: 'Where would you expect to access Settings in this interface?',
        diagram: ['menu-settings-selector'],
        level: 2
    },
    {
        prompt: 'Nulla laoreet urna nec ipsum eleifend feugiat?',
        diagram: ['no-diagram-found'],
        level: 1
    },
    // Following questions are included only to enable 2m of SCOPE time
    {
        prompt: 'Duis aute irure dolor in reprehenderit?',
        diagram: ['no-diagram-found'],
        level: 2
    },
    {
        prompt: 'Excepteur sint occaecat cupidatat non proident?',
        diagram: ['no-diagram-found'],
        level: 2
    },
]
