import type { DiagramPlugin } from '../types/plugin'

// Find all `index.ts` files in subdirectories
const modules = import.meta.glob<DiagramPlugin>('./diagrams/*/index.ts', {
    eager: true,        // Eagerly loads the modules
    import: 'default', // Imports the default export from each file
})

const diagramRegistry = new Map<string, DiagramPlugin>()

for (const path in modules) {
    // Extract diagram name from file path
    // e.g., './diagrams/text-density/index.ts' becomes 'text-density'
    const diagramKey = path.match(/.\/diagrams\/(.*)\/index.ts$/)?.[1]

    if (diagramKey) {
        diagramRegistry.set(diagramKey, modules[path])
    }
}

export default diagramRegistry
