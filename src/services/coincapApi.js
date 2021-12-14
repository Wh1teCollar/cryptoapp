import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.coincap.io/v2';

export const coincapApi = createApi({
	reducerPath:'coincapApi',
	baseQuery:fetchBaseQuery({baseUrl}),
	prepareHeaders:'Access-Control-Allow-Origin',
	endpoints: (builder)=>({
		getCryptos: builder.query({
			query:()=> '/assets?limit=20'
		}),
		getCryptoDetails: builder.query({
			query:()=>'/assets/bitcoin/history?interval=d1'
		})
	})
});

export const {useGetCryptosQuery, useGetCryptoDetailsQuery} = coincapApi;