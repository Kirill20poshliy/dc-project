import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// import { setCredentials, logOut } from './userSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token
            if (token) {
                // headers.set('Content-Type', 'application/json')
                // headers.set('Content-Type', 'multipart/form-data')
                // headers.set('authorization', 'Bearer ${token}')
            }
            return headers
        }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // if (result?.error) {
    //     console.log('sending refresh token')

    //     const refreshResult = await baseQuery('/token/refresh/', api, extraOptions)
    //     console.log(refreshResult)

    //     if (refreshResult?.data) {
    //         const user = api.getState().user.token
    //         api.dispatch(setCredentials({...refreshResult.data, user}))

    //         result = await baseQuery(args, api, extraOptions)
    //     } else {
    //         api.dispatch(logOut())
    //     }
    // }
    return result
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Mails', 'User', 'Profiles', 'Attachments'],
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        getMails: build.query({
            query: ({filter = '', page = 1}) => ({
                url: `/messages/?ordering=-date_received${filter}&page=${page}`,
                method: 'GET',
            }),
            providesTags: (result) =>
            result
              ? [
                  ...result.results.map(({ id }) => ({ type: 'Mails', id })),
                  { type: 'Mails', id: 'LIST' },
                ]
              : [{ type: 'Mails', id: 'LIST' }],
        }),
        getMail: build.query({
            query: (id) => ({
                url: `/messages/${id}/`,
                method: 'GET',
            }),
        }),
        actionMails: build.mutation({
            query: ({id, action}) => ({
                url: `/messages/${id}/`,
                method: 'PATCH',
                body: action,
            }),
            invalidatesTags: [{ type: 'Mails', id: 'LIST' }]
        }),
        deleteHardMail: build.mutation({
            query: (id) => ({
                url: `/messages/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Mails', id: 'LIST' }]
        }),
        writeMail: build.mutation({
            query: (body) => ({
                url: '/messages/',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Mails', id: 'LIST' }]
        }),
        login: build.mutation({
            query: credentials => ({
                url: '/token/',
                method: 'POST',
                body: {...credentials},
            }),
            invalidatesTags: [{ type: 'User' }]
        }),
        getUser: build.query({
            query: (username) => ({
                url: `/user/?username=${username}`,
                method: 'GET',
            }),
        }),
        getProfiles: build.query({
            query: (id) => ({
                url: `/profiles/?user=${id}`,
                method: 'GET',
            }),
        }),
        getAttachments: build.query({
            query: (request) => ({
                url: `/attachment/${request}/`,
                method: 'GET',
                
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", "multipart/form-data")
                    return headers
                },
            })
        }),
        sendAttachments: build.mutation({
            query: (body) => ({
                url: '/attachment/',
                method: 'POST',
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", "multipart/form-data")
                    return headers
                },
                body: body,
            })
        }),
    })
})

export const {
                useGetMailsQuery,
                useActionMailsMutation, 
                useWriteMailMutation, 
                useDeleteHardMailMutation, 
                useLoginMutation, 
                useGetProfilesQuery,
                useLazyGetProfilesQuery, 
                useGetUserQuery,
                useLazyGetUserQuery,
                useLazyGetMailsQuery,
                useLazyGetAttachmentsQuery,
                useSendAttachmentsMutation,
                useLazyGetMailQuery,
            } = api