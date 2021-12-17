import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import { Coin } from '../index';
import { useGetCryptosQuery } from '../../services/coincapApi';



const HomePage = () => {

	const { data, isFetching, isSuccess } = useGetCryptosQuery();
	const cryptosList = data?.data;
	const [cryptos, setCryptos] = useState(cryptosList)

	useEffect(() => {
		setCryptos(cryptosList);
	}, [cryptosList]);

	if (isFetching) return 'Loading...'

	if (isSuccess && cryptos) {
		const coinList = [];
		cryptos?.map(coin => (coinList.push(coin.id)))
		const coinListString = coinList.join(',')
		const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinListString}`)
		pricesWs.onmessage = function (msg) {
			for (var coin = 0; coin < coinList.length; coin++) {
				const coinName = coinList[coin];
				const newPrice = (JSON.parse(msg.data))[coinName];
				if (newPrice) {
					const newCryptos = [...cryptos];
					const coinObj = { ...cryptos[coin] }
					coinObj.priceUsd = parseFloat(newPrice);
					newCryptos[coin] = coinObj;
					setCryptos(newCryptos);
					console.log(`"WebSocket ${coinList[coin]} isSuccess`);
				}
			}
		}
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