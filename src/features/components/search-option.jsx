import React, { useState, useEffect } from 'react';
import Styles from '../scss/styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setDisplaydFolder } from '../slices/displaydFolderSlice';
import { selectedAllNotes } from '../slices/notesSlice';

function SearchOption(props) {
    const { option, onEdit } = props
    const dispatch = useDispatch()
    const allNotes = useSelector(selectedAllNotes)

    function handleoptionClicked() {
        const theNote = allNotes.find(note => note.id === option.id)
        dispatch(setDisplaydFolder(theNote.folder))
        onEdit(option.id)
    }

    return (
        <React.Fragment>
            <div className={Styles.option} id={option.id} onClick={handleoptionClicked}>
                {option.text}
            </div>
        </React.Fragment>
    );
}

export default SearchOption;