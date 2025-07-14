import { SaveActionSelectorDiagram } from './SaveActionSelectorDiagram'
import type { DiagramPlugin } from '../../../types/plugin'

const saveActionSelectorPlugin: DiagramPlugin = {
    component: SaveActionSelectorDiagram,
    evaluator: {
        printAnswer: (answer) => {
            const selection = answer?.selection as 'left' | 'right' | undefined
            if (!selection) return 'N/A'

            return selection === 'left' ? 'Left Button' : 'Right Button'
        },
    },
}

export default saveActionSelectorPlugin
