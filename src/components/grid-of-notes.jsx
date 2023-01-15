import React, { useState, useEffect, useRef } from 'react';
import NoteBox from './note-box';
import Styles from '../scss/styles.module.scss'

function GridOfNotes(props) {
    const { onDelete, onEdit, notes } = props

    return (
        <React.Fragment>
            <div id={Styles.gridOfNotes}>
                <div className={Styles.textBoxContainer}>
                    {notes.map(note => <NoteBox note={note} key={note.id} onEdit={onEdit} onDelete={onDelete} />)}
                </div>
            </div>
        </React.Fragment>
    );
}

export default GridOfNotes;