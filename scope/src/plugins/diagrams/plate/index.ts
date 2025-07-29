import { PlateDiagram } from './PlateDiagram'
import type { DiagramPlugin } from '../../../types/plugin'

const platePlugin: DiagramPlugin = {
  component: PlateDiagram,

  evaluator: {
    printAnswer: (answer) => {
      if (!answer?.position) return 'N/A'
      const pos = answer.position as { x: number; y: number }
      
      // Determine which edge the user clicked near
      const threshold = 20 // percentage from edge
      
      if (pos.x < threshold) return 'Left edge'
      if (pos.x > 100 - threshold) return 'Right edge'
      if (pos.y < threshold) return 'Top edge'
      if (pos.y > 100 - threshold) return 'Bottom edge'
      
      // Check corners
      if (pos.x < threshold && pos.y < threshold) return 'Top-left corner'
      if (pos.x > 100 - threshold && pos.y < threshold) return 'Top-right corner'
      if (pos.x < threshold && pos.y > 100 - threshold) return 'Bottom-left corner'
      if (pos.x > 100 - threshold && pos.y > 100 - threshold) return 'Bottom-right corner'
      
      return 'Center area'
    },

    canaryCheck: (answer, parentQuestion) => {
      // This diagram doesn't implement canary checks
      return 'n/a'
    },
  },
}

export default platePlugin