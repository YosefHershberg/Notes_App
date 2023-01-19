import Styles from "./scss/styles.module.scss"
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "./components/nav-bar";
import Main from "./components/main";
import {useNavigate} from 'react-router-dom';


function App() {
    let notesData = JSON.parse(window.localStorage.getItem('NOTES_DATA'))
    let incrementData = JSON.parse(window.localStorage.getItem('INCREMENT_DATA'))
    let colorModeData = JSON.parse(window.localStorage.getItem('COLOR_MODE_DATA'))

    // notesData = []
    // incrementData = 0
    // colorModeData = true

    //STATE AND REF AND HISTORY
    //--------------------------------------------
    const [notes, setNotes] = useState(notesData ? notesData : []);
    const [displaydNote, setDisplaydNote] = useState({});
    const [mode, setMode] = useState()
    const [incrememt, setIncrememt] = useState(incrementData ? incrementData : 0)
    const [lightColorMode, setLightColorMode] = useState(colorModeData)
    const [displaydFolder, setDisplaydFolder] = useState('All Notes')
    const [colors, setColors] = useState({
      lightModeColors: {
        '--textColor': 'black',
        '--backgroundColor': 'white',
        '--navbarBackgroundColor': 'white',
        '--noteBackgroundColor': 'rgb(239, 239, 239)',
        '--lastModifiedColor': 'rgb(126, 126, 126)',
        '--noteListTextColor': 'rgb(94, 93, 93)',
        '--noteButtonBackgroundColor': 'rgb(209, 209, 209)',
        '--noNotesYetButtonBackgroundColor': 'rgb(101, 164, 219)',
        '--searchBoxBackgroundColor': 'rgb(219, 219, 219)',
        '--textAreaCurser': 'auto',
      },
      darkModeColors: {
        '--textColor': 'white',
        '--backgroundColor': '#525252',
        '--navbarBackgroundColor': '#414141',
        '--noteBackgroundColor': 'rgb(125, 125, 125)',
        '--lastModifiedColor': 'rgb(200, 200, 200)',
        '--noteListTextColor': 'rgb(230, 230, 230)',
        '--noteButtonBackgroundColor': 'rgb(209, 209, 209)',
        '--noNotesYetButtonBackgroundColor': 'rgb(101, 164, 219)',
        '--searchBoxBackgroundColor': 'rgb(100, 100, 100)',
        // '--textAreaCurser': './assets/WhiteTextSelect.cur', // Why isnt this working 
      }
    })

    const notesListRef = useRef();
    const textAreaRef = useRef();
    const navigate = useNavigate();
    const routeToNoNotes = useCallback(() => navigate('/noNotesYet', {replace: true}), [navigate])
    const routeToWorkSpace = useCallback(() => navigate('/workSpace', {replace: true}), [navigate])

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

    function handleOnSave(event) {
      event.preventDefault();
      setMode("showNotesMode")
    }

    function handleOnDelete(id) {
      setNotes(notes.filter(note => note.id != id))
      displaydNote == notes[notes.findIndex(note => note.id === id)] && setDisplaydNote(notes[0]);
      notes.length === 1 && routeToNoNotes()
    }

    function handleOnEdit(id) {
      routeToWorkSpace();
      mode != 'noNotesMode' && setDisplaydNote(notes[notes.findIndex(note => note.id === id)])
      setMode('writeNoteMode');
      mode === 'writeNoteMode' && textAreaRef.current.focus()
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

      if (notes.filter(note => note.folder === displaydFolder).length > 1) { //checks if theere is at least 1 in the notes list
        //^^^^this is because notesListRef cant hold notes list bacause it doesnt exist yet
        mode === 'writeNoteMode' && (notesListRef.current.scrollTop = notesListRef.current.lastChild.offsetTop);
      }
    }, [displaydNote]);

    useEffect(() => {
      window.localStorage.setItem('NOTES_DATA', JSON.stringify(notes))

      mode === undefined && setMode('showNotesMode')

      if (notes.length === 0 && mode != 'searchMode') {
        setMode('noNotesMode')
        setIncrememt(0)
      }
    }, [notes]);

    useEffect(() => {
      window.localStorage.setItem('INCREMENT_DATA', JSON.stringify(incrememt))
      setDisplaydNote(notes[notes.length - 1])
      mode === 'writeNoteMode' && textAreaRef.current.focus()
    }, [incrememt]);

    useEffect(() => {
      mode != 'writeNoteMode' ? setDisplaydNote({}) : textAreaRef.current.focus()
    }, [mode]);

    useEffect(() => {
      window.localStorage.setItem('COLOR_MODE_DATA', JSON.stringify(lightColorMode))
    }, [lightColorMode]);

    return (
      <React.Fragment>
        <div id={Styles.background}>
          <div id={Styles.app} style={lightColorMode ? colors.lightModeColors : colors.darkModeColors}>
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
              onSave={handleOnSave}
              onDelete={handleOnDelete}
              onEdit={handleOnEdit}
              onNewNote={createNewNote}
              incrememt={incrememt}
              notesListRef={notesListRef}
              textAreaRef={textAreaRef}
              displaydFolder={displaydFolder}
              onChangeFolder={handleChangeFolder}
            />
          </div>
        </div>

      </React.Fragment>
    );
  }

export default App;
