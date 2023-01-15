import React, { useEffect, useState, useRef } from 'react';
import Styles from '../scss/styles.module.scss'
import { BsSave } from 'react-icons/bs'

function NoteTextArea(props) {

    const { onSave, onChange, newNote, displaydNote, mode, textAreaRef } = props;

    const [lastModifiedState, setLastModifiedState] = useState()

    useEffect(() => {
        setLastModifiedState(newNote.lastModified)
    }, [displaydNote.id]);

    return (
        <React.Fragment>
            <form onSubmit={onSave} id={Styles.formContainer}>
                <div id={Styles.formDatailsContainer}>
                    <div id={Styles.lastModifiedContainer}>
                        <i id={Styles.lastModifiedTitle}>Last Modified:</i>
                        <p id={Styles.lastModifiedDetails}>{lastModifiedState}</p>
                    </div>
                    <button type="submit">Save <BsSave /></button>
                </div>

                <textarea ref={textAreaRef} value={newNote.text} onChange={onChange} rows="20" cols="100" placeholder='Write Something...'/>
            </form>
        </React.Fragment>
    );
}

export default NoteTextArea;