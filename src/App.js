import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { Navbar, Footer, HomePage, Bitcoin} from './components';
import styles from './App.module.css'

const App = () => {
	return (
		<div className={styles.layout}>
			<Navbar className={styles.header}/>
			<div className={styles.main}>
				<div className={styles.routes}>
					<Routes>
						<Route exatc path="/" element={<HomePage />}/>
						<Route exatc path="/bitcoin" element={<Bitcoin />}/>
					</Routes>
				</div>
			</div>
			<Footer className={styles.footer}/>
		</div>
	)
}

export default App