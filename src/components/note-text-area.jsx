import React, { useEffect, useRef } from 'react';

function NoteTextArea(props) {
    const textArea = useRef()

    const { onSave, onChange, newNote, displaydNote, mode } = props;


    useEffect(() => {
        mode === 'writeNoteMode' && textArea.current.focus()
    }, [displaydNote]);


    return (
        <React.Fragment>
            <form onSubmit={onSave}>
                <label>
                    <textarea ref={textArea} value={newNote.text} onChange={onChange} />
                </label>
                {/* <button type="button" onClick={props.onSave}>Save</button> */}
                <button type="submit">Save</button>
            </form>
        </React.Fragment>
    );
}

export default NoteTextArea;