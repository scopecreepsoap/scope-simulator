import type {QuestionConfig} from '../components/QuestionArea'

export const QUESTIONS: QuestionConfig[] = [
    {
        prompt: 'When does this layout become most readable?',
        instruction: 'Drag slider up or down',
        diagram: 'text-density'
    },
    {
        prompt: 'Where would you close this interface or return to a previous view?',
        diagram: 'quadrant-selector'
    },
    {
        prompt: 'TEMP: Which part of this screen would you click to go back?'
    }
]
