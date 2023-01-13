import React, { useEffect, useRef } from 'react';

function NoteTextArea(props) {

    const { onSave, onChange, newNote, displaydNote, mode, textArea } = props;


    return (
        <React.Fragment>
            <form onSubmit={onSave}>
                <label>
                    <div id="text-wrapper"><textarea ref={textArea} value={newNote.text} onChange={onChange} rows="20" cols="100"/></div>
                </label>
                {/* <button type="button" onClick={props.onSave}>Save</button> */}
                <button type="submit">Save</button>
            </form>
        </React.Fragment>
    );
}

export default NoteTextArea;