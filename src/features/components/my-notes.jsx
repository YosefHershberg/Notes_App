import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FolderOption from './folder-option';
import NoteBox from './note-box';
import NoNotesYet from './no-notses-yet';
import Styles from '../scss/styles.module.scss'
import { useDispatch } from 'react-redux';
import { changeFolderToNewName } from '../slices/notesSlice';
import { setDisplaydFolder } from '../slices/displaydFolderSlice';

function MyNotes(props) {
    let folderNamesData = JSON.parse(window.localStorage.getItem('FOLDER_NAME_DATA'))

    const { onDelete, onChangeFolder, displaydNotes, } = props

    const [folderNamesArr, setFolderNamesArr] = useState(folderNamesData ? folderNamesData : [])
    const [writeNameMode, setWriteNameMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [oldName, setOldName] = useState()
    const [folderInputValue, setFolderInputValue] = useState()
    const [scrollTriger, setScrollTriger] = useState()
    const notesListRef = useRef()

    const dispatch = useDispatch()

    function handleAddNewFolder() {
        if (!writeNameMode) {
            setWriteNameMode(true)
            setFolderNamesArr([...folderNamesArr, ''])
        }
        notesListRef.current.scrollTop = notesListRef.current.lastChild.offsetTop
    }

    function handleSaveFolder() {
        let tempFolderNamesArr = folderNamesArr;

        if (editMode) {
            tempFolderNamesArr = folderNamesArr.map(folderName => {
                return folderName === '' ? folderInputValue : folderName
            })
            setEditMode(false)
            dispatch(changeFolderToNewName({ oldName: oldName, newName: folderInputValue }))
        } else {
            tempFolderNamesArr[tempFolderNamesArr.length - 1] = folderInputValue
            setScrollTriger(prev => !prev)
        }
        
        setFolderNamesArr(tempFolderNamesArr)
        window.localStorage.setItem('FOLDER_NAME_DATA', JSON.stringify(tempFolderNamesArr))
        setWriteNameMode(false)
        dispatch(setDisplaydFolder(folderInputValue))
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSaveFolder();
            setFolderInputValue('')
        }
    }

    function handleDeleteFolder(folderName) {
        dispatch(changeFolderToNewName({ oldName: folderName, newName: 'All Notes' }))
        //^^^^^^moving all the notes in deleted folder to All Notes
        setFolderNamesArr(folderNamesArr.filter(name => name != folderName))
        props.onChangeFolder('All Notes')
    }

    function handleChangeFolderName(oldNameArg) {
        if (!editMode) {
            setEditMode(true)
            setOldName(oldNameArg)
            setFolderNamesArr(folderNamesArr.map(folderName => {
                return folderName === oldNameArg ? '' : folderName
            }))
        }
    }

    useEffect(() => {
        notesListRef.current.scrollTop = notesListRef.current.lastChild.offsetTop
    }, [scrollTriger]);

    useEffect(() => {
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
                                        onNameInputChange={setFolderInputValue}
                                        folderInputValue={folderInputValue}
                                        onKeyDown={handleKeyDown}
                                        onChangeFolder={onChangeFolder}
                                        onSaveFolderName={handleSaveFolder}
                                        onDeleteFolder={handleDeleteFolder}
                                        writeNameMode={writeNameMode}
                                        setWriteNameMode={setWriteNameMode}
                                        onChangeFolderName={handleChangeFolderName}
                                    />))}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleAddNewFolder} id={Styles.addFolderBtn}><span>Add New Folder</span></button>
                </div>

                <div id={Styles.gridOfNotes}>
                    {displaydNotes.length === 0 ?
                        <NoNotesYet />
                        : (<div className={Styles.textBoxContainer}>
                            {displaydNotes.map(note => (
                                <NoteBox
                                    note={note}
                                    key={note.id}
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