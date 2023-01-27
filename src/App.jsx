import Styles from "./scss/styles.module.scss"
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "./components/nav-bar";
import Main from "./components/main";
import { useNavigate } from 'react-router-dom';
import modeColors from "./modeColors";

function App() {
  let notesData = JSON.parse(window.localStorage.getItem('NOTES_DATA'))
  let colorModeData = JSON.parse(window.localStorage.getItem('COLOR_MODE_DATA'))

  // notesData = []
  // colorModeData = true

  //STATE etc.
  //--------------------------------------------
  const [notes, setNotes] = useState(notesData ? notesData : []);
  const [displaydNote, setDisplaydNote] = useState({});
  const [mode, setMode] = useState()
  const [incrememt, setIncrememt] = useState(0)
  const [lightColorMode, setLightColorMode] = useState(colorModeData)
  const [displaydFolder, setDisplaydFolder] = useState('All Notes')
  
  const notesListRef = useRef();
  const textAreaRef = useRef()

  const navigate = useNavigate();
  const navToWorkSpace = useCallback(() => navigate('/workSpace', { replace: true }), [navigate]);
  const navToAllNotes = useCallback(() => navigate('/', { replace: true }), [navigate]);
  const navToNoNotesYet = useCallback(() => navigate('/noNotesYet', { replace: true }), [navigate]);

  //FUNCTIONS -----------------------------------
  function createNewNote() {
    const newNote = {
      id: getRandomString(),
      // id: Date.now(), //This would also work
      text: "",
      lastModified: timeStamp(),
      folder: displaydFolder,
    };

    setNotes([...notes, newNote]);
    setDisplaydNote(newNote)
    setIncrememt(prev => prev + 1)

    if (mode === 'noNotesMode') {
      setTimeout(() => setMode('writeNoteMode'), 500);
    } else {
      setMode('writeNoteMode')
    }
  }

  function getRandomString() {
    let str = '';
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
      str += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    return str;
  }

  function handleChangeText(event) {
    setDisplaydNote({
      id: displaydNote.id,
      text: event.target.value,
      lastModified: timeStamp(),
      folder: displaydNote.folder
    });
  }

  function timeStamp() {
    return new Date(Date.now()).toLocaleString()
  }

  function handleOnDelete(id) {
    setNotes(notes.filter(note => note.id != id))
    displaydNote === notes[notes.findIndex(note => note.id === id)] && setDisplaydNote(notes[0]);
  }

  function handleOnEdit(id) {
    navToWorkSpace()
    mode != 'noNotesMode' && setDisplaydNote(notes[notes.findIndex(note => note.id === id)])
    setMode('writeNoteMode');
    // mode === 'writeNoteMode' && textAreaRef.current.focus()
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
    setNotes(notes.map(note => (note.id === displaydNote.id) ? displaydNote : note))
    mode === 'writeNoteMode' && textAreaRef.current.focus()
  }, [displaydNote]);

  useEffect(() => {
    window.localStorage.setItem('NOTES_DATA', JSON.stringify(notes))

    mode === undefined && setMode('showNotesMode')

    if (notes.length === 0 && mode != 'searchMode') {
      navToNoNotesYet()
      setMode('noNotesMode')
      setIncrememt(0)
    }
  }, [notes]);

  useEffect(() => { // This becuase I want to the scroll to go down AFTER displayedNote is updated
    if (notes.filter(note => note.folder === displaydFolder).length > 1) { //checks if theere is at least 1 in the notes list
      //^^^^this is because notesListRef cant hold notes list bacause it doesnt exist yet
      mode === 'writeNoteMode' && (notesListRef.current.scrollTop = notesListRef.current.lastChild.offsetTop);
    }
  }, [incrememt]);

  useEffect(() => {
    mode != 'writeNoteMode' && setDisplaydNote({})
  }, [mode]);

  useEffect(() => {
    window.localStorage.setItem('COLOR_MODE_DATA', JSON.stringify(lightColorMode))
  }, [lightColorMode]);

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
            mode={mode}
            displaydNote={displaydNote}
            notes={notes}
            onChange={handleChangeText}
            onDelete={handleOnDelete}
            onEdit={handleOnEdit}
            onNewNote={createNewNote}
            notesListRef={notesListRef}
            textAreaRef={textAreaRef}
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
