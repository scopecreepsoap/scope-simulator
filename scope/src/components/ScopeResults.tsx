import React, { useMemo } from 'react'
import {type TestStep, useScopeStore} from '../stores/scopeStore'
import diagramRegistry from '../plugins/registry'
import { NoDiagramFound } from './diagrams/NoDiagramFound'
import styles from '../styles/ScopeResults.module.css'
import { CanaryIcon } from './CanaryIcon'
import type { Answer } from '../types/plugin'
import HomeIcon from '@mui/icons-material/Home'
import DownloadIcon from '@mui/icons-material/Download'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ScopeTooltip from './ScopeTooltip'
import scopeHomeStyles from '../styles/ScopeHome.module.css'
import strings from '../data/strings'

interface ProcessedQuestion {
    questionIndex: number
    prompt: string
    diagrams: Array<{
        step: TestStep & { type: 'diagram' }
        answer: Answer
    }>
}

export const ScopeResults: React.FC = () => {
    const { testSteps, results, returnToHome, recordAnswer } = useScopeStore()

    const processedQuestions = useMemo(() => {
        const grouped = new Map<number, ProcessedQuestion>()

        testSteps.forEach((step, index) => {
            if (step.type === 'prompt') {
                if (!grouped.has(step.questionIndex)) {
                    grouped.set(step.questionIndex, {
                        questionIndex: step.questionIndex,
                        prompt: step.data.prompt,
                        diagrams: [],
                    })
                }
            } else if (step.type === 'diagram') {
                const question = grouped.get(step.questionIndex)
                if (question) {
                    question.diagrams.push({
                        step: step,
                        answer: results[index],
                    })
                }
            }
        })

        return Array.from(grouped.values())
    }, [testSteps, results]);

    const handleNotesChange = (step: TestStep, newNotes: string) => {
        const stepIndex = testSteps.findIndex(s => s === step)
        if (stepIndex !== -1) {
            recordAnswer(stepIndex, { notes: newNotes })
        }
    };

    // TODO: Implement download
    const handleDownload = () => { console.log("Downloaded Results!"); }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {/* TODO: Add name here or 'SCOPE Results' if no name filled in */}
                <span>SCOPE Results</span>
                <span>{new Date().toLocaleDateString()}</span>
            </div>

            {processedQuestions.map((question) => (
                <div key={question.questionIndex} className={styles.questionBlock}>
                    {question.diagrams.map((diagramData, diagramIndex) => {
                        const plugin = diagramRegistry.get(diagramData.step.diagramKey)
                        const DiagramComponent = plugin ? plugin.component : NoDiagramFound

                        const printedAnswer = plugin
                            ? plugin.evaluator.printAnswer(diagramData.answer)
                            : 'N/A'

                        const canaryStatus = plugin?.evaluator.canaryCheck
                            ? plugin.evaluator.canaryCheck(diagramData.answer, diagramData.step.parentQuestion)
                            : 'n/a'

                        return (
                            <div key={diagramIndex} className={styles.resultsGrid} style={{ marginTop: diagramIndex > 0 ? '2rem' : 0 }}>
                                <span className={styles.promptIndex}>{question.questionIndex + 1}</span>
                                <h2 className={styles.promptText}>{question.prompt}</h2>

                                <div className={styles.diagramCell}>
                                    <div className={styles.diagramWrapper}>
                                        <DiagramComponent
                                            initialValue={diagramData.answer}
                                            onAnswerChange={() => {}}
                                            mode="display"
                                        />
                                    </div>
                                </div>

                                <div className={styles.answerRow}>
                                    <span>{printedAnswer}</span>
                                    <CanaryIcon status={canaryStatus} />
                                </div>

                                <div className={styles.notesCell}>
                                    <textarea
                                        className={styles.notesTextarea}
                                        placeholder="Additional notes..."
                                        value={diagramData.answer?.notes || ''}
                                        onChange={(e) => handleNotesChange(diagramData.step, e.target.value)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            ))}
            <footer className={styles.footer}>

                    {/* AI SUMMARY (Disabled) */}
                    <div className={`${scopeHomeStyles.option} ${scopeHomeStyles.disabled}`}>
                        <ScopeTooltip title={strings.tooltips.comingSoon}>
                            <div className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`}>
                                <AutoAwesomeIcon sx={{ fontSize: 60, color: '#21D1EB' }} />
                            </div>
                        </ScopeTooltip>
                        <div className={scopeHomeStyles.cardLabel}>{strings.scopeComplete.aiSummary}</div>
                    </div>

                    {/* RETURN HOME */}
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`}
                            onClick={returnToHome}
                        >
                            <HomeIcon sx={{ fontSize: 60, color: '#21D1EB' }} />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>{strings.common.returnHome}</div>
                    </div>

                    {/* DOWNLOAD RESULTS */}
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.durationCard}`}
                            onClick={handleDownload}
                        >
                            <DownloadIcon sx={{ fontSize: 60, color: '#163AC2' }} />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>{strings.scopeComplete.downloadResults}</div>
                    </div>

            </footer>
        </div>
    )
}
