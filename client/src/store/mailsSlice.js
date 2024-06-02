import {createSlice} from '@reduxjs/toolkit'

const mailsSlice = createSlice({
    name: 'mails',
    initialState: {
        filter: '',
        page: 1,
        prev: false,
        next: false,
        incoming: 0,
        checkedMails: [],
        isChecked: false,
        modal: false,
        popup: false,
        popupMessage: '',
        mails: [],
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
        },
        
        setPopup(state, action) {
            state.popup = action.payload.popup
            state.popupMessage = action.payload.message
        },

        setPage(state, action) {
            state.page = action.payload
        },

        setPaginationButtons(state, action) {
            state.prev = action.payload.prev
            state.next = action.payload.next
        },

        setIncoming(state, action) {
            state.incoming = action.payload
        },

        setMails(state, action) {
            state.mails = action.payload
        }
    },
})

export const {
                filterHandler, 
                checkHandler, 
                resetHandler, 
                setModal, 
                setPopup, 
                setPage, 
                setPaginationButtons,
                setIncoming,
                setMails,
            } = mailsSlice.actions

export default mailsSlice.reducer