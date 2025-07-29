import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useScopeStore } from '../stores/scopeStore'
import { downloadFile } from '../utils/download'
import type { TestStep } from '../stores/scopeStore'
import type { Answer } from '../types/plugin'
import type { QuestionConfig } from '../types/QuestionConfig'

vi.mock('../utils/download', () => ({
    downloadFile: vi.fn(),
}))

describe('downloadJson store action', () => {

    beforeEach(() => {
        useScopeStore.setState({
            userName: 'Test User',
            completionDate: 1722222000000,
            platforms: { desktop: true, web: true, mobile: false, ar: false },
            testSteps: [],
            results: [],
        })
    })

    it('should generate a JSON file with the correctly grouped data structure', () => {

        const mockQuestion1: QuestionConfig = { prompt: 'Question 1', level: 1, diagram: ['text-density'] };
        const mockQuestion2: QuestionConfig = { prompt: 'Question 2', level: 2, diagram: ['save-action-selector', 'save-action-selector-l2'] };

        const mockTestSteps: TestStep[] = [
            { type: 'prompt', data: mockQuestion1, questionIndex: 0 },
            { type: 'diagram', diagramKey: 'text-density', parentQuestion: mockQuestion1, questionIndex: 0 },
            { type: 'prompt', data: mockQuestion2, questionIndex: 1 },
            { type: 'diagram', diagramKey: 'save-action-selector', parentQuestion: mockQuestion2, questionIndex: 1 },
            { type: 'diagram', diagramKey: 'save-action-selector-l2', parentQuestion: mockQuestion2, questionIndex: 1 },
        ]
        const mockResults: Answer[] = [null, { spacing: 20 }, null, { selection: 'left' }, { selection: 'right' }]

        useScopeStore.setState({ testSteps: mockTestSteps, results: mockResults });

        useScopeStore.getState().downloadJson();

        expect(downloadFile).toHaveBeenCalledOnce();
        const [filename, content] = (downloadFile as Mock).mock.calls[0];
        expect(filename).toBe('scope-results.json');
        const data = JSON.parse(content);

        expect(data.userName).toBe('Test User');
        expect(data.platforms.desktop).toBe(true);
        expect(data.testData).toHaveLength(2);

        const question2 = data.testData[1];
        expect(question2.prompt).toBe('Question 2');
        expect(question2.diagramResults).toHaveLength(2);
        expect(question2.diagramResults[0].diagramKey).toBe('save-action-selector');
        expect(question2.diagramResults[0].result.selection).toBe('left');
    });
});
