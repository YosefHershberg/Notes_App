import React from 'react';
import NotesListNote from './notes-list-note';

function NotesList(props) {
    const { onDelete, onEdit, onNotePressed } = props

    return (
        <React.Fragment>
            <div id="notes-list">
                {props.notes.map(note =>
                    <NotesListNote
                        key={note.id}
                        note={note}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onNotePressed={onNotePressed}
                    />
                )}
            </div>
        </React.Fragment>
    );
}

export default NotesList;