import React from 'react';
import styles from './Coin.module.css';
import millify from 'millify';
import { Link } from 'react-router-dom';

const Coin = (props) => {

	return (
		<Link key={props.id} className={styles.coin} to={`/crypto/${props.id}`}>
			<div className={styles.rank}>{props.rank}</div>
			<div className={styles.nameBlock}>
				<img src={`https://assets.coincap.io/assets/icons/${(props.symbol).toLowerCase()}@2x.png`} alt={`${props.name} Logo`} />
				<div className={styles.name}>
					{props.name}
					<span className={styles.symbol}> ({props.symbol})</span>
				</div>
			</div>
			<div className={styles.priceUsd}>{'$ ' + millify(parseFloat(props.priceUsd), {
				precision: 4,
				decimalSeparator: ".",
				space: true,
				lowercase: true
			})}</div>
			<div className={styles.marketCapUsd}>{'$ ' + millify(parseFloat(props.marketCapUsd), {
				precision: 2,
				decimalSeparator: ".",
				space: true,
				lowercase: true
			})}</div>
			<div className={styles.vwap24Hr}>{'$ ' + millify(parseFloat(props.vwap24Hr), {
				precision: 4,
				decimalSeparator: ".",
				space: true,
				lowercase: true
			})}</div>
			<div className={styles.supply}>{'$ ' + millify(parseFloat(props.supply), {
				precision: 2,
				decimalSeparator: ".",
				space: true,
				lowercase: true
			})}</div>
			<div className={styles.volumeUsd24Hr}>{'$ ' + millify(parseFloat(props.volumeUsd24Hr), {
				precision: 2,
				decimalSeparator: ".",
				space: true,
				lowercase: true
			})}</div>
			<div className={styles.changePercent24Hr}>{millify(parseFloat(props.changePercent24Hr), {
				precision: 2,
				decimalSeparator: ".",
				space: true,
				lowercase: true
			}) + ' %'}</div>
		</Link>
	);
};

export default Coin