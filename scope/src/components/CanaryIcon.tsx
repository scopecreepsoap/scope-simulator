import React from 'react'
import passIcon from '../assets/canary-pass.png'
import failIcon from '../assets/canary-fail.png'
import unsureIcon from '../assets/canary-q.png'
import type {CanaryStatus} from "../types/plugin";

interface CanaryIconProps {
    status: CanaryStatus
}

export const CanaryIcon: React.FC<CanaryIconProps> = ({ status }) => {
    if (status === 'n/a') {
        return null
    }

    const icons: Record<Exclude<CanaryStatus, 'n/a'>, string> = {
        pass: passIcon,
        fail: failIcon,
        unsure: unsureIcon,
    }

    const altText: Record<Exclude<CanaryStatus, 'n/a'>, string> = {
        pass: 'Canary Passed',
        fail: 'Canary Failed',
        unsure: 'Canary Unsure',
    }

    return (
        <img
            src={icons[status]}
            alt={altText[status]}
            style={{ width: '24px', height: '24px', marginLeft: '8px' }}
        />
    )
}
