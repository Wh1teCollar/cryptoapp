import React, { useState, useEffect } from 'react';
import styles from './Chart.module.css';
import { useGetCryptoDetailsQuery } from '../../services/coincapApi';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import faker from 'faker';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const Chart = () => {

	const { data, isFetching } = useGetCryptoDetailsQuery();
	const historyData = data?.data;


	const [history, setHistory] = useState(historyData)

	useEffect(() => {
		setHistory(historyData);
	}, [historyData]);

	if (isFetching) return 'Loading...'

	const coinPrice = [];
	const coinTimestamp = [];

	for (let i = 1; i < 364; i += 1) {
		coinPrice.push(history[i]?.priceUsd);
		coinTimestamp.push(new Date(history[i]?.time).toLocaleDateString());
	}

	console.log(coinPrice)
	console.log(coinTimestamp)
	const chartData = {
		labels: coinTimestamp,
		datasets: [
			{
				label: 'Price in USD',
				data: coinPrice,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: '#0071bd'
			}
		]
	}
	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: false,
				text: 'Chart.js Line Chart',
			},
		}
	};


	return (
		<div className={styles.chart}>
			<Line data={chartData} options={chartOptions} />
		</div>
	);
};

export default Chart