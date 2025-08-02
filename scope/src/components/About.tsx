import React from 'react';
import styles from '../styles/About.module.css';
import strings from '../data/strings'

const About: React.FC = () => {
    return (
        <div className={styles.aboutContainer}>
            <h2 className={styles.title}>{strings.aboutDetails.title}</h2>
            <p className={styles.paragraph}>{strings.aboutDetails.p1}</p>
            <p className={styles.paragraph}>{strings.aboutDetails.p2}</p>
            <p className={styles.paragraph}>
                Contributions are highly encouraged. Please review{' '}
                <a
                    href="https://github.com/scopecreepsoap/scope-simulator/blob/main/Docs/CONTRIBUTING.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    CONTRIBUTING.md
                </a>
                .
            </p>
            <p className={styles.paragraph}>
                SCOPE is distributed under the{' '}
                <a
                    href="https://mit-license.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    MIT License
                </a>
                .
            </p>
        </div>
    );
};

export default About;
