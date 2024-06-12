import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: 'auth/signin',
          method: 'POST',
          body: { ...credentials },
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
