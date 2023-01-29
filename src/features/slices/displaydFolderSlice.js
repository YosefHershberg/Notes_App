import { createSlice } from '@reduxjs/toolkit'

export const displaydFolderSlice = createSlice({
    name: 'displaydFolder',
    initialState: 'All Notes',
    reducers: {
        setDisplaydFolder(state, action) {
            return action.payload
        }
    }
})

export const displaydFolderData = (state) => state.displaydFolder

export const { setDisplaydFolder } = displaydFolderSlice.actions

export default displaydFolderSlice.reducer