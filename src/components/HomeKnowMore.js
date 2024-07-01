import React from 'react';
import styles from './HomeKnowMore.module.css';
import Fade from 'react-reveal/Fade';
import Link from '@docusaurus/Link';

export default function HomeKnowMore() {
	return (
		<div className={styles.container}>
			<Fade bottom>
				<h4>Do you want to know more?</h4>
				<Link to="/docs/get-started">
					<div className={styles.button}>
						<span>Visit Documentation</span>
					</div>
				</Link>
			</Fade>
		</div>
	);
}
