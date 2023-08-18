import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "contractItems",
    tagTypes: ["saveItems", "distinctItems"],
    endpoints: (build) => ({
        saveItems: build.mutation({
            query: (itemData) => ({
                url: "/contractItem/saveList",
                method: "POST",
                body: itemData
            }),
            providesTags: ["saveItems"]
        }),
        distinctItems: build.query({
            query: () => "/contractItem/getDistinctItems",
            providesTags: ["distinctItems"]
        })
    })
})

export const {
    useSaveItemsMutation,
    useDistinctItemsQuery
} = api;