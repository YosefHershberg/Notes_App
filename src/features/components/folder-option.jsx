import React, { useState, useEffect, useRef } from 'react';
import Styles from "../scss/styles.module.scss"

function FolderOption(props) {
    const { onChangeFolderName, onNameInputChange, onSaveFolderName, folderInputValue, onKeyDown, onChangeFolder, onDeleteFolder } = props;
    const [folderOption, setFolderOption] = useState(props.folderOption)
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
                    <span onClick={() => onChangeFolder(folderOption)}>{folderOption}</span>
                    <button className={Styles.editBtn} onClick={() => onChangeFolderName(folderOption)}>
                        <i className="fa-solid fa-pen-to-square"></i> 
                    </button>
                    <button className={Styles.deleteBtn} onClick={() => onDeleteFolder(folderOption)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            }
        </React.Fragment>
    );
}

export default FolderOption;