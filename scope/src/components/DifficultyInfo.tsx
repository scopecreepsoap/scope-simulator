import React from 'react';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import strings from '../data/strings';
import ScopeTooltip from './ScopeTooltip'

export function DifficultyInfo() {
    const lines = strings.tooltips.difficultyInfo.trim().split('\n');

    const tooltipTitle = (
        <React.Fragment>
            {lines.map((line, i) => (
                <Typography
                    key={i}
                    sx={{
                        letterSpacing: '0.5px',
                        fontSize: '1rem',
                        mb: i + 1 < lines.length ? 1.5 : 0,
                    }}
                >
                    {line.trim()}
                </Typography>
            ))}
        </React.Fragment>
    );

    return (
        <ScopeTooltip
            title={tooltipTitle}
            placement="right"
            arrow={false}
        >
            <InfoIcon sx={{ verticalAlign: 'middle', color: '#21D1EB' }} />
        </ScopeTooltip>
    );
}