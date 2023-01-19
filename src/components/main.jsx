import React, { useState, useEffect } from 'react';
import Styles from "../scss/styles.module.scss"
import WorkSpace from './work-space';
import MyNotes from './my-notes';
import NoNotesYet from './no-notses-yet';
import Search from './search';

function Main(props) {
    const { mode, notes, displaydNote, onChange, onSave, onEdit, onDelete, incrememt, onNewNote, notesListRef, textAreaRef, noNotesHidden, displaydFolder, onChangeFolder } = props;
    const [displaydNotes, setDisplaydNotes] = useState([])

    function handleDeleteAndFade(note, element) {
        element.classList.add('fade-out')

        setTimeout(() => {
            onDelete(note.id)
        }, 250);
    }

    useEffect(() => {
        let tempDisplaydNotes = [];
        tempDisplaydNotes = (displaydFolder != 'All Notes' ?
            notes.filter(note => note.folder === displaydFolder)
            : notes)
        setDisplaydNotes(tempDisplaydNotes)
    }, [displaydFolder, notes]);

    return (
        <React.Fragment>
            <div id={Styles.main}>
                {mode === 'writeNoteMode' &&
                    <WorkSpace
                        mode={mode}
                        notes={notes}
                        displaydNote={displaydNote}
                        onChange={onChange}
                        onSave={onSave}
                        onEdit={onEdit}
                        onDelete={handleDeleteAndFade}
                        incrememt={incrememt}
                        notesListRef={notesListRef}
                        textAreaRef={textAreaRef}
                        displaydFolder={displaydFolder}
                        displaydNotes={displaydNotes}
                        onChangeFolder={onChangeFolder}
                    />
                }
                {mode === 'showNotesMode' &&
                    <MyNotes
                        onDelete={handleDeleteAndFade}
                        notes={notes}
                        onEdit={onEdit}
                        displaydFolder={displaydFolder}
                        onChangeFolder={onChangeFolder}
                        displaydNotes={displaydNotes}
                        onNewNote={onNewNote}
                    />
                }
                {mode === 'noNotesMode' &&
                    <NoNotesYet
                        onNewNote={onNewNote}
                    />
                }
                {mode === 'noNotesMode' &&
                    <WorkSpace
                        notes={notes}
                        displaydNote={displaydNote}
                        onChange={onChange}
                        onSave={onSave}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        incrememt={incrememt}
                        displaydFolder={displaydFolder}
                    />
                }
                {mode === 'searchMode' &&
                    <Search
                        notes={notes}
                        onEdit={onEdit}
                    />
                }
            </div>
        </React.Fragment>
    );
}

export default Main;