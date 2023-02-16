import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import Styles from "../scss/styles.module.scss"
import { BiNotepad } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiNote } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function NavBar(props) {
    const { lightColorMode, onChangeColorMode } = props
    const { onNewNote } = useContext(AppContext)

    return (
        <React.Fragment>
            <div id={Styles.navbar}>
                <div className={Styles.leftContainer}>
                    <a href="" id={Styles.logo}>
                        <h3 id='brand-name' >My Notes App</h3>
                    </a>
                    <Link to='/workSpace'>
                        <button id='new-note-btn' className={Styles.navBtn} onClick={onNewNote}>Create New Note <BiNote /></button>
                    </Link>
                    <Link to='/'>
                        <button id='my-notes-btn' className={Styles.navBtn}>My Notes <BiNotepad /></button>
                    </Link>
                    <Link to='/search'>
                        <button id='search-btn' className={Styles.navBtn}>Search <AiOutlineSearch /></button>
                    </Link>
                </div>

                <div className={Styles.leftContainer}>
                    <div className={Styles.rightContainer}>
                        <span className={Styles.colorModeOption}>light</span>
                        <label className={Styles.switch}>
                            <input type="checkbox" checked={!lightColorMode} onChange={onChangeColorMode} />
                            <span className={`${Styles.slider} ${Styles.round}`}></span>
                        </label>
                        <span className={Styles.colorModeOption}>dark</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NavBar;