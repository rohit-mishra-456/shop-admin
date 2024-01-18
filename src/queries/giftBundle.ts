import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';
 
export const bundlesApi = createApi({
    reducerPath: 'giftBundles',
    baseQuery: baseQueryInstance,
    refetchOnMountOrArgChange: 30,
    endpoints: (build) => ({
        getGiftBundles: build.query({
            query: () => ({ url: `bundles?page=1&limit=10` }),
        }),

        getGiftBundleById: build.query({
            query: (id) => ({ url: `bundles?page=1&limit=10/${id}` }),
        }),
        // updateOrder: build.mutation({
        //     query: (id, {data}) => ({ url: `post/${id}` }),
        // }),
        // deleteOrders: build.query({
        //     query: (id) => ({ url: `post/${id}` }),
        // }),
        // createOrders: build.query({
        //     query: (id) => ({ url: `post/${id}` }),
        // }),
    }),
})
 
export const {
    useGetGiftBundlesQuery,
    useGetGiftBundleByIdQuery,
} = bundlesApi;