import React, { useState, useEffect } from 'react';
import Styles from "../scss/styles.module.scss"
import WorkSpace from './work-space';
import MyNotes from './my-notes';
import NoNotesYet from './no-notses-yet';
import Search from './search';
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectedAllNotes, deleteNote } from '../slices/notesSlice';
import { displaydNote } from '../slices/displaydNoteSlice';
import { displaydFolderData } from '../slices/displaydFolderSlice'

function Main(props) {
    const { setDisplaydNote, onEdit, onNewNote, notesListRef, onChangeFolder, navToAllNotes } = props;
    const [displaydNotes, setDisplaydNotes] = useState([])
    const dispatch = useDispatch()
    const allNotes = useSelector(selectedAllNotes)
    const displaydFolder = useSelector(displaydFolderData)

    function handleDeleteAndFade(note, element) {
        element.classList.add('fade-out')

        setTimeout(() => {
            displaydNote.id === allNotes.find(note1 => note1.id === note.id).id && setDisplaydNote(allNotes[0]);
            dispatch(deleteNote({ noteId: note.id }))
            displaydFolder != 'All Notes' && displaydNotes.length === 1 && navToAllNotes()
            // "displaydNotes.length === 1" 1 and not 0 because the note wasnt actually deleted yet ^^^
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
                        displaydNote={displaydNote}
                        onEdit={onEdit}
                        onDelete={handleDeleteAndFade}
                        notesListRef={notesListRef}
                        displaydFolder={displaydFolder}
                        displaydNotes={displaydNotes}
                        onChangeFolder={onChangeFolder}
                    />} />

                    <Route path='/' element={<MyNotes
                        onDelete={handleDeleteAndFade}
                        onEdit={onEdit}
                        onChangeFolder={onChangeFolder}
                        displaydNotes={displaydNotes}
                        onNewNote={onNewNote}
                    />} />

                    <Route path='/noNotesYet' element={<NoNotesYet
                        onNewNote={onNewNote}
                    />} />

                    <Route path='/search' element={<Search
                        onEdit={onEdit}
                    />} />
                </Routes>
            </div>
        </React.Fragment>
    );
}

export default Main;