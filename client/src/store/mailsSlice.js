import {createSlice} from '@reduxjs/toolkit'

const mailsSlice = createSlice({
    name: 'mails',
    initialState: {
        filter: '',
        checkedMails: [],
        isChecked: false,
        modal: false,
    },
    reducers: {

        filterHandler(state, action) {
            state.filter = action.payload
        },

        checkHandler(state, action) {
            if (state.checkedMails.includes(action.payload.checkedItem)) {
                state.checkedMails = state.checkedMails.filter((item) => item !== action.payload.checkedItem)
            } else {
                state.checkedMails.push(action.payload.checkedItem)
            }
            state.isChecked = 
                !state.checkedMails.length && state.isChecked ? 
                false : true
        },

        resetHandler(state) {
            state.isChecked = false
            state.checkedMails = []
        },

        setModal(state) {
            state.modal = state.modal ? false : true
        }

    },
})

export const {filterHandler, checkHandler, resetHandler, setModal} = mailsSlice.actions

export default mailsSlice.reducer