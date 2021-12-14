import React, { useState, useEffect } from 'react';
import styles from './Coin.module.css';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptoDetailsQuery } from '../../services/coincapApi';
const Coin = (props) => {

	const { data, isFetching, isSuccess } = useGetCryptoDetailsQuery();
	const cryptosList = data?.data;
	const [history, setHistory] = useState(cryptosList)

	useEffect(() => {
		setHistory(cryptosList);
	}, [cryptosList]);
	if (isFetching) return 'Loading...';

	function beautifier(number) {
		let result = 0;
		if (number * 10000 > 1) {
			result = millify(parseFloat(number), {
				precision: 2,
				decimalSeparator: ".",
				space: true,
				lowercase: true
			})
		} else {
			result = millify(parseFloat(number), {
				precision: 6,
				decimalSeparator: ".",
				space: true,
				lowercase: true
			})
		}
		return result
	}
	return (
		<Link key={props.id} className={styles.coin} to={`/bitcoin`}>
			<div className={styles.rank}>{props.rank}</div>
			<div className={styles.nameBlock}>
				<img src={`https://assets.coincap.io/assets/icons/${(props.symbol).toLowerCase()}@2x.png`} alt={`${props.name} Logo`} />
				<div className={styles.name}>
					{props.name}
					<span className={styles.symbol}> ({props.symbol})</span>
				</div>
			</div>
			<div className={styles.priceUsd}>{'$ ' + beautifier(props.priceUsd)}</div>
			<div className={styles.marketCapUsd}>{'$ ' + beautifier(props.marketCapUsd)}</div>
			<div className={styles.vwap24Hr}>{'$ ' + beautifier(props.vwap24Hr)}</div>
			<div className={styles.supply}>{'$ ' + beautifier(props.supply)}</div>
			<div className={styles.volumeUsd24Hr}>{'$ ' + beautifier(props.volumeUsd24Hr)}</div>
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