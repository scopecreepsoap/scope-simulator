import { TextDensityDiagram } from './TextDensityDiagram'
import type { DiagramPlugin } from '../../../types/plugin'

const textDensityPlugin: DiagramPlugin = {
    component: TextDensityDiagram,
    evaluator: {
        printAnswer: (answer) => {
            if (typeof answer?.spacing !== 'number') return 'No answer provided'
            return `spacing: ${answer.spacing}px`
        },
    },
}

export default textDensityPlugin
