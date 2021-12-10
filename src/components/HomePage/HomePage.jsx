import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import { Coin } from '../index';
import { useGetCryptosQuery } from '../../services/coincapApi';



const HomePage = () => {

	const { data, isFetching } = useGetCryptosQuery();
	const cryptosList = data?.data;
	const [cryptos, setCryptos] = useState(cryptosList)

	useEffect(() => {
		setCryptos(cryptosList);
	}, [cryptosList]);

	if (isFetching) return 'Loading...'
	const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,binance-coin,cardano,tether,solana,xrp,polkadot,usd-coin,dogecoin,terra-luna,uniswap,avalanche,binance-usd,algorand')

	pricesWs.onmessage = function (msg) {
		console.log(msg.data)
	}
	return (
		<div className={styles.home_container}>
			<div className={styles.list}>
				<div className={styles.coinTitle}>
					<div className={styles.rankTitle}>Rank</div>
					<div className={styles.nameTitle}>Name</div>
					<div className={styles.priceUsdTitle}>Price</div>
					<div className={styles.marketCapUsdTitle}>Market Cap</div>
					<div className={styles.vwap24HrTitle}>VWAP (24Hr)</div>
					<div className={styles.supplyTitle}>Supply</div>
					<div className={styles.volumeUsd24HrTitle}>Volume (24Hr)</div>
					<div className={styles.changePercent24HrTitle}>Change (24Hr)</div>
				</div>

				{cryptos?.map(coin => (
					<Coin key={coin.id} {...coin} />
				))}
			</div>
		</div>
	);
};

export default HomePage