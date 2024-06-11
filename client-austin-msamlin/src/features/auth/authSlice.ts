import { createAction, createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, "access_token": accessToken } = action.payload
      state.user = user
      state.token = accessToken
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
    }
  },
})

export const { setCredentials } = authSlice.actions

export const logOut = createAction<void>('auth/logOut');

export default authSlice.reducer

export const selectCurrentUser = (state: { auth: { user: any } }) => state.auth.user
export const selectCurrentToken = (state: { auth: { token: any } }) => state.auth.token