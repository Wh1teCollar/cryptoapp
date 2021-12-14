import React, { useState, useEffect } from 'react';
import styles from './Bitcoin.module.css';
import { useGetCryptosQuery } from '../../services/coincapApi';
import moment from 'moment';
import millify from 'millify';
import Chart from '../Chart/Chart';

const Bitcoin = () => {

	const { data, isFetching, isSuccess } = useGetCryptosQuery();
	const cryptosList = data?.data[0];
	const [cryptos, setCryptos] = useState(cryptosList)

	useEffect(() => {
		setCryptos(cryptosList);
	}, [cryptosList]);

	if (isFetching) return 'Loading...'
	if (isSuccess && cryptos)
		return (
			<div className={styles.bitcoin_container}>
				<div className={styles.bitcoin_header}>
					<div className={styles.bitcoin_logo}>
						<img src="https://assets.coincap.io/assets/icons/btc@2x.png" alt="Bitcoin logo" />
					</div>
					<div className={styles.bitcoin_name}>Bitcoin (BTC)</div>
					<div className={styles.bitcoin_date}>{moment().format('Do MMMM YYYY')}</div>
					<div className={styles.bitcoin_high}>Rank</div>
					<div className={styles.bitcoin_high_value}>{cryptos.rank}</div>
					<div className={styles.bitcoin_low}>PRICE</div>
					<div className={styles.bitcoin_low_value}>{'$ ' + millify(parseFloat(cryptos.priceUsd), {
						precision: 2,
						decimalSeparator: ".",
						space: true,
						lowercase: true
					})}</div>
					<div className={styles.bitcoin_avarage}>MARKET CAP</div>
					<div className={styles.bitcoin_avarage_value}>{'$ ' + millify(parseFloat(cryptos.marketCapUsd), {
						precision: 2,
						decimalSeparator: ".",
						space: true,
						lowercase: true
					})}</div>
					<div className={styles.bitcoin_change}>CHANGE</div>
					<div className={styles.bitcoin_change_value}>{millify(parseFloat(cryptos.changePercent24Hr), {
						precision: 3,
						decimalSeparator: ".",
						space: true,
						lowercase: true
					}) + ' %'}</div>

				</div>
				<Chart />
			</div>
		);
	return "Loading"
};

export default Bitcoin