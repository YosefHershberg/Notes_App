import React, { useState, useEffect } from 'react';
import Styles from "../scss/styles.module.scss"
import WorkSpace from './work-space';
import MyNotes from './my-notes';
import NoNotesYet from './no-notses-yet';
import Search from './search';
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectedAllNotes, deleteNote } from '../slices/notesSlice';
import { displaydNote, setDisplaydNote } from '../slices/displaydNoteSlice';
import { displaydFolderData } from '../slices/displaydFolderSlice'

function Main(props) {
    const { notesListRef, onChangeFolder, navToAllNotes } = props;
    const [displaydNotes, setDisplaydNotes] = useState([])
    const dispatch = useDispatch()
    const allNotes = useSelector(selectedAllNotes)
    const displaydFolder = useSelector(displaydFolderData)
    const displaydNoteData = useSelector(displaydNote)

    function handleDeleteAndFade(note, element) {
        element.classList.add('fade-out')

        setTimeout(() => {
            displaydNoteData.id === note.id && dispatch(setDisplaydNote(allNotes[0]));
            // ^^^ Checks if deleted note is the displayed note, if so displays first note
            note.id === allNotes[0].id && displaydNoteData.id === note.id && dispatch(setDisplaydNote(allNotes[1]))
            // ^^^ Checks if deleted note is the first note and the displayed note, if so displayes seconed note
            dispatch(deleteNote({ noteId: note.id }))
            displaydFolder != 'All Notes' && displaydNotes.length === 1 && navToAllNotes()
            // ^^^ "displaydNotes.length === 1" 1 and not 0 because the note wasnt actually deleted yet
        }, 250);
    }

    useEffect(() => {
        let tempDisplaydNotes = [];
        tempDisplaydNotes = (displaydFolder != 'All Notes' ?
            allNotes.filter(note => note.folder === displaydFolder)
            : allNotes)
        setDisplaydNotes(tempDisplaydNotes)
    }, [displaydFolder, allNotes]);

    return (
        <React.Fragment>
            <div id={Styles.main}>
                <Routes>
                    <Route path='/workSpace' element={<WorkSpace
                        onDelete={handleDeleteAndFade}
                        notesListRef={notesListRef}
                        displaydNotes={displaydNotes}
                    />} />

                    <Route path='/' element={<MyNotes
                        onDelete={handleDeleteAndFade}
                        onChangeFolder={onChangeFolder}
                        displaydNotes={displaydNotes}
                    />} />

                    <Route path='/noNotesYet' element={<NoNotesYet />} />

                    <Route path='/search' element={<Search />} />
                </Routes>
            </div>
        </React.Fragment>
    );
}

export default Main;