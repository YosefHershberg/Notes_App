import React, { useState, useEffect, useRef } from 'react';
import NoteTextArea from './note-text-area'
import NotesList from './notes-list';

function WorkSpace(props) {
    // const textAreaRef = useRef()

    const { notes, onEdit, onDelete, displaydNote, onChange, onSave, incrememt, mode, notesListRef, textAreaRef} = props

    // useEffect(() => {
    //     mode === 'writeNoteMode' && textAreaRef.current.focus()
    // }, [displaydNote]);

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
                    notesListRef={notesListRef}
                />
                <NoteTextArea
                    newNote={displaydNote}
                    onChange={onChange}
                    onSave={onSave}
                    displaydNote={displaydNote}
                    mode={mode}
                    textAreaRef={textAreaRef}
                />
            </div>
        </React.Fragment>
    );
}

export default WorkSpace;