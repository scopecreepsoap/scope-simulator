import { PlateQuadrantSelectorDiagram } from './PlateQuadrantSelectorDiagram'
import type { DiagramPlugin, CanaryStatus } from '../../../types/plugin'

const plateQuadrantSelectorPlugin: DiagramPlugin = {
  component: PlateQuadrantSelectorDiagram,

  evaluator: {
    printAnswer: (answer) => {
      if (!answer?.quadrant) return 'N/A'
      return (answer.quadrant as string).replace('-', ' ')
    },

    canaryCheck: (answer, parentQuestion): CanaryStatus => {
      // This diagram doesn't implement canary checks for property questions
      return 'n/a'
    },
  },
}

export default plateQuadrantSelectorPlugin