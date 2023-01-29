import React, { useEffect, useState, useRef } from 'react';
import Styles from '../scss/styles.module.scss'
import { BsSave } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editNote } from '../slices/notesSlice';
import { displaydNote } from '../slices/displaydNoteSlice';

function NoteTextArea(props) {
    const { onSave } = props;
    const [lastModifiedState, setLastModifiedState] = useState()
    const [textareaValue, setTextareaValue] = useState()
    const textAreaRef = useRef()
    const dispatch = useDispatch()
    const displaydNoteData = useSelector(displaydNote)

    function onTextChange(event) {
        dispatch(editNote({ noteId: displaydNoteData.id, value: event.target.value}))
        setTextareaValue(event.target.value)
    }

    useEffect(() => {
        setLastModifiedState(displaydNoteData.lastModified)
    }, [displaydNoteData.id]);

    useEffect(() => {
        textAreaRef.current.focus()
        setTextareaValue(displaydNoteData.text)
    }, [displaydNoteData]);

    return (
        <React.Fragment>
            <form onSubmit={onSave} id={Styles.formContainer}>
                <div id={Styles.formDatailsContainer}>
                    <div id={Styles.lastModifiedContainer}>
                        <i id={Styles.lastModifiedTitle}>Last Modified:</i>
                        <p id={Styles.lastModifiedDetails}>{lastModifiedState}</p>
                    </div>
                    <Link to='/'>
                        <button type="submit">Save <BsSave /></button>
                    </Link>
                </div>

                <textarea ref={textAreaRef} value={textareaValue} onChange={(event) => onTextChange(event)} rows="20" cols="100" placeholder='Write Something...' />
            </form>
        </React.Fragment>
    );
}

export default NoteTextArea;