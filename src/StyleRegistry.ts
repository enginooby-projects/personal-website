/* 
Responsibility: manage, load all styles & initialize current style of the theme
Reason to change: add/remove a style, change the first style
*/

import { changeStyle } from "./DynamicTheme.js";
import { FlatStyle } from "./FlatStyle.js";
import { NeuStyle } from "./NeuStyle.js";

const FLAT_OPTION_SELECTOR: string = '.theme-skin li .flat-skin';
const NEU_OPTION_SELECTOR: string = '.theme-skin li .neo-skin';

jQuery(function () {
        "use strict";
        $(FLAT_OPTION_SELECTOR).on('click', function () {
                changeStyle(this, FlatStyle.Instance);
        });
        $(NEU_OPTION_SELECTOR).on('click', function () {
                changeStyle(this, NeuStyle.Instance);
        });
});

export class StyleRegistry {
        constructor() {
                changeStyle($(NEU_OPTION_SELECTOR), NeuStyle.Instance);
                // changeStyle($(FLAT_OPTION_SELECTOR), FlatStyle.Instance);
        }
}