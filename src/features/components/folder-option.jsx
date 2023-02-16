import React, { useState, useEffect, useRef } from 'react';
import Styles from "../scss/styles.module.scss"
import { setDisplaydFolder } from '../slices/displaydFolderSlice'
import { useDispatch } from 'react-redux';
import { AiFillDelete, AiFillEdit } from'react-icons/ai'

function FolderOption(props) {
    const { onChangeFolderName,folderOption, onNameInputChange, onSaveFolderName, folderInputValue, onKeyDown, onDeleteFolder } = props;
    const dispatch = useDispatch()
    const inputRef = useRef()

    useEffect(() => {
        folderOption === '' && inputRef.current.focus()
    }, []);

    return (
        <React.Fragment>
            {folderOption === '' ?
                <div className={Styles.FolderNameForm}>
                    <input ref={inputRef}
                        type="text"
                        name='folerNameInput'
                        value={folderInputValue}
                        onChange={(event) => onNameInputChange(event.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder='Enter folder name...'
                    />
                    <button onClick={() => onSaveFolderName()}>Save</button>
                </div>
                : <div className={Styles.folderOption}>
                    <span onClick={() => dispatch(setDisplaydFolder(folderOption))}>{folderOption}</span>
                    <button className={Styles.editBtn} onClick={() => onChangeFolderName(folderOption)}>
                        <AiFillEdit className={Styles.icon}/> 
                    </button>
                    <button className={Styles.deleteBtn} onClick={() => onDeleteFolder(folderOption)}>
                        <AiFillDelete className={Styles.icon}/>
                    </button>
                </div>
            }
        </React.Fragment>
    );
}

export default FolderOption;