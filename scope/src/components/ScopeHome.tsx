import React, { useState } from 'react'
import styles from '../styles/ScopeHome.module.css'
import scopeIcon from '../assets/logo.png'
import ScopeTooltip from './ScopeTooltip'
import strings from '../data/strings'
import About from './About'
import type { NavView } from '../types/navigation'
import { InfoPage } from './InfoPage'
import { LoadScope } from './LoadScope'
import { ChooseScope } from './ChooseScope'

export const ScopeHome: React.FC = () => {
    const [currentView, setCurrentView] = useState<NavView>('Choose')
    const [isInfoPageVisible, setIsInfoPageVisible] = useState(false)

    const renderContent = () => {
        switch (currentView) {
            case 'Choose':
                return <ChooseScope />
            case 'Load':
                return <LoadScope />
            case 'About':
                return <About />
            default:
                return null
        }
    }

    // Show Info from menu above SCOPE home page
    if (isInfoPageVisible) {
        return <InfoPage onBack={() => setIsInfoPageVisible(false)} />
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                {/* NAVIGATION */}
                <nav className={styles.nav}>

                    {/* CHOOSE SCOPE */}
                    <span
                        className={
                            currentView === 'Choose'
                                ? styles.activeNavItem
                                : styles.navItem
                        }
                        onClick={() => setCurrentView('Choose')}
                    >
                        {strings.labels.chooseScope}
                    </span>

                    {/* LOAD SCOPE */}
                    <span
                        className={
                            currentView === 'Load'
                                ? styles.activeNavItem
                                : styles.navItem
                        }
                        onClick={() => setCurrentView('Load')}
                    >
                        {strings.labels.loadScope}
                    </span>

                    {/* ABOUT */}
                    <span
                        className={
                            currentView === 'About'
                                ? styles.activeNavItem
                                : styles.navItem
                        }
                        onClick={() => setCurrentView('About')}
                    >
                        {strings.labels.about}
                    </span>

                    {/* MY INFO */}
                    <ScopeTooltip title={strings.tooltips.myInfo}>
                        <img
                            src={scopeIcon}
                            className={styles.scopeIcon}
                            alt={`${strings.labels.chooseScope} Logo`}
                            onClick={() => setIsInfoPageVisible(true)}
                            style={{ cursor: 'pointer' }}
                        />
                    </ScopeTooltip>
                </nav>

                {renderContent()}
            </div>
        </div>
    )
}
