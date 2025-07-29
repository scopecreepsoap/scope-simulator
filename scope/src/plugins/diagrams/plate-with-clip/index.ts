import { PlateWithClipDiagram } from './PlateWithClipDiagram'
import type { DiagramPlugin } from '../../../types/plugin'

const plateWithClipPlugin: DiagramPlugin = {
  component: PlateWithClipDiagram,

  evaluator: {
    printAnswer: (answer) => {
      if (!answer?.position) return 'N/A'
      const pos = answer.position as { x: number; y: number }
      
      // Check if clicked on the clip (approximately 2/3 position horizontally, center vertically)
      const clipCenterX = 66.67
      const clipCenterY = 50
      const clipWidth = 15 // 60px out of 400px = 15%
      const clipHeight = 32 // 80px out of 250px = 32%
      
      if (
        pos.x >= clipCenterX - clipWidth/2 && 
        pos.x <= clipCenterX + clipWidth/2 &&
        pos.y >= clipCenterY - clipHeight/2 && 
        pos.y <= clipCenterY + clipHeight/2
      ) {
        return 'On the clip'
      }
      
      // Check if clicked on dimension line area
      if (pos.y >= 60 && pos.y <= 70 && pos.x < 66.67) {
        return 'On the dimension line'
      }
      
      // Otherwise describe position relative to clip
      if (pos.x < 33.33) return 'Left third of plate'
      if (pos.x < 66.67) return 'Middle third of plate'
      return 'Right third of plate'
    },

    canaryCheck: (answer, parentQuestion) => {
      // This diagram doesn't implement canary checks
      return 'n/a'
    },
  },
}

export default plateWithClipPlugin