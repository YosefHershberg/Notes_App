import React, { useState, useEffect, useRef, useContext } from 'react';
import Styles from '../scss/styles.module.scss'
import { AppContext } from '../../App';

function NoteBox(props) {
    const { note, onDelete } = props;
    const { onEdit } = useContext(AppContext)
    const [NoteBoxClassName, setTextBoxClassName] = useState(Styles.NoteBox)

    const noteBoxRef = useRef();

    function handleDeleteBtnClicked() {
        setTextBoxClassName(Styles.NoteBoxFadeOut)
        onDelete(note, noteBoxRef.current)
    }

    return (
        <React.Fragment>
            <div ref={noteBoxRef} className={NoteBoxClassName}>
                <div className={Styles.noteText} onClick={() => onEdit(note.id)}>
                    {note.text}
                </div>

                <div className={Styles.lastModified}><i>{note.lastModified}</i></div>

                <div className={Styles.deleteBtnContainer}>
                    <button className={Styles.deleteBtn} onClick={handleDeleteBtnClicked}>Delete <i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NoteBox;