import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
	return (
		<header className={styles.nav_container}>
			<div className={styles.logo_container}>
				<img
					className={styles.logoImg}
					src="https://coincap.io/static/logos/black.svg"
					alt="Coincap logo" />
			</div>
			<div className={styles.menu}>
				<Link className={styles.menuItem} to="/">Home</Link>
				<Link className={styles.menuItem} to="/bitcoin">Bitcoin</Link>
			</div>
		</header>
	);
};

export default Navbar