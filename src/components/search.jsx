import React, { useState, useEffect, useRef } from 'react';
import SearchOption from './search-option';

function Search(props) {
    const [options, setOptions] = useState([])
    const [input, setInput] = useState()
    const inputArea = useRef();

    const { notes, onEdit } = props

    function handleSearchEngine(event) {
        const results = []

        notes.forEach(note => {
            note.text.includes(event.target.value) && results.push(note)
        });

        setOptions(results)
        setInput(event.target.value)
    }

    useEffect(() => {
        console.log(options);
    }, [options]);

    useEffect(() => {
        input === '' && setOptions([])
    }, [input]);

    useEffect(() => {
        inputArea.current.focus()
    }, []);


    return (
        <React.Fragment>
            <div id="search-container">
                <div id="serach-form">
                    <input ref={inputArea} id='search-input' type="text" placeholder=' Serach notes ...' onChange={handleSearchEngine} />
                    {/* <button id='search-btn'>Search</button> */}
                    {options.length > 0 && <div id="options-container">
                        {options.map(option =>
                            <SearchOption
                                key={option.id}
                                option={option}
                                onEdit={onEdit}
                            />)}
                    </div>}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Search;