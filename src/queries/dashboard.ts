import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';
 
export const dashboardApi = createApi({
    reducerPath: 'dashboard',
    baseQuery: baseQueryInstance,
    refetchOnMountOrArgChange: 30,
    endpoints: (build) => ({
        getDashboardData: build.query({
            query: () => ({ url: `dashboard` }),
        }),
    }),
})
 
export const {
    useGetDashboardDataQuery,
} = dashboardApi;