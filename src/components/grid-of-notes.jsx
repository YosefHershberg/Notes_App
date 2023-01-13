import React from 'react';
import NoteBox from './note-box';

function GridOfNotes(props) {
    const { onDelete, onEdit, notes } = props


    return (
        <React.Fragment>
            <div id="grid-of-notes">
                <div className="text-box-container">
                    {notes.map(note => <NoteBox note={note} key={note.id} onEdit={onEdit} onDelete={onDelete} />)}
                </div>
            </div>
        </React.Fragment>
    );
}

export default GridOfNotes;