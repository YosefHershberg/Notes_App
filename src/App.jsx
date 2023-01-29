import React, { useState, useEffect, useRef, useCallback } from "react";
import Styles from "./features/scss/styles.module.scss"
import NavBar from "./features/components/nav-bar";
import Main from "./features/components/main";
import modeColors from "./modeColors";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote, deleteNote, selectedAllNotes } from './features/slices/notesSlice'
import { setDisplaydNote } from "./features/slices/displaydNoteSlice";

function App() {

  let colorModeData = JSON.parse(window.localStorage.getItem('COLOR_MODE_DATA'))
  
  //STATE etc. -----------------------------
  const [mode, setMode] = useState()
  const [incrememt, setIncrememt] = useState(0)
  const [lightColorMode, setLightColorMode] = useState(colorModeData)
  const [displaydFolder, setDisplaydFolder] = useState('All Notes')
  const [scrollTriger , setScrollTriger] = useState(true)
  const notesListRef = useRef();

  //ROUTING -----------------------------------
  const navigate = useNavigate();
  const navToWorkSpace = useCallback(() => navigate('/workSpace', { replace: true }), [navigate]);
  const navToAllNotes = useCallback(() => navigate('/', { replace: true }), [navigate]);
  const navToNoNotesYet = useCallback(() => navigate('/noNotesYet', { replace: true }), [navigate]);
  
  //REDUXING ----------------------------------
  const dispatch = useDispatch()
  const notesData = useSelector(selectedAllNotes)
  
  //FUNCTIONS -----------------------------------
  function createNewNote() {
    dispatch(addNote(displaydFolder))
    setIncrememt(prev => prev + 1)

    if (mode === 'noNotesMode') {
      setTimeout(() => setMode('writeNoteMode'), 500);
    } else {
      setMode('writeNoteMode')
    }
  }

  function handleOnEdit(id) {
    navToWorkSpace()
    // mode != 'noNotesMode' && setDisplaydNote(notesData.find(note => note.id === id))
    mode != 'noNotesMode' && dispatch(setDisplaydNote(notesData.find(note => note.id === id)))
    setMode('writeNoteMode');
  }

  function handleShowNotes() {
    setMode("showNotesMode")
  }

  function handleSearch() {
    setMode('searchMode')
  }

  function handleChangeColorMode() {
    setLightColorMode(prev => !prev)
  }

  function handleChangeFolder(folderName) {
    setDisplaydFolder(folderName)
  }

  //HOOKS
  //----------------------
  useEffect(() => {
    window.localStorage.setItem('NOTES_DATA', JSON.stringify(notesData))

    mode === undefined && setMode('showNotesMode')

    if (notesData.length === 0 && mode != 'searchMode') {
      navToNoNotesYet()
      setMode('noNotesMode')
      setIncrememt(0)
    }

  }, [notesData]);

  useEffect(() => { 
    dispatch(setDisplaydNote(notesData[notesData.length - 1]))
    setScrollTriger(prev => !prev)
  }, [incrememt]);
  
  useEffect(() => { // This becuase I want to the scroll to go down AFTER displayedNote is updated
    if (notesData.filter(note => note.folder === displaydFolder).length > 1) { //checks if theere is at least 1 in the notes list
      //^^^^this is because notesListRef cant hold notes list bacause it doesnt exist yet
      mode === 'writeNoteMode' && (notesListRef.current.scrollTop = notesListRef.current.lastChild.offsetTop);
    }
  }, [scrollTriger]);

  useEffect(() => {
    mode != 'writeNoteMode' && dispatch(setDisplaydNote({}))
  }, [mode]);

  useEffect(() => {
    window.localStorage.setItem('COLOR_MODE_DATA', JSON.stringify(lightColorMode))
  }, [lightColorMode]);

  useEffect(() => {
    navToAllNotes()
  }, []);

  return (
    <React.Fragment>
      <div id={Styles.background}>
        <div id={Styles.app} style={lightColorMode ? modeColors.lightModeColors : modeColors.darkModeColors}>
          <NavBar
            onNewNote={createNewNote}
            onShowNotes={handleShowNotes}
            onSearch={handleSearch}
            onChangeColorMode={handleChangeColorMode}
            lightColorMode={lightColorMode}
          />
          <Main
            setDisplaydNote={setDisplaydNote}
            onEdit={handleOnEdit}
            onNewNote={createNewNote}
            notesListRef={notesListRef}
            displaydFolder={displaydFolder}
            setDisplaydFolder={setDisplaydFolder}
            onChangeFolder={handleChangeFolder}
          />
        </div>
      </div>

    </React.Fragment>
  );
}

export default App;
