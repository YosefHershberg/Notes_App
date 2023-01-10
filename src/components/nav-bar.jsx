import React from 'react';

function NavBar(props) {
    const {onNewNote, onShowNotes, onSearch} = props

    return (
        <React.Fragment>
            <div id="navbar">
                <a href="" id="logo">
                    <h3 id='brand-name' >My Notes App</h3>
                </a>
                <button id='new-note-btn' className='nav-btn' onClick={onNewNote}>Create New Note</button>
                <button id='my-notes-btn' className='nav-btn' onClick={onShowNotes}>My Notes</button>
                <button id='search-btn' className='nav-btn' onClick={onSearch}>Search</button>
            </div>
        </React.Fragment>
    )
}

export default NavBar;