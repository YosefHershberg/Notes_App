import React from 'react';

function NoteBox(props) {
    const { note, onEdit, onDelete } = props;

    return (
        <React.Fragment>
            <div className="text-box">
                <div className='note-text' id={note.id} onClick={onEdit}>
                    {note.text}
                </div>
                <div className="delete-btn-container">
                    <i className="fa-solid fa-trash" style={{ color: 'rgb(219, 62, 62)' }} id={note.id} onClick={onDelete}></i>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NoteBox;