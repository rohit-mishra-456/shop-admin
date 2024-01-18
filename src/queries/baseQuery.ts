import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
 
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://suscel-backend.foobar.in/api/admin',
    prepareHeaders: async headers => {
 
        //reducer
        const token = await localStorage.getItem("accessToken");
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});
 
const baseQueryInstance: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    return result;
};
 
export default baseQueryInstance;