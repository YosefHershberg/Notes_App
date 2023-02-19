import React, { useState, useEffect, useRef, useCallback, createContext } from "react";
import Styles from "./features/scss/styles.module.scss"
import NavBar from "./features/components/nav-bar";
import Main from "./features/components/main";
import modeColors from "./modeColors";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addNote, selectedAllNotes } from './features/slices/notesSlice'
import { setDisplaydNote } from "./features/slices/displaydNoteSlice";
import { displaydFolderData, setDisplaydFolder } from './features/slices/displaydFolderSlice'

export const AppContext = createContext();

function App() {
  let colorModeData = JSON.parse(window.localStorage.getItem('COLOR_MODE_DATA'))

  //STATE etc. -----------------------------
  const [incrememt, setIncrememt] = useState(0)
  const [lightColorMode, setLightColorMode] = useState(colorModeData)
  const [scrollTriger, setScrollTriger] = useState(true)
  const notesListRef = useRef();

  //ROUTING -----------------------------------
  const navigate = useNavigate();
  const navToAllNotes = useCallback(() => navigate('/', { replace: true }), [navigate]);
  const navToWorkSpace = useCallback(() => navigate('/workSpace', { replace: true }), [navigate]);
  const navToNoNotesYet = useCallback(() => navigate('/noNotesYet', { replace: true }), [navigate]);

  //REDUXING ----------------------------------
  const dispatch = useDispatch()
  const allNotes = useSelector(selectedAllNotes)
  const displaydFolder = useSelector(displaydFolderData)

  //FUNCTIONS -----------------------------------
  function createNewNote() {
    dispatch(addNote(displaydFolder))
    setIncrememt(prev => prev + 1)
  }

  function handleOnEdit(id) {
    const theNote = allNotes.find(note => note.id === id)
    displaydFolder != 'All Notes' && dispatch(setDisplaydFolder(theNote.folder))
    //^^^ this is for when the note was selected from the search
    dispatch(setDisplaydNote(theNote))
    navToWorkSpace()
  }

  function handleChangeColorMode() {
    setLightColorMode(prev => !prev)
  }

  //HOOKS
  //----------------------

  useEffect(() => {
    window.localStorage.setItem('ALL_NOTES', JSON.stringify(allNotes))

    if (allNotes.length === 0) {
      navToNoNotesYet()
      setIncrememt(0)
      dispatch(setDisplaydFolder('All Notes'))
    }
  }, [allNotes]);

  useEffect(() => {
    dispatch(setDisplaydNote(allNotes[allNotes.length - 1]))
    setScrollTriger(prev => !prev)
  }, [incrememt]);

  useEffect(() => { // This becuase I want to the scroll to go down AFTER displayedNote is updated
    if (allNotes.filter(note => note.folder === displaydFolder).length > 1) { //checks if there is at least 1 in the notes list
      //^^^^this is because notesListRef cant hold notes list bacause it doesnt exist yet
      notesListRef.current && (notesListRef.current.scrollTop = notesListRef.current.lastChild?.offsetTop);
    }
  }, [scrollTriger]);

  useEffect(() => {
    window.localStorage.setItem('COLOR_MODE_DATA', JSON.stringify(lightColorMode))
  }, [lightColorMode]);

  useEffect(() => {
    navToAllNotes()
  }, []);

  return (
    <React.Fragment>
      <AppContext.Provider value={{ onEdit: handleOnEdit, onNewNote: createNewNote }}>
        <div id={Styles.background}>
          <div id={Styles.app} style={lightColorMode ? modeColors.lightModeColors : modeColors.darkModeColors}>
            <NavBar
              onChangeColorMode={handleChangeColorMode}
              lightColorMode={lightColorMode}
            />
            <Main
              navToAllNotes={navToAllNotes}
              notesListRef={notesListRef}
            />
          </div>
        </div>
      </AppContext.Provider>

    </React.Fragment>
  );
}

export default App;
