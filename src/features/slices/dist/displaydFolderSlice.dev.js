"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setDisplaydFolder = exports.displaydFolderData = exports.displaydFolderSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var displaydFolderSlice = (0, _toolkit.createSlice)({
  name: 'displaydFolder',
  initialState: 'All Notes',
  reducers: {
    setDisplaydFolder: function setDisplaydFolder(state, action) {
      return action.payload;
    }
  }
});
exports.displaydFolderSlice = displaydFolderSlice;

var displaydFolderData = function displaydFolderData(state) {
  return state.displaydFolder;
};

exports.displaydFolderData = displaydFolderData;
var setDisplaydFolder = displaydFolderSlice.actions.setDisplaydFolder;
exports.setDisplaydFolder = setDisplaydFolder;
var _default = displaydFolderSlice.reducer;
exports["default"] = _default;