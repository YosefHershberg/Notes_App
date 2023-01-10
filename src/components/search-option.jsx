import React, { useState, useEffect } from 'react';

function SearchOption(props) {

    return (
        <React.Fragment>
            <div className="option" id={props.option.id} onClick={props.onEdit}>
                {props.option.text}
            </div>
        </React.Fragment>
    );
}

export default SearchOption;