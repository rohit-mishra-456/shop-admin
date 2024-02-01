import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryInstance from "./baseQuery";
export const imageApis = createApi({
  reducerPath: "image",
  baseQuery: baseQueryInstance,
  endpoints: (build) => ({
    addSingleImage: build.mutation({
      query: (data) => ({ url: `upload/single`, method: "post", body: data }),
    }),
  }),
});

export const { useAddSingleImageMutation } = imageApis;
