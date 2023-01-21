import React, { useState, useEffect } from 'react';
import Styles from "../scss/styles.module.scss"
import WorkSpace from './work-space';
import MyNotes from './my-notes';
import NoNotesYet from './no-notses-yet';
import Search from './search';
import { Routes, Route, Link } from 'react-router-dom'

function Main(props) {
    const { mode, notes, displaydNote, onChange, onSave, onEdit, onDelete, incrememt, onNewNote, notesListRef, textAreaRef, displaydFolder, onChangeFolder } = props;
    const [displaydNotes, setDisplaydNotes] = useState([])

    function handleDeleteAndFade(note, element) {
        element.classList.add('fade-out')

        setTimeout(() => {
            onDelete(note.id)
        }, 250);
    }

    useEffect(() => {
        let tempDisplaydNotes = [];
        tempDisplaydNotes = (displaydFolder != 'All Notes' ?
            notes.filter(note => note.folder === displaydFolder)
            : notes)
        setDisplaydNotes(tempDisplaydNotes)
    }, [displaydFolder, notes]);

    return (
        <React.Fragment>
            <div id={Styles.main}>
                <Routes>
                    <Route path='/workSpace' element={<WorkSpace
                        mode={mode}
                        notes={notes}
                        displaydNote={displaydNote}
                        onChange={onChange}
                        onSave={onSave}
                        onEdit={onEdit}
                        onDelete={handleDeleteAndFade}
                        incrememt={incrememt}
                        notesListRef={notesListRef}
                        textAreaRef={textAreaRef}
                        displaydFolder={displaydFolder}
                        displaydNotes={displaydNotes}
                        onChangeFolder={onChangeFolder}
                    />} />

                    <Route path='/' element={<MyNotes
                        onDelete={handleDeleteAndFade}
                        notes={notes}
                        onEdit={onEdit}
                        displaydFolder={displaydFolder}
                        onChangeFolder={onChangeFolder}
                        displaydNotes={displaydNotes}
                        onNewNote={onNewNote}
                    />} />

                    <Route path='/noNotesYet' element={<NoNotesYet
                        onNewNote={onNewNote}
                    />} />

                    <Route path='/search' element={<Search
                        notes={notes}
                        onEdit={onEdit}
                    />} />
                </Routes>
            </div>
        </React.Fragment>
    );
}

export default Main;