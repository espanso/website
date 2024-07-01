import React, { useEffect } from 'react';
import styles from './Contributing.module.css';
import Link from '@docusaurus/Link';
import { BeakerIcon } from '@heroicons/react/outline';

export default function Contributing() {
	useEffect(() => {
		const script = document.createElement('script');

		script.src = 'https://buttons.github.io/buttons.js';
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<BeakerIcon className={styles.icon} />
				<h2>Contributing</h2>
			</div>
			<p>
				Espanso is open source and{' '}
				<Link to="https://github.com/federico-terzi/espanso">
					hosted on GitHub.
				</Link>
			</p>

			<div className={styles.github}>
				<a
					className="github-button"
					href="https://github.com/federico-terzi/espanso"
					data-size="large"
					data-show-count="true"
					aria-label="Star federico-terzi/espanso on GitHub"
				>
					Star
				</a>
			</div>
			<p className={styles.subtitle}>
				If you find a bug or have an idea for a new feature, please{' '}
				<Link to="https://github.com/federico-terzi/espanso/issues">
					open an issue on GitHub.
				</Link>
			</p>

			<p className={styles.footer}>
				Created by <Link to="https://federicoterzi.com">Federico Terzi</Link>.
				Copyright © Federico Terzi 2019-2021
			</p>
		</div>
	);
}
