import React, { useState, useEffect } from 'react';
import Styles from "../scss/styles.module.scss"
import WorkSpace from './work-space';
import MyNotes from './my-notes';
import NoNotesYet from './no-notses-yet';
import Search from './search';
import { Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectedAllNotes, deleteNote } from '../slices/notesSlice';
import { displaydNote } from '../slices/displaydNoteSlice';

function Main(props) {
    const { setDisplaydNote, onEdit, onNewNote, notesListRef, displaydFolder, setDisplaydFolder, onChangeFolder, navToAllNotes } = props;
    const [displaydNotes, setDisplaydNotes] = useState([])
    const notesData = useSelector(selectedAllNotes)
    const dispatch = useDispatch()

    function handleDeleteAndFade(note, element) {
        element.classList.add('fade-out')

        setTimeout(() => {
            displaydNote.id === notesData.find(note1 => note1.id === note.id).id && setDisplaydNote(notesData[0]);
            dispatch(deleteNote({ noteId: note.id }))
            displaydFolder != 'All Notes' && displaydNotes.length === 1 && navToAllNotes()
            // displaydNotes.length === 1, 1 and not 0 because the note wasnt actually deleted yet
        }, 250);

    }

    useEffect(() => {
        let tempDisplaydNotes = [];
        tempDisplaydNotes = (displaydFolder != 'All Notes' ?
            notesData.filter(note => note.folder === displaydFolder)
            : notesData)
        setDisplaydNotes(tempDisplaydNotes)
    }, [displaydFolder, notesData]);

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
                        displaydFolder={displaydFolder}
                        setDisplaydFolder={setDisplaydFolder}
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