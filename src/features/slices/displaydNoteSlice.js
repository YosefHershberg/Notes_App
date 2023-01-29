import { createSlice } from '@reduxjs/toolkit'

export const displaydNoteSlice = createSlice({
    name: 'displaydNote',
    initialState: {},
    reducers: {
        setDisplaydNote(state, action) {
            return action.payload
        }
    }
})

export const displaydNote = (state) => state.displaydNote

export const { setDisplaydNote } = displaydNoteSlice.actions

export default displaydNoteSlice.reducer