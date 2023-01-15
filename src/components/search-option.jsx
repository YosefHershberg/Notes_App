import React, { useState, useEffect } from 'react';
import Styles from '../scss/styles.module.scss'

function SearchOption(props) {

    return (
        <React.Fragment>
            <div className={Styles.option} id={props.option.id} onClick={() => props.onEdit(props.option.id)}>
                {props.option.text}
            </div>
        </React.Fragment>
    );
}

export default SearchOption;