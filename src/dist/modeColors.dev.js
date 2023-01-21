"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var modeColors = {
  lightModeColors: {
    "--textColor": "black",
    "--backgroundColor": "white",
    "--navbarBackgroundColor": "white",
    "--noteBackgroundColor": "rgb(239, 239, 239)",
    "--lastModifiedColor": "rgb(126, 126, 126)",
    "--noteListTextColor": "rgb(94, 93, 93)",
    "--noteButtonBackgroundColor": "rgb(209, 209, 209)",
    "--noNotesYetButtonBackgroundColor": "rgb(101, 164, 219)",
    "--searchBoxBackgroundColor": "rgb(219, 219, 219)",
    "--textAreaCurser": "auto"
  },
  darkModeColors: {
    "--textColor": "white",
    "--backgroundColor": "#525252",
    "--navbarBackgroundColor": "#414141",
    "--noteBackgroundColor": "rgb(125, 125, 125)",
    "--lastModifiedColor": "rgb(200, 200, 200)",
    "--noteListTextColor": "rgb(230, 230, 230)",
    "--noteButtonBackgroundColor": "rgb(209, 209, 209)",
    "--noNotesYetButtonBackgroundColor": "rgb(101, 164, 219)",
    "--searchBoxBackgroundColor": "rgb(100, 100, 100)" // '--textAreaCurser': './assets/WhiteTextSelect.cur', // Why isnt this working

  }
};
var _default = modeColors;
exports["default"] = _default;