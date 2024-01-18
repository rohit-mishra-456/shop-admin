import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { dashboardApi } from '../queries/dashboard';
import { bundlesApi } from '../queries/giftBundle';
import { giftIdeasApis } from '../queries/giftIdeas';
import { orderApis } from '../queries/order';
import { userApis } from '../queries/users';


export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    // Add the generated reducer as a specific top-level slice
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [bundlesApi.reducerPath]: bundlesApi.reducer,
    [giftIdeasApis.reducerPath]: giftIdeasApis.reducer,
    [orderApis.reducerPath]: orderApis.reducer,
    [userApis.reducerPath]: userApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dashboardApi.middleware,
      bundlesApi.middleware,
      giftIdeasApis.middleware,
      orderApis.middleware,
      userApis.middleware,
    ),
})
setupListeners(store.dispatch);

 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch