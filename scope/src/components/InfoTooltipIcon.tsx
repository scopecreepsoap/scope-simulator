import React from 'react'
import Typography from '@mui/material/Typography'
import InfoIcon from '@mui/icons-material/Info'
import strings from '../data/strings'
import ScopeTooltip from './ScopeTooltip'

interface InfoTooltipIconProps {
    tooltipText?: string
}

export function InfoTooltipIcon({ tooltipText }: InfoTooltipIconProps) {
    const title =
        tooltipText ||
        (
            <React.Fragment>
                {strings.tooltips.difficultyInfo
                    .trim()
                    .split('\n')
                    .map((line, i, arr) => (
                        <Typography
                            key={i}
                            sx={{
                                letterSpacing: '0.5px',
                                fontSize: '1rem',
                                mb: i + 1 < arr.length ? 1.5 : 0,
                            }}
                        >
                            {line.trim()}
                        </Typography>
                    ))}
            </React.Fragment>
        )

    return (
        <ScopeTooltip title={title} placement="right" arrow={false}>
            <InfoIcon
                sx={{
                    verticalAlign: 'middle',
                    color: 'rgba(255,183,0,0.75)',
                }}
            />
        </ScopeTooltip>
    )
}
