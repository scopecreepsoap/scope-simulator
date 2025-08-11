import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './HomepageDiagram.module.css'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import type { DiagramProps } from '../../../types/plugin'

export const HomepageDiagram: React.FC<DiagramProps> = ({ initialValue, onAnswerChange, mode, context: _context }) => {
  const [clickPos, setClickPos] = useState<{x: number, y: number} | null>(null)
  const [hoverPos, setHoverPos] = useState<{x: number, y: number} | null>(null)
  const isInteractive = mode === 'interactive'

  useEffect(() => {
    if (initialValue?.pos) {
      setClickPos(initialValue.pos)
    }
  }, [initialValue])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (clickPos && Math.abs(clickPos.x - x) < 20 && Math.abs(clickPos.y - y) < 20) {
      setClickPos(null)
      onAnswerChange(null)
    } else {
      const newPos = { x, y }
      setClickPos(newPos)
      onAnswerChange({ pos: newPos })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setHoverPos({ x, y })
  }

  const handleMouseLeave = () => {
    setHoverPos(null)
  }

  return (
    <div className={styles.wrapper}>
      <div 
        className={styles.homepage}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isInteractive ? 'pointer' : 'default' }}
        data-testid="homepage-diagram"
      >
        {/* Header section */}
        <div className={styles.header}>
          <div className={styles.logo}></div>
          <div className={styles.nav}>
            <div className={styles.navItem}></div>
            <div className={styles.navItem}></div>
            <div className={styles.navItem}></div>
            <div className={styles.navItem}></div>
          </div>
        </div>

        {/* Hero section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroTitle}></div>
            <div className={styles.heroSubtitle}></div>
            <div className={styles.heroButtons}>
              <div className={styles.primaryButton}></div>
              <div className={styles.secondaryButton}></div>
            </div>
          </div>
          <div className={styles.heroImage}></div>
        </div>

        {/* Features section */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}></div>
            <div className={styles.featureTitle}></div>
            <div className={styles.featureText}></div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}></div>
            <div className={styles.featureTitle}></div>
            <div className={styles.featureText}></div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}></div>
            <div className={styles.featureTitle}></div>
            <div className={styles.featureText}></div>
          </div>
        </div>

        {/* Hover overlay */}
        {isInteractive && hoverPos && (
          <div 
            className={styles.hoverOverlay}
            style={{
              '--x': `${hoverPos.x}px`,
              '--y': `${hoverPos.y}px`,
            } as React.CSSProperties}
          />
        )}

        {/* Click indicator */}
        {clickPos && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={styles.icon}
            style={{
              left: clickPos.x,
              top: clickPos.y,
              marginLeft: -32,
              marginTop: -16,
            }}
          >
            <TouchAppIcon sx={{ fontSize: 64 }} />
          </motion.div>
        )}
      </div>
    </div>
  )
}