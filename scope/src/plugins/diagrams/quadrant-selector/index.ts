import { QuadrantSelectorDiagram } from './QuadrantSelectorDiagram'
import type { DiagramPlugin, CanaryStatus } from '../../../types/plugin'

const quadrantSelectorPlugin: DiagramPlugin = {
    component: QuadrantSelectorDiagram,
    evaluator: {
        printAnswer: (answer) => {
            if (!answer?.quadrant) return 'N/A'
            return (answer.quadrant as string).replace('-', ' ')
        },
        canaryCheck: (answer, parentQuestion): CanaryStatus => {
            const quadrant = answer?.quadrant as string | undefined
            if (!quadrant) return 'fail'

            // Use required canary intent
            switch (parentQuestion.canaryIntent) {
                case 'close':
                    if (quadrant === 'top-right') return 'pass'
                    if (quadrant === 'top-left') return 'unsure'
                    return 'fail'
                case 'back':
                    if (quadrant === 'top-left') return 'pass'
                    return 'fail'
                default:
                    return 'n/a'
            }
        },
    },
}

export default quadrantSelectorPlugin
