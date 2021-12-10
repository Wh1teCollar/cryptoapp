import moment from 'moment';
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer_container}>
			COINCAP.IO ©  {moment().format("MMM Do YY")}
		</footer>
	);
};

export default Footer