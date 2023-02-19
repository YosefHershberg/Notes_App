import React, { useState, useEffect, useRef, useContext } from 'react';
import Styles from '../scss/styles.module.scss'
import { AppContext } from '../../App';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

function NotesListNote(props) {
    const { note, onDelete } = props;
    const { onEdit } = useContext(AppContext)
    const [notesListNoteClassName, setNotesListNoteClassName] = useState(Styles.notesListNoteFadein)
    const noteListNoteRef = useRef()

    function handleDeleteBtnClicked(e) {
        e.stopPropagation();
        setNotesListNoteClassName(Styles.notesListNoteFadeOut)
        onDelete(note, noteListNoteRef.current);
    }

    return (
        <React.Fragment>
            <li
                ref={noteListNoteRef}
                className={notesListNoteClassName}
                onClick={() => onEdit(note.id)}
            >
                <div className={Styles.lastModified}><i>{note.lastModified}</i></div>

                <p className={Styles.noteListText}>{note.text}</p>

                <div className={Styles.editDeleteIcons}>
                    <button className={Styles.editBtn} onClick={() => onEdit(note.id)}>Edit <AiFillEdit className={Styles.icon} /></button>
                    <button className={Styles.deleteBtn} onClick={(e) => handleDeleteBtnClicked(e)} >Delete <AiFillDelete className={Styles.icon} /></button>
                </div>
            </li>
        </React.Fragment>
    );
}

export default NotesListNote;