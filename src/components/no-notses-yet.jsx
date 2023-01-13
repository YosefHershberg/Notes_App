import React, { useState, useEffect, useRef } from 'react';

function NoNotesYet(props) {

    return (
        <React.Fragment>
            <div ref={props.noNotesHidden} className={`no-notes-yet `}>
                <h1>You have no notes...</h1>
                <button onClick={props.onNewNote} id='init-note-btn'>Create new note !</button>
            </div>
        </React.Fragment>
    );
}

export default NoNotesYet;