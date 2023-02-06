import React, { useState, useEffect, useRef } from 'react';
import SearchOption from './search-option';
import Styles from '../scss/styles.module.scss';
import { useSelector } from 'react-redux';
import { selectedAllNotes } from '../slices/notesSlice';

function Search() {
    const [options, setOptions] = useState([])
    const [input, setInput] = useState()
    const inputArea = useRef();
    const allNotes = useSelector(selectedAllNotes)

    function handleSearchEngine(event) {
        const results = []

        allNotes.forEach(note => {
            note.text.includes(event.target.value) && results.push(note)
        });

        setOptions(results)
        setInput(event.target.value)
    }

    useEffect(() => {
        input === '' && setOptions([])
    }, [input]);

    useEffect(() => {
        inputArea.current.focus()
    }, []);


    return (
        <React.Fragment>
            <div id={Styles.searchContainer}>
                <div id="serach-form">
                    <div className={Styles.searchBoxWrapper}>
                        <div className={Styles.searchBox}>
                            <input
                                className={Styles.searchInput}
                                type="text"
                                name="search"
                                ref={inputArea}
                                placeholder=' Serach notes ...'
                                onChange={handleSearchEngine} >
                            </input>
                            <a className={Styles.searchBtn} href="">
                                <i className="fab fa-searchengin"></i>
                            </a>
                        </div>
                    </div>
                    <div id={Styles.optionContainerWrapper}>
                        {options.length > 0 && <div id={Styles.optionsContainer}>
                            {options.map(option =>
                                <SearchOption
                                    key={option.id}
                                    option={option}
                                />)}
                        </div>}
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default Search;