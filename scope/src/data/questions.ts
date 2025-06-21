import type {QuestionConfig} from '../types/QuestionConfig'

export const QUESTIONS: QuestionConfig[] = [
    {
        prompt: 'When does this layout become most readable?',
        instruction: 'Drag slider up or down',
        diagram: ['text-density']
    },
    {
        prompt: 'Where would you close this dialog or return to a previous view?',
        diagram: ['quadrant-selector']
    },
    {
        prompt: 'What button on a dialog do you associate with Save?',
        diagram: ['save-action-selector','save-action-selector-l2']
    },
    {
        prompt: 'Which part of this dialog would you click to go back?',
        diagram: ['quadrant-selector']
    },
    {
        prompt: 'Where would you expect to access Settings in this interface?',
        diagram: ['menu-settings-selector']
    }
]
