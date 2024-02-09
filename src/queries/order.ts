import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';


export const orderApis = createApi({
    reducerPath: 'order',
    baseQuery: baseQueryInstance,
    endpoints: (build) => ({
        getOrders: build.mutation({
            query: ({Name, email, orderId}) => ({ url: `orders?page=1&limit=100 ${Name ? `&name=${Name}` : ''}${email ? `&email=${email}` : ''} ${orderId ? `&orderId=${orderId}` : ''}` }),
        }),

        getOrderById: build.query({ 
            query: (id) => ({ url: `orders/${id}` }),
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
        // `/users?page=${page}&limit=${limit}${name ? `&name=${name}` : ''}${email ? `&email=${email}` : ''}${socialId ? `&socialId=${socialId}` : ''}${isVerified ? `&isVerified=${isVerified}` : ''}`
    }),
})
 
export const {
    useGetOrdersMutation,
    useGetOrderByIdQuery,
} = orderApis;