import React, { useState, useEffect, useRef } from 'react';
import NotesListNote from './notes-list-note';

function NotesList(props) {
    const { onDelete, onEdit, onNotePressed, notesListRef } = props    

    return (
        <React.Fragment>
            <ul ref={notesListRef} id="notes-list">
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