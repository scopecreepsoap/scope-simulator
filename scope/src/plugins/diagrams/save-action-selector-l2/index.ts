import { SaveActionSelectorL2Diagram } from './SaveActionSelectorL2Diagram'
import type { DiagramPlugin } from '../../../types/plugin'

const saveActionSelectorL2Plugin: DiagramPlugin = {
    component: SaveActionSelectorL2Diagram,
    evaluator: {
        printAnswer: (answer) => {
            const selection = answer?.selection as 'left' | 'right' | undefined
            if (!selection) return 'N/A'

            return selection === 'left' ? 'Left Button' : 'Right Button'
        },
    },
}

export default saveActionSelectorL2Plugin
