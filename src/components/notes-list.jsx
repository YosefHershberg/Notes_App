import React, { useState, useEffect, useRef } from 'react';
import NotesListNote from './notes-list-note';
import Styles from '../scss/styles.module.scss'

function NotesList(props) {
    const { onDelete, onEdit, onNotePressed, notesListRef } = props    

    return (
        <React.Fragment>
            <ul ref={notesListRef} id={Styles.notesList}>
                {props.notes.map(note =>
                    <NotesListNote
                        key={note.id}
                        note={note}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onNotePressed={onNotePressed}
                    />
                )}
            </ul>
        </React.Fragment>
    );
}

export default NotesList;