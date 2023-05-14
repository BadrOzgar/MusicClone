import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//fetching data from RapidApi
export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam8.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        'db08706203mshfcdaccc4a02415fp1f528ajsn638019ae4cd0'
      );
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/track/info' }),

    getSongsByGenre: builder.query({
      query: (genre) => `/charts/genre-world?genre_code=${genre}`,
    }),

    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),

    /* query: ({ songid }) => `/tracks/details?track_id=${songid}`, */
    getSongDetails: builder.query({ query: () => '/tracks/details?track_id' }),

    /* query: ({ songid }) => `/tracks/related?track_id=${songid}`, */
    getSongRelated: builder.query({ query: () => '/tracks/details?track_id' }),

    /* query: ({ artistsId }) => `/artists/details?artist_id=${artistsId}`, */
    getArtistsDetails: builder.query({
      query: () => '/artists/details?artist_id',
    }),

    /* query: ({ countryCode }) => `/charts/country?country_code?=${countryCode}`, */
    getSongsByCountry: builder.query({
      query: () => '/charts/country?country_code?',
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetSongsByCountryQuery,
  useGetArtistsDetailsQuery,
} = shazamCoreApi;
