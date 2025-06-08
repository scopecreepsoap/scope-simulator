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
        prompt: 'What button on a dialog do you associate with saving or accepting a modification?',
        diagram: 'save-action-selector'
    },
    {
        prompt: 'Which part of this dialog would you click to go back?',
        diagram: 'quadrant-selector'
    }
]
