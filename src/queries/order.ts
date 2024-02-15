import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryInstance from "./baseQuery";

export const orderApis = createApi({
  reducerPath: "order",
  baseQuery: baseQueryInstance,
  endpoints: (build) => ({
    getOrders: build.mutation({
      query: ({ Name, Email, OrderID, status, page, limit }) => {
        console.log("rohitmishra", page);
        return {
          url: `orders?${Name ? `&name=${Name}` : ""}${
            Email ? `&email=${Email}` : ""
          }${OrderID ? `&orderId=${OrderID}` : ""}${
            status ? `&status=${status}` : ""
          }${page ? `&page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
        };
      },
    }),

    getOrderById: build.query({
      query: (id) => ({ url: `orders/${id}` }),
    }),
    updateOrder: build.mutation({
      query: ({ id, ...data }) => ({
        url: `orders/${id}`,
        method: "put",
        body: data,
      }),
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
});

export const {
  useGetOrdersMutation,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} = orderApis;
