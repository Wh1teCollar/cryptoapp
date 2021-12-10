import { configureStore } from '@reduxjs/toolkit';

import { coincapApi } from '../services/coincapApi';

export default configureStore({
	reducer:{
		[coincapApi.reducerPath]: coincapApi.reducer,
	},
	  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coincapApi.middleware),
})