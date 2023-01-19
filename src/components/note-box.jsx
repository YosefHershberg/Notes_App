import React, { useState, useEffect, useRef } from 'react';
import Styles from '../scss/styles.module.scss'
import { Link } from 'react-router-dom'

function NoteBox(props) {
    const { note, onEdit, onDelete } = props;
    const [textBoxClassName, setTextBoxClassName] = useState(Styles.textBox)

    const noteBoxRef = useRef();

    function handleDeleteBtnClicked() {
        setTextBoxClassName(Styles.textBoxFadeOut)
        onDelete(note, noteBoxRef.current)
    }

    return (
        <React.Fragment>
            <div ref={noteBoxRef} className={textBoxClassName}>
                <Link to='/workSpace'>
                    <div className={Styles.noteText} onClick={() => onEdit(note.id)}>
                        {note.text}
                    </div>
                </Link>
                
                <div className={Styles.lastModified}><i>{note.lastModified}</i></div>

                <div className={Styles.deleteBtnContainer}>
                    <button className={Styles.deleteBtn} onClick={handleDeleteBtnClicked}>Delete <i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NoteBox;