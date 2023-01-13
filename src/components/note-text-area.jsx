import React, { useEffect, useRef } from 'react';
import { CiSaveDown2 } from 'react-icons/ci'

function NoteTextArea(props) {

    const { onSave, onChange, newNote, displaydNote, mode, textAreaRef } = props;

    const lastModifiedConst = useRef(newNote.lastModified)

    useEffect(() => {
        console.log(newNote.lastModified);
    }, []);


    return (
        <React.Fragment>
            <form onSubmit={onSave} id="form-container">
                <div id="form-datails-container">
                    <div id="last-modified-container">
                        <i id='last-modified-title'>Last Modified:</i>
                        <p id='last-modified-details'>{lastModifiedConst.current}</p>
                    </div>
                    <button type="submit">Save </button>
                </div>

                <textarea ref={textAreaRef} value={newNote.text} onChange={onChange} rows="20" cols="100" placeholder='Write Something...'/>
            </form>
        </React.Fragment>
    );
}

export default NoteTextArea;