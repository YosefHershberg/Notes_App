import React, { useState, useEffect, useRef } from 'react';


function NotesListNote(props) {
    const { note, onEdit, onDelete } = props;
    const noteListNoteJSX = useRef()


    // useEffect(() => {
    //     console.log(props);
    // }, [];

    function handleDeleteNadFade() {
        noteListNoteJSX.current.classList.add('fade-out')

        setTimeout(() => {
            onDelete(note.id)
        }, 250);
    }

    return (
        <React.Fragment>
            <div ref={noteListNoteJSX} className='notes-list-note'>
                <div className="last-modified"><i>{note.lastModified}</i></div>

                <p className='note-list-text' onClick={() => onEdit(note.id)}>{note.text}</p>

                <div className="edit-delete-icons">
                    <button className='edit-btn' onClick={() => onEdit(note.id)}>Edit<i className="fa-solid fa-pen-to-square"></i></button>
                    <button className='delete-btn' onClick={handleDeleteNadFade} >Delete<i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NotesListNote;