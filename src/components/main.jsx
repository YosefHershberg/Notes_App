import React, { useState, useEffect } from 'react';
import WorkSpace from './work-space';
import GridOfNotes from './grid-of-notes';
import NoNotesYet from './no-notses-yet';
import Search from './search';

function Main(props) {
    const { mode, notes, displaydNote, onChange, onSave, onEdit, onDelete, incrememt, onNewNote } = props;

    return (
        <React.Fragment>
            <div id="main">
                {mode === 'writeNoteMode' &&
                    <WorkSpace
                        mode={mode}
                        notes={notes}
                        displaydNote={displaydNote}
                        onChange={onChange}
                        onSave={onSave}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        incrememt={incrememt}
                    />
                }
                {mode === 'showNotesMode' &&
                    <GridOfNotes
                        onDelete={onDelete}
                        notes={notes}
                        onEdit={onEdit}
                    />
                }
                {mode === 'noNotesMode' &&
                    <NoNotesYet
                        onNewNote={onNewNote}
                        onEdit={onEdit}
                        noNotesHidden={props.noNotesHidden}
                    />
                }
                {mode === 'noNotesMode' &&
                    <WorkSpace
                        notes={notes}
                        displaydNote={displaydNote}
                        onChange={onChange}
                        onSave={onSave}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        incrememt={incrememt}
                    />
                }
                {mode === 'searchMode' &&
                    <Search
                        notes={notes}
                        onEdit={onEdit}
                    />
                }
            </div>
        </React.Fragment>
    );
}

export default Main;