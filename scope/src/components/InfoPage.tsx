import React, { useState } from 'react'
import styles from '../styles/InfoPage.module.css'
import menuOverlayStyles from '../styles/MenuOverlay.module.css'
import menuInfoStyles from '../styles/MenuInfo.module.css'
import scopeHomeStyles from '../styles/ScopeHome.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import DownloadIcon from '@mui/icons-material/Download'
import LaunchIcon from '@mui/icons-material/Launch'
import ScopeTooltip from './ScopeTooltip'
import strings from "../data/strings";

interface InfoPageProps {
    onBack: () => void
}

export const InfoPage: React.FC<InfoPageProps> = ({ onBack }) => {
    const [name, setName] = useState('')
    const [platforms, setPlatforms] = useState({
        desktop: false,
        web: false,
        mobile: false,
        ar: false,
    })

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target
        setPlatforms((prev) => ({ ...prev, [name]: checked }))
    }

    const handleClear = () => {
        setName('')
        setPlatforms({ desktop: false, web: false, mobile: false, ar: false })
    }

    const handleSave = () => {
        console.log('Saving data:', { name, platforms })
    }

    return (
        <div className={styles.container}>
            <div className={menuOverlayStyles.row}>
                <div className={menuOverlayStyles.navItem} onClick={onBack}>
                    <ArrowBackIcon className={menuOverlayStyles.icon} />
                    <span className={menuOverlayStyles.label}>{strings.common.back}</span>
                </div>
            </div>

            <div className={styles.infoContent}>
                <h1 className={menuInfoStyles.menuTitle}>{strings.infoPage.title}</h1>

                <div className={styles.section}>
                    <label className={styles.label}>{strings.infoPage.nameLabel}</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.section}>
                    <label className={styles.label}>{strings.infoPage.platformLabel}</label>
                    <div className={styles.checkboxGrid}>
                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" id="desktop" name="desktop" checked={platforms.desktop} onChange={handleCheckboxChange} />
                            <label htmlFor="desktop">{strings.infoPage.desktop}</label>
                        </div>
                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" id="web" name="web" checked={platforms.web} onChange={handleCheckboxChange} />
                            <label htmlFor="web">{strings.infoPage.web}</label>
                        </div>
                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" id="mobile" name="mobile" checked={platforms.mobile} onChange={handleCheckboxChange} />
                            <label htmlFor="mobile">{strings.infoPage.mobile}</label>
                        </div>
                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" id="ar" name="ar" checked={platforms.ar} onChange={handleCheckboxChange} />
                            <label htmlFor="ar">{strings.infoPage.ar}</label>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.resultsRow}>
                        <label className={styles.label}>{strings.infoPage.questionsAnswered}</label>
                        <a href="#">{strings.common.viewResults} <LaunchIcon sx={{ fontSize: 24, verticalAlign: 'text-bottom', marginLeft: '4px' }}/></a>
                    </div>
                </div>

                <div className={menuInfoStyles.divider} />

                <div className={styles.buttonRow}>
                    <ScopeTooltip title={strings.infoPage.resetDataTooltip}>
                        <div className={scopeHomeStyles.option}>
                            <div className={`${scopeHomeStyles.card} ${scopeHomeStyles.difficultyCard}`} onClick={handleClear}>
                                <DeleteIcon sx={{ fontSize: 60, color: '#21D1EB' }} />
                            </div>
                        </div>
                    </ScopeTooltip>
                    <ScopeTooltip title={strings.infoPage.downloadResultsTooltip}>
                        <div className={scopeHomeStyles.option}>
                            <div className={`${scopeHomeStyles.card} ${scopeHomeStyles.durationCard}`} onClick={handleSave}>
                                <DownloadIcon sx={{ fontSize: 60, color: '#163AC2' }} />
                            </div>
                        </div>
                    </ScopeTooltip>
                </div>
            </div>
        </div>
    )
}
