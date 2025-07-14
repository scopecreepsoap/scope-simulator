import Tooltip, { type TooltipProps } from '@mui/material/Tooltip'

export default function ScopeTooltip(props: TooltipProps) {
    return (
        <Tooltip
            arrow
            placement="top"
            slotProps={{
                tooltip: {
                    sx: {
                        background: 'linear-gradient(135deg, var(--secondary-blue) 0%, var(--primary-blue) 100%)',
                        color: '#79cfff',
                        fontWeight: 500,
                        fontSize: '16px',
                        letterSpacing: '0.03em',
                        padding: '14px 20px',
                        borderRadius: '10px',
                        textAlign: 'left',
                        maxWidth: 700,
                        boxShadow: '1px 1px 0 midnightblue, 10px 10px 50px rgba(0, 0, 155, 0.7)',
                        border: '0',
                    },
                },
                arrow: {
                    sx: {
                        color: 'transparent',
                    },
                },
            }}
            {...props}
        />
    )
}
