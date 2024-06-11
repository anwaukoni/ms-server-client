import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut } from '../../features/auth/authSlice'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3333',
	credentials: 'include',
	prepareHeaders: (headers, { getState}) => {
			const state = getState() as RootState
			const token = state.auth.token
			if (token) {
					headers.set("authorization", `Bearer ${token}`)
			}
			return headers
	}
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {

	console.log({args, api, extraOptions})
	let result = await baseQuery(args, api, extraOptions)

	if (result.error) {
			api.dispatch(logOut())
	}
	
	return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})