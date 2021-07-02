"use strict";
var Style = /** @class */ (function () {
    function Style() {
        this.onDocumentReady();
    }
    Style.prototype.formatString = function (selectorsArray) {
        return selectorsArray.join(", ");
    };
    Style.prototype.setupEvents = function () {
        this.setupHoverEvents();
        this.setupClickEvents();
    };
    return Style;
}());
