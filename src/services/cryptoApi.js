import { createApi, fetchBaseQuery } from "@reduxjs/toolkit";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.RAPID_API_HEADERS_KEY,
  "X-RapidAPI-Host": process.env.RAPID_API_HEADERS_HOST,
};

const baseUrl = process.env.RAPID_API_BASE_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});
