import React, { useState, useEffect } from 'react';
import NoteTextArea from './note-text-area'
import NotesList from './notes-list';

function WorkSpace(props) {
    const { notes, onEdit, onDelete, displaydNote, onChange, onSave, incrememt, mode } = props

    return (
        <React.Fragment>
            <div id="work-space">
                <NotesList
                    notes={notes}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    incrememt={incrememt}
                />
                <NoteTextArea
                    newNote={displaydNote}
                    onChange={onChange}
                    onSave={onSave}
                    displaydNote={displaydNote}
                    mode={mode}
                />
            </div>
        </React.Fragment>
    );
}

export default WorkSpace;