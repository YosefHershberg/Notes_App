import React from 'react';
import {GrNotes} from 'react-icons/gr'
import {AiOutlineSearch} from 'react-icons/ai'
import { BiNote } from 'react-icons/bi'

function NavBar(props) {
    const {onNewNote, onShowNotes, onSearch} = props

    return (
        <React.Fragment>
            <div id="navbar">
                <a href="" id="logo">
                    <h3 id='brand-name' >My Notes App</h3>
                </a>
                <button id='new-note-btn' className='nav-btn' onClick={onNewNote}>Create New Note <BiNote /></button>
                <button id='my-notes-btn' className='nav-btn' onClick={onShowNotes}>My Notes  <GrNotes /></button>
                <button id='search-btn' className='nav-btn' onClick={onSearch}>Search <AiOutlineSearch /></button>
            </div>
        </React.Fragment>
    )
}

export default NavBar;