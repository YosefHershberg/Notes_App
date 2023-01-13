import "./scss/style.css";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "./components/nav-bar";
import Main from "./components/main";

function App() {
  let data = JSON.parse(window.localStorage.getItem('NOTES_DATA'))
  let incrementData = JSON.parse(window.localStorage.getItem('INCREMENT_DATA'))

  // data = []
  // incrementData = 0

  //STATE AND REF
  //--------------------------------------------
  const [notes, setNotes] = useState(data ? data : []);
  const [displaydNote, setDisplaydNote] = useState({});
  const [mode, setMode] = useState()
  const [incrememt, setIncrememt] = useState(incrementData ? incrementData : 0)
  const noNotesHidden = useRef();
  const notesListRef = useRef();
  const textAreaRef = useRef()

  //FUNCTIONS -----------------------------------
  function createNewNote() {
    const newNote = {
      id: getRandomString(),
      // id: Date.now(), //This would also work
      text: "",
      lastModified: timeStamp()
    };

    setNotes([...notes, newNote]);
    setIncrememt(prev => prev + 1)

    if (mode === 'noNotesMode') {
      noNotesHidden.current.classList.add('hidden')
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
      lastModified: timeStamp()
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
    displaydNote == notes[notes.findIndex(note => note.id === id)] && setMode("showNotesMode");
  }

  function handleOnEdit(id) {
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
      setMode('noNotesMode')
      setIncrememt(0)
    }
  }, [notes]);

  useEffect(() => {
    window.localStorage.setItem('INCREMENT_DATA', JSON.stringify(incrememt))
    setDisplaydNote(notes[notes.length - 1])

    mode === 'writeNoteMode' && (notesListRef.current.scrollTop = notesListRef.current.lastChild.offsetTop);
  }, [incrememt]);

  useEffect(() => {
    mode != 'writeNoteMode' && setDisplaydNote({})
  }, [mode]);

  return (
    <React.Fragment>
      <div id="background">
        <div id="app">
          <NavBar onNewNote={createNewNote} onShowNotes={handleShowNotes} onSearch={handleSearch} />
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
            noNotesHidden={noNotesHidden}
            notesListRef={notesListRef}
            textAreaRef={textAreaRef}
          />
        </div>
      </div>

    </React.Fragment>
  );
}

export default App;
