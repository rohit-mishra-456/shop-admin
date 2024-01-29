import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryInstance from "./baseQuery";

export const bundlesApi = createApi({
  reducerPath: "giftBundles",
  baseQuery: baseQueryInstance,
  refetchOnMountOrArgChange: 30,
  endpoints: (build) => ({
    getGiftBundles: build.query({
      query: () => ({ url: `bundles?page=1&limit=10` }),
    }),

    getGiftBundleById: build.query({
      query: (id) => ({ url: `bundle/${id}` }),
    }),

    getGiftBundleProductsById: build.query({
      query: (id) => ({ url: `bundle/${id}/products?page=1&limit=10` }),
    }),
    getGiftBundleEditProductById: build.query({
      query: (id) => ({
        url: `products?page=1&limit=10&affiliate=false&giftBundleId=${id}`,
      }),
    }),

    updateBundles: build.mutation({
      query: ({ id, ...data }) => ({
        url: `bundle/${id}`,
        method: "put",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetGiftBundlesQuery,
  useGetGiftBundleByIdQuery,
  useGetGiftBundleProductsByIdQuery,
  useGetGiftBundleEditProductByIdQuery,
  useUpdateBundlesMutation,
} = bundlesApi;
