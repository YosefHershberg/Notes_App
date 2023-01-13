import React, { useEffect, useState, useRef } from 'react';
import { BsSave } from 'react-icons/bs'

function NoteTextArea(props) {

    const { onSave, onChange, newNote, displaydNote, mode, textAreaRef } = props;

    const [lastModifiedState, setLastModifiedState] = useState()

    useEffect(() => {
        setLastModifiedState(newNote.lastModified)
    }, [displaydNote.id]);

    return (
        <React.Fragment>
            <form onSubmit={onSave} id="form-container">
                <div id="form-datails-container">
                    <div id="last-modified-container">
                        <i id='last-modified-title'>Last Modified:</i>
                        <p id='last-modified-details'>{lastModifiedState}</p>
                    </div>
                    <button type="submit">Save <BsSave /></button>
                </div>

                <textarea ref={textAreaRef} value={newNote.text} onChange={onChange} rows="20" cols="100" placeholder='Write Something...'/>
            </form>
        </React.Fragment>
    );
}

export default NoteTextArea;