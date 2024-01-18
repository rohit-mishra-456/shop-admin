import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';
export const orderApis = createApi({
    reducerPath: 'order',
    baseQuery: baseQueryInstance,
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => ({ url: `orders?page=1&limit=10` }),
        }),
        getOrderById: build.query({
            query: (id) => ({ url: `orders?page=1&limit=10/${id}` }),
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
    useGetOrdersQuery,
    useGetOrderByIdQuery,
} = orderApis;