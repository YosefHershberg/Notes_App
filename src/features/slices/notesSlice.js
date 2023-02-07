import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const stateFromStorage = JSON.parse(localStorage.getItem('ALL_NOTES'))

export const notesSlice = createSlice({
    name: 'notes',
    initialState: stateFromStorage || [],
    reducers: {
        addNote: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(displaydFolder) {
                return {
                    payload: {
                        id: uuidv4(),
                        text: "",
                        lastModified: new Date(Date.now()).toLocaleString(),
                        folder: displaydFolder,
                    }
                }
            } 
        },

        editNote(state, action) {
            const {noteId, value} = action.payload
            const theNote = state.find(note => note.id === noteId)
            theNote.text = value
            theNote.lastModified = new Date(Date.now()).toLocaleString()
        },
        
        deleteNote(state, action) {
            const { noteId } = action.payload
            return state.filter(note => note.id != noteId)
        },

        changeFolderToNewName(state, action) {
            const { oldName, newName } = action.payload
            console.log(action.payload);
            const theNotes = state.filter(note => note.folder === oldName)
            theNotes.map(note => note.folder = newName)
        }
    }
})

export const selectedAllNotes = (state) => state.notes

export const { addNote, editNote, deleteNote, changeFolderToNewName} = notesSlice.actions

export default notesSlice.reducer;