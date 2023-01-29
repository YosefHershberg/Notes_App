"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.deleteNote = exports.editNote = exports.addNote = exports.selectedAllNotes = exports.notesSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _uuid = require("uuid");

var notesSlice = (0, _toolkit.createSlice)({
  name: 'notes',
  initialState: [],
  reducers: {
    addNote: {
      reducer: function reducer(state, action) {
        state.push(action.payload);
      },
      prepare: function prepare(displaydFolder) {
        return {
          payload: {
            id: (0, _uuid.v4)(),
            // id: 111,
            text: "",
            lastModified: new Date(Date.now()).toLocaleString(),
            folder: displaydFolder
          }
        };
      }
    },
    editNote: function editNote(state, action) {
      var _action$payload = action.payload,
          noteId = _action$payload.noteId,
          value = _action$payload.value; // console.log(noteId);

      var theNote = state.find(function (note) {
        return note.id === noteId;
      });
      theNote.text = value;
      theNote.lastModified = new Date(Date.now()).toLocaleString();
    },
    deleteNote: function deleteNote(state, action) {
      var noteId = action.payload.noteId;
      return state.filter(function (note) {
        return note.id != noteId;
      });
    }
  }
});
exports.notesSlice = notesSlice;

var selectedAllNotes = function selectedAllNotes(state) {
  return state.notes;
};

exports.selectedAllNotes = selectedAllNotes;
var _notesSlice$actions = notesSlice.actions,
    addNote = _notesSlice$actions.addNote,
    editNote = _notesSlice$actions.editNote,
    deleteNote = _notesSlice$actions.deleteNote;
exports.deleteNote = deleteNote;
exports.editNote = editNote;
exports.addNote = addNote;
var _default = notesSlice.reducer;
exports["default"] = _default;