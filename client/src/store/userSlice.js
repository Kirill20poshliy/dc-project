import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        profileId: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        username: null,
        token: null,
        memory: 200,
    },
    reducers: {
        setCredentials(state, action) {
            const {username, access} = action.payload
            state.username = username
            state.token = access
        },

        setUserId(state, action) {
            state.id = action.payload
        },

        setUserProfile(state, action) {
            const userData = action.payload
            state.first_name = userData.first_name
            state.last_name = userData.last_name
            state.middle_name = userData.middle_name
            state.profileId = userData.id
        },
        logOut(state) {
            state.username = null
            state.token = null
            state.id = ''
            state.first_name = ''
            state.last_name = ''
            state.middle_name = ''
            state.memory = 200
        }
    }
})

export const {setCredentials, setUserId, setUserProfile, logOut} = userSlice.actions

export default userSlice.reducer

export const selectCurrentUsername = (state) => state.user.username
export const selectCurrentToken = (state) => state.user.token
export const selectCurrentMemory = (state) => state.user.memory