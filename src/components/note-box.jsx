import React from 'react';

function NoteBox(props) {
    const { note, onEdit, onDelete } = props;

    return (
        <React.Fragment>
            <div className="text-box">
                <div className='note-text' onClick={() => onEdit(note.id)}>
                    {note.text}
                </div>

                <div className="last-modified"><i>{note.lastModified}</i></div>

                <div className="delete-btn-container">
                    <button onClick={() => onDelete(note.id)} style={{ color: 'rgb(219, 62, 62)' }}>Delete <i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NoteBox;