/*
Responsibility: manage, load all styles & initialize current style of the theme
Reason to change: add/remove a style, change the first style
*/
import { changeStyle } from "./DynamicTheme.js";
import { FlatStyle } from "./FlatStyle.js";
import { NeuStyle } from "./NeuStyle.js";
jQuery(function () {
    "use strict";
    $('.theme-skin li .flat-skin').on('click', function () {
        changeStyle(this, FlatStyle.Instance);
    });
    $('.theme-skin li .neo-skin').on('click', function () {
        changeStyle(this, NeuStyle.Instance);
    });
});
var StyleRegistry = /** @class */ (function () {
    function StyleRegistry() {
        changeStyle($('.theme-skin li .neo-skin'), NeuStyle.Instance);
    }
    return StyleRegistry;
}());
export { StyleRegistry };
