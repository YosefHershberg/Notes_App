import React, { useState, useEffect, useRef } from 'react';
import Styles from '../scss/styles.module.scss'

function NoNotesYet(props) {
    const [noNotesclassName , setNoNotesclassName] = useState(Styles.noNotesYet)

    function handleBtnClicked() {
        setNoNotesclassName(Styles.noNotesYetHidden)
        props.onNewNote()
    }

    return (
        <React.Fragment>
            <div  className={noNotesclassName}>
                <h1 id={Styles.noNotesHeader}>You have no notes...</h1>
                <button onClick={handleBtnClicked} id='init-note-btn'>Create new note !</button>
            </div>
        </React.Fragment>
    );
}

export default NoNotesYet;