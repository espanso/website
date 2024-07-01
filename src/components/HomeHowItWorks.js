import React from 'react';
import styles from './HomeHowItWorks.module.css';
import TypeIt from 'typeit-react';
import Fade from 'react-reveal/Fade';
import { LightBulbIcon } from '@heroicons/react/outline';

export default function HomeHowItWorks() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <LightBulbIcon className={styles.icon} />
        <h2>How it works</h2>
      </div>
      <p>
        Espanso detects when you type a{' '}
        <span className={styles.highlight}>keyword</span>
      </p>

      <div className={styles.input}>
        <TypeIt
          options={{ loop: true, waitUntilVisible: true, startDelay: 900 }}
          getBeforeInit={(instance) => {
            instance
              .options({
                speed: 50,
              })
              .type('Today is <b>:date</b>')
              .pause(400)
              .options({ speed: 1, deleteSpeed: 7 })
              .delete(5)
              .options({ speed: 1, deleteSpeed: 7 })
              .type(`<b>${new Date().toLocaleDateString()}</b>`)
              .pause(1500);

            // Remember to return it!
            return instance;
          }}
        />
      </div>

      <p>
        and <span className={styles.highlight}>replaces</span> it while you're
        typing.
      </p>
    </div>
  );
}
