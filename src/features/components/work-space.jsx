import React, { useState, useEffect, useRef } from 'react';
import Styles from '../scss/styles.module.scss'
import NoteTextArea from './note-text-area'
import NotesList from './notes-list';

function WorkSpace(props) {

    const { onEdit, onDelete, notesListRef, displaydNotes, handleNotePressed } = props

    return (
        <React.Fragment>
            <div id={Styles.workSpace}>
                <NotesList
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onNotePressed={handleNotePressed}
                    notesListRef={notesListRef}
                    displaydNotes={displaydNotes}
                />
                <NoteTextArea />
            </div>
        </React.Fragment>
    );
}

export default WorkSpace;