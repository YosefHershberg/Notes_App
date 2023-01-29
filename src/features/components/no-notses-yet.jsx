import React, { useCallback, useState, useEffect, useRef } from 'react';
import Styles from '../scss/styles.module.scss'
import { Link, useNavigate } from 'react-router-dom'

function NoNotesYet(props) {
    const [noNotesclassName, setNoNotesclassName] = useState(Styles.noNotesYet)
    const navigate = useNavigate();
    const routeToWorkSpace = useCallback(() => navigate('/workSpace', { replace: true }), [navigate])
  

    function handleBtnClicked() {
        setNoNotesclassName(Styles.noNotesYetHidden)
        setTimeout(function () {
            routeToWorkSpace()
            props.onNewNote()
        }, 500);

    }

    return (
        <React.Fragment>
            <div className={noNotesclassName}>
                <h1 id={Styles.noNotesHeader}>You have no notes...</h1>
                {/* <Link to='/workSpace'> */}
                <button onClick={handleBtnClicked} id='init-note-btn'>Create new note !</button>
                {/* </Link> */}
            </div>
        </React.Fragment>
    );
}

export default NoNotesYet;