import React, { useState, useEffect, useRef, useContext } from 'react';
import Styles from '../scss/styles.module.scss'
import { AppContext } from '../../App';

function NotesListNote(props) {
    const { note, onDelete } = props;
    const { onEdit } = useContext(AppContext)
    const [notesListNoteClassName, setNotesListNoteClassName] = useState(Styles.notesListNoteFadein)
    const noteListNoteRef = useRef()

    function handleDeleteBtnClicked() {
        setNotesListNoteClassName(Styles.notesListNoteFadeOut)
        onDelete(note, noteListNoteRef.current);
    }

    return (
        <React.Fragment>
            <li ref={noteListNoteRef} className={notesListNoteClassName}>
                <div className={Styles.lastModified}><i>{note.lastModified}</i></div>

                <p className={Styles.noteListText} onClick={() => onEdit(note.id)}>{note.text}</p>

                <div className={Styles.editDeleteIcons}>
                    <button className={Styles.editBtn} onClick={() => onEdit(note.id)}>Edit <i className="fa-solid fa-pen-to-square"></i></button>
                    <button className={Styles.deleteBtn} onClick={handleDeleteBtnClicked} >Delete <i className="fa-solid fa-trash"></i></button>
                </div>
            </li>
        </React.Fragment>
    );
}

export default NotesListNote;