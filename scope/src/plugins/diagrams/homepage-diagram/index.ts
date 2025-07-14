import { HomepageDiagram } from './HomepageDiagram'
import type { DiagramPlugin } from '../../../types/plugin'

const homepageDiagramPlugin: DiagramPlugin = {
  component: HomepageDiagram,
  
  evaluator: {
    printAnswer: (answer) => {
      if (!answer?.pos) return 'N/A'
      
      const { x, y } = answer.pos
      
      // Determine which section was clicked based on coordinates
      if (y < 75) {
        return 'Header/Navigation area'
      } else if (y >= 75 && y < 335) {
        if (x < 450) {
          return 'Hero content area'
        } else {
          return 'Hero image area'
        }
      } else if (y >= 335 && y < 480) {
        return 'Features section'
      } else {
        return 'Footer area'
      }
    },
    
    canaryCheck: (answer, parentQuestion) => {
      return 'n/a'
    },
  },
}

export default homepageDiagramPlugin