import React, { useState, useEffect, useRef } from 'react';
import Styles from '../scss/styles.module.scss'
import NoteTextArea from './note-text-area'
import NotesList from './notes-list';

function WorkSpace(props) {

    const { notes, onEdit, onDelete, displaydNote, onChange, onSave, incrememt, mode, notesListRef, textAreaRef} = props

    function handleNotePressed(event) {
        console.log(event.target.id);
    }

    return (
        <React.Fragment>
            <div id={Styles.workSpace}>
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