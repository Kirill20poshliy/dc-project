import {configureStore} from '@reduxjs/toolkit'
import mailsReducer from './mailsSlice'
import userReducer from './userSlice'
import {api} from './api'

export default configureStore({
    reducer: {
        mails: mailsReducer,
        user: userReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})