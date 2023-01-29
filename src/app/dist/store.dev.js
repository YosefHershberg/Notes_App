"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _notesSlice = _interopRequireDefault(require("../features/slices/notesSlice"));

var _displaydNoteSlice = _interopRequireDefault(require("../features/slices/displaydNoteSlice"));

var _displaydFolderSlice = _interopRequireDefault(require("../features/slices/displaydFolderSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    notes: _notesSlice["default"],
    displaydNote: _displaydNoteSlice["default"],
    displaydFolder: _displaydFolderSlice["default"]
  }
});
exports.store = store;