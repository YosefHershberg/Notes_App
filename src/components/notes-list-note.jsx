import React from 'react';

function NotesListNote(props) {

    const {note, onEdit, onDelete} = props;

    // useEffect(() => {
    //     console.log(props);
    // }, [);

    return (
        <React.Fragment>
            <div className="notes-list-note">
                <p className='note-list-text' id={note.id} onClick={onEdit}>{note.text}</p>

                <div className="edit-delete-icons">
                    <i className="fa-solid fa-pen-to-square" id={note.id} onClick={onEdit}></i>
                    <i className="fa-solid fa-trash" style={{ color: 'rgb(219, 62, 62)' }} id={note.id} onClick={onDelete}></i>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NotesListNote;