import React, { useState, useEffect, useRef } from 'react';
import NotesListNote from './notes-list-note';
import Styles from '../scss/styles.module.scss'
import { useSelector } from 'react-redux';
import { selectedAllNotes } from '../slices/notesSlice';

function NotesList(props) {
    const { onDelete, onEdit, onNotePressed, notesListRef, displaydFolder, displaydNotes,  } = props

    const notesData = useSelector(selectedAllNotes)

    return (
        <React.Fragment>
            <div id={Styles.notesListWrapper}>
                <h3 id={Styles.FolderName}>{displaydFolder}:</h3>
                    <ul ref={notesListRef} id={Styles.notesList}>
                    {(displaydNotes != undefined ? displaydNotes : notesData).map(note =>
                        <NotesListNote
                            key={note.id}
                            note={note}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onNotePressed={onNotePressed}
                        />
                    )}
                </ul>
            </div>
        </React.Fragment>
    );
}

export default NotesList;