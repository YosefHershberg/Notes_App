import React, { useState, useEffect } from 'react';
import NotesListNote from './notes-list-note';
import Styles from '../scss/styles.module.scss'
import { useSelector } from 'react-redux';
import { selectedAllNotes } from '../slices/notesSlice';
import { displaydFolderData } from '../slices/displaydFolderSlice';

function NotesList(props) {
    const { onDelete, notesListRef, displaydNotes } = props

    const allNotes = useSelector(selectedAllNotes)
    const displaydFolder = useSelector(displaydFolderData)

    return (
        <React.Fragment>
            <div id={Styles.notesListWrapper}>
                <h3 id={Styles.FolderName}>{displaydFolder}:</h3>
                    <ul ref={notesListRef} id={Styles.notesList}>
                    {(displaydNotes != undefined ? displaydNotes : allNotes).map(note =>
                        <NotesListNote
                            key={note.id}
                            note={note}
                            onDelete={onDelete}
                        />
                    )}
                </ul>
            </div>
        </React.Fragment>
    );
}

export default NotesList;