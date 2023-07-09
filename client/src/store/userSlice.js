import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: null,
        username: null,
        token: null,
        memory: null,
    },
    reducers: {
        setCredentials(state, action) {
            const {username, access} = action.payload
            state.username = username
            state.token = access
        },
        setUserCredentials(state, action) {
            const {name, memory} = action.payload.user
            state.name = name
            state.memory = memory
        },
        logOut(state) {
            state.username = null
            state.token = null
            state.name = null
            state.memory = null
        }
    }
})

export const {setCredentials, logOut} = userSlice.actions

export default userSlice.reducer

export const selectCurrentUsername = (state) => state.user.username
export const selectCurrentToken = (state) => state.user.token
export const selectCurrentMemory = (state) => state.user.memory
export const selectCurrentName = (state) => state.user.name