import { ThreeDBuilding } from './ThreeDBuilding'
import type { DiagramPlugin } from '../../../types/plugin'

const threeDBuilding: DiagramPlugin = {
  component: ThreeDBuilding,

  evaluator: {
    printAnswer: (answer) => {
      if (!answer?.position) return 'N/A'
      const pos = answer.position as { x: number; y: number }
      
      // Analyze click position relative to the simplified building polygons
      // Building has front wall, side wall, and roof visible
      
      // Check if click is within the building bounds (400x250 centered)
      const buildingLeft = 50 - (400/700 * 50)  // ~21.4%
      const buildingRight = 50 + (400/700 * 50) // ~78.6%
      const buildingTop = 50 - (250/500 * 50)   // ~25%
      const buildingBottom = 50 + (250/500 * 50) // ~75%
      
      if (pos.x < buildingLeft || pos.x > buildingRight || 
          pos.y < buildingTop || pos.y > buildingBottom) {
        return 'Outside building area'
      }
      
      // Convert to building-relative coordinates
      const relX = (pos.x - buildingLeft) / (buildingRight - buildingLeft) * 100
      const relY = (pos.y - buildingTop) / (buildingBottom - buildingTop) * 100
      
      // Determine which polygon was clicked based on the clip-paths
      if (relY < 40) {
        // Upper area - could be roof
        if (relX < 50) {
          return 'Roof (left side)'
        } else {
          return 'Roof (right side)'
        }
      } else if (relX > 50 && relY < 60) {
        // Middle-right area where side wall is visible
        return 'Side wall'
      } else if (relX < 50) {
        // Left side - front wall
        return 'Front wall'
      } else {
        // Lower right - could be either wall
        return 'Building corner area'
      }
    },

    canaryCheck: (answer, parentQuestion) => {
      // This diagram doesn't implement canary checks
      return 'n/a'
    },
  },
}

export default threeDBuilding