import { MenuSettingsSelectorDiagram } from './MenuSettingsSelectorDiagram'
import type { DiagramPlugin } from '../../../types/plugin'

const SEGMENT_NAMES: Record<string, string> = {
    top1: 'Top Bar, 1st Segment',
    top2: 'Top Bar, 2nd Segment',
    top3: 'Top Bar, 3rd Segment',
    top4: 'Top Bar, 4th Segment',
    top6: 'Top Bar, Rightmost Segment',
    bottomLeft: 'Bottom Bar, Left Segment',
    bottomRight: 'Bottom Bar, Right Segment',
}

const menuSettingsSelectorPlugin: DiagramPlugin = {
    component: MenuSettingsSelectorDiagram,
    evaluator: {
        printAnswer: (answer) => {
            const selection = answer?.selection
            if (!selection || typeof selection !== 'object' || Object.keys(selection).length === 0) {
                return 'N/A'
            }

            const [key, value] = Object.entries(selection)[0]
            const segmentName = SEGMENT_NAMES[key] || 'Unknown Segment'
            const half = value === 'top' ? 'Upper' : 'Lower'

            return `${half} half of ${segmentName}`
        },
    },
}

export default menuSettingsSelectorPlugin