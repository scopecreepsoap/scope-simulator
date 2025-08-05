import React, { useState, useRef, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import styles from '../styles/LoadScope.module.css'
import scopeHomeStyles from '../styles/ScopeHome.module.css'
import strings from '../data/strings'
import { useScopeStore } from '../stores/scopeStore'
import MenuIcon from '@mui/icons-material/Menu'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import GradingIcon from '@mui/icons-material/Grading'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { InfoTooltipIcon } from './InfoTooltipIcon'
import ScopeTooltip from "./ScopeTooltip";

type FileType = 'questions' | 'results' | null

export const LoadScope: React.FC = () => {
    const [file, setFile] = useState<File | null>(null)
    const [fileType, setFileType] = useState<FileType>(null)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const {
        loadQuestionsFromFile,
        loadResultsFromFile,
        openMenu,
        beginTest,
        toggleFullscreenDisabled,
        fullscreenDisabled,
        viewResults,
    } = useScopeStore()

    const processFile = useCallback(
        (loadedFile: File) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const content = e.target?.result
                    if (typeof content !== 'string') {
                        toast(strings.notifications.invalidScopeFile)
                        throw new Error('File could not be read.')
                    }
                    const json = JSON.parse(content)

                    // Simple check to differentiate between file types
                    if (Array.isArray(json) && json[0]?.prompt) {
                        setFileType('questions')
                        loadQuestionsFromFile(json)
                    } else if (json.testData) {
                        setFileType('results')
                        loadResultsFromFile(json)
                    } else {
                        toast(strings.notifications.invalidScopeFile)
                        throw new Error('Invalid SCOPE file format.')
                    }
                } catch (error) {
                    console.error('Error parsing JSON file:', error)
                    setFileType(null)
                    setFile(null)
                }
            }
            reader.readAsText(loadedFile)
            setFile(loadedFile)
        },
        [loadQuestionsFromFile, loadResultsFromFile]
    )

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0])
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0])
        }
    }

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true)
        } else if (e.type === 'dragleave') {
            setIsDragging(false)
        }
    }

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    const renderOptions = () => {
        if (fileType === 'questions') {
            return (
                <>
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`}
                            onClick={openMenu}
                        >
                            <MenuIcon sx={{ fontSize: 60, color: '#21D1EB' }} />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>
                            {strings.labels.viewMenu}
                        </div>
                    </div>
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={[
                                scopeHomeStyles.card,
                                scopeHomeStyles.difficultyCard,
                                fullscreenDisabled &&
                                scopeHomeStyles.selectedDifficulty,
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            onClick={toggleFullscreenDisabled}
                        >
                            <FullscreenIcon
                                sx={{ fontSize: 60, color: '#21D1EB' }}
                            />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>
                            {strings.beginScope.disableFullscreen}
                        </div>
                    </div>
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.durationCard}`}
                            onClick={beginTest}
                        >
                            <PlayArrowIcon
                                sx={{ fontSize: 60, color: '#163AC2' }}
                            />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>
                            {strings.beginScope.beginScope}
                        </div>
                    </div>
                </>
            )
        }

        if (fileType === 'results') {
            return (
                <>
                    <div className={`${scopeHomeStyles.option} ${scopeHomeStyles.disabled}`}>
                        <ScopeTooltip title={strings.tooltips.comingSoon}>
                            <div className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`}>
                                <AutoAwesomeIcon
                                    sx={{ fontSize: 60, color: '#21D1EB' }}
                                />
                            </div>
                        </ScopeTooltip>
                        <div className={scopeHomeStyles.cardLabel}>
                            {strings.scopeComplete.aiSummary}
                        </div>
                    </div>
                    <div className={`${scopeHomeStyles.option} ${scopeHomeStyles.disabled}`}>
                        <ScopeTooltip title={strings.tooltips.comingSoon}>
                            <div className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`}>
                                <AnalyticsIcon
                                    sx={{ fontSize: 60, color: '#21D1EB' }}
                                />
                            </div>
                        </ScopeTooltip>
                        <div className={scopeHomeStyles.cardLabel}>
                            {strings.labels.scopeAnalytics}
                        </div>
                    </div>
                    <div className={scopeHomeStyles.option}>
                        <div
                            className={`${scopeHomeStyles.card} ${scopeHomeStyles.durationCard}`}
                            onClick={viewResults}
                        >
                            <GradingIcon
                                sx={{ fontSize: 60, color: '#163AC2' }}
                            />
                        </div>
                        <div className={scopeHomeStyles.cardLabel}>
                            {strings.common.viewResults}
                        </div>
                    </div>
                </>
            )
        }

        // Placeholder buttons
        return Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={scopeHomeStyles.option}>
                <div
                    className={`${styles.card} ${scopeHomeStyles.difficultyCard} ${styles.placeholderCard}`}
                />
            </div>
        ))
    }

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={scopeHomeStyles.sectionLabel}>
                    {strings.labels.openFile}
                </div>
                <div
                    className={`${styles.dropzone} ${
                        isDragging ? styles.dragging : ''
                    }`}
                    onClick={openFileDialog}
                    onDrop={handleDrop}
                    onDragEnter={handleDragEvents}
                    onDragOver={handleDragEvents}
                    onDragLeave={handleDragEvents}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".json"
                        className={styles.fileInput}
                    />
                    <p>{file ? file.name : strings.labels.dragOrClick}</p>
                </div>
            </div>

            <div className={styles.section}>
                <div className={scopeHomeStyles.sectionLabel}>
                    {strings.labels.options}
                    <InfoTooltipIcon tooltipText={strings.tooltips.optionsInfo} />
                </div>
                <motion.div
                    key={fileType || 'placeholders'}
                    className={scopeHomeStyles.optionsRow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {renderOptions()}
                </motion.div>
            </div>
        </div>
    )
}
