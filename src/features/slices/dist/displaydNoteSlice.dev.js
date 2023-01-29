"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setDisplaydNote = exports.displaydNote = exports.displaydNoteSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var displaydNoteSlice = (0, _toolkit.createSlice)({
  name: 'displaydNote',
  initialState: {},
  reducers: {
    setDisplaydNote: function setDisplaydNote(state, action) {
      return action.payload;
    }
  }
});
exports.displaydNoteSlice = displaydNoteSlice;

var displaydNote = function displaydNote(state) {
  return state.displaydNote;
};

exports.displaydNote = displaydNote;
var setDisplaydNote = displaydNoteSlice.actions.setDisplaydNote;
exports.setDisplaydNote = setDisplaydNote;
var _default = displaydNoteSlice.reducer;
exports["default"] = _default;