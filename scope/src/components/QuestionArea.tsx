import React from 'react'
import styles from '../styles/QuestionArea.module.css'
import type {QuestionConfig} from "../types/QuestionConfig";

interface QuestionAreaProps {
    question: QuestionConfig
    index: number
}

export const QuestionArea: React.FC<QuestionAreaProps> = ({ question, index }) => {
    return (
        <div className={styles.container}>
            <div className={styles.index}>{index + 1}</div>
            <div className={styles.prompt}>{question.prompt}</div>
            {question.instruction && (
                <div className={styles.instruction}>{question.instruction}</div>
            )}
        </div>
    )
}
