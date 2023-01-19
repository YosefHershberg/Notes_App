import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FolderOption from './folder-option';
import NoteBox from './note-box';
import NoNotesYet from './no-notses-yet';
import Styles from '../scss/styles.module.scss'

function MyNotes(props) {
    let folderNamesData = JSON.parse(window.localStorage.getItem('FOLDER_NAME_DATA'))
    // window.localStorage.setItem('FOLDER_NAME_DATA', JSON.stringify([]))

    const { onDelete, onEdit, notes, displaydFolder, onChangeFolder, displaydNotes, onNewNote } = props

    const [folderNamesArr, setFolderNamesArr] = useState(folderNamesData ? folderNamesData : [])
    const [writeNameMode, setWriteNameMode] = useState(false)
    const [folderInputValue, setFolderInputValue] = useState()
    const notesListRef = useRef()

    function handleAddNewFolder() {
        if (!writeNameMode) {
            setWriteNameMode(true)
            setFolderNamesArr([...folderNamesArr, ''])
        }
    }

    function handleSaveFolder() {
        setWriteNameMode(false)
        let tempFolderNamesArr = folderNamesArr;
        tempFolderNamesArr[tempFolderNamesArr.length - 1] = folderInputValue
        window.localStorage.setItem('FOLDER_NAME_DATA', JSON.stringify(tempFolderNamesArr))
        setFolderNamesArr(tempFolderNamesArr)
    }

    function handleNameInputChange(name) {
        notesListRef.current.scrollTop = notesListRef.current.lastChild.offsetTop
        setFolderInputValue(name)
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSaveFolder();
            setFolderInputValue('')
        }
    }

    function handleDeleteFolder(folderName) {
        notes.filter(note => note.folder === folderName).forEach(note => note.folder = 'All Notes')
        //^^^^^^moving all the notes in deleted folder to All Notes
        setFolderNamesArr(folderNamesArr.filter(name => name != folderName))
        props.onChangeFolder('All Notes')
    }

    useEffect(() => {
        notesListRef.current.scrollTop = notesListRef.current.lastChild.offsetTop
        window.localStorage.setItem('FOLDER_NAME_DATA', JSON.stringify(folderNamesArr))
    }, [folderNamesArr]);

    return (
        <React.Fragment>
            <div id={Styles.myNotes}>
                <div id={Styles.leftContainer}>
                    <div id={Styles.foldersContainer}>
                        <h3 id={Styles.foldersHeader}>Folders</h3>
                        <div id={Styles.foldersListWrapper}>

                            <div ref={notesListRef} id={Styles.foldersList}>
                                <div className={Styles.folderOption} onClick={() => onChangeFolder('All Notes')}><span>All Notes</span></div>
                                {folderNamesArr.map(folderName => (
                                    <FolderOption
                                        key={uuidv4()}
                                        folderOption={folderName}
                                        onNameInputChange={handleNameInputChange}
                                        folderInputValue={folderInputValue}
                                        onKeyDown={handleKeyDown}
                                        onChangeFolder={onChangeFolder}
                                        onSaveFolderName={handleSaveFolder}
                                        onDeleteFolder={handleDeleteFolder}
                                    />))}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleAddNewFolder} id={Styles.addFolderBtn}><span>Add New Folder</span></button>
                </div>

                <div id={Styles.gridOfNotes}>
                    {displaydNotes.length === 0 ?
                        <NoNotesYet
                            onNewNote={onNewNote}
                        />
                        : (<div className={Styles.textBoxContainer}>
                            {displaydNotes.map(note => (
                                <NoteBox
                                    note={note}
                                    key={note.id}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>)}
                </div>
            </div>
        </React.Fragment>
    );
}

export default MyNotes;