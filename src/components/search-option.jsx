import React, { useState, useEffect } from 'react';
import Styles from '../scss/styles.module.scss'
import { Link } from 'react-router-dom'

function SearchOption(props) {

    return (
        <React.Fragment>
            <Link to='/workSpace'>
                <div className={Styles.option} id={props.option.id} onClick={() => props.onEdit(props.option.id)}>
                    {props.option.text}
                </div>
            </Link>
        </React.Fragment>
    );
}

export default SearchOption;