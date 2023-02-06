import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FolderOption from './folder-option';
import NoteBox from './note-box';
import NoNotesYet from './no-notses-yet';
import Styles from '../scss/styles.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { selectedAllNotes, changeFolderToAllNotes } from '../slices/notesSlice';
import { setDisplaydFolder } from '../slices/displaydFolderSlice';

function MyNotes(props) {
    let folderNamesData = JSON.parse(window.localStorage.getItem('FOLDER_NAME_DATA'))
    //thing about how to set folderNamesArr algorithmecly the first time the component renders

    const { onDelete, onChangeFolder, displaydNotes, } = props
    
    const [folderNamesArr, setFolderNamesArr] = useState(folderNamesData ? folderNamesData : [])
    const [writeNameMode, setWriteNameMode] = useState(false)
    const [folderInputValue, setFolderInputValue] = useState()
    const [scrollTriger, setScrollTriger] = useState()
    const notesListRef = useRef()

    const allNotes = useSelector(selectedAllNotes)
    const dispatch = useDispatch()
  
    function handleAddNewFolder() {
        if (!writeNameMode) {
            setWriteNameMode(true)
            setFolderNamesArr([...folderNamesArr, ''])
        }
        notesListRef.current.scrollTop = notesListRef.current.lastChild.offsetTop
    }

    function handleSaveFolder() {
        setWriteNameMode(false)
        let tempFolderNamesArr = folderNamesArr;
        tempFolderNamesArr[tempFolderNamesArr.length - 1] = folderInputValue
        window.localStorage.setItem('FOLDER_NAME_DATA', JSON.stringify(tempFolderNamesArr))
        setFolderNamesArr(tempFolderNamesArr)
        dispatch(setDisplaydFolder(folderInputValue))
        setScrollTriger(prev => !prev)
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSaveFolder();
            setFolderInputValue('')
        }
    }

    function handleDeleteFolder(folderName) {
        dispatch(changeFolderToAllNotes(folderName))
        //^^^^^^moving all the notes in deleted folder to All Notes
        setFolderNamesArr(folderNamesArr.filter(name => name != folderName))
        props.onChangeFolder('All Notes')
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