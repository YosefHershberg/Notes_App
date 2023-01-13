import React, { useState, useEffect, useRef } from 'react';
import NoteTextArea from './note-text-area'
import NotesList from './notes-list';

function WorkSpace(props) {
    const textArea = useRef()

    const { notes, onEdit, onDelete, displaydNote, onChange, onSave, incrememt, mode } = props

    useEffect(() => {
        mode === 'writeNoteMode' && textArea.current.focus()
    }, [displaydNote]);

    function handleNotePressed(event) {
        console.log(event.target.id);
    }

    return (
        <React.Fragment>
            <div id="work-space">
                <NotesList
                    notes={notes}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    incrememt={incrememt}
                    onNotePressed={handleNotePressed}
                />
                <NoteTextArea
                    newNote={displaydNote}
                    onChange={onChange}
                    onSave={onSave}
                    displaydNote={displaydNote}
                    mode={mode}
                    textArea={textArea}
                />
            </div>
        </React.Fragment>
    );
}

export default WorkSpace;