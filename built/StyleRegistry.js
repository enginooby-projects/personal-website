/*
Responsibility: manage, load all styles & initialize current style of the theme
Reason to change: add/remove a style, change the first style
*/
import { changeStyle } from "./DynamicTheme.js";
import { FlatStyle } from "./FlatStyle.js";
import { NeuStyle } from "./NeuStyle.js";
var FLAT_OPTION_SELECTOR = '#flat-skin-button';
var NEU_OPTION_SELECTOR = '#neo-skin-button';
jQuery(function () {
    "use strict";
    $(FLAT_OPTION_SELECTOR).on('click', function () {
        changeStyle(this, FlatStyle.Instance);
    });
    $(NEU_OPTION_SELECTOR).on('click', function () {
        changeStyle(this, NeuStyle.Instance);
    });
});
var StyleRegistry = /** @class */ (function () {
    function StyleRegistry() {
        changeStyle($(NEU_OPTION_SELECTOR), NeuStyle.Instance);
        // changeStyle($(FLAT_OPTION_SELECTOR), FlatStyle.Instance);
    }
    return StyleRegistry;
}());
export { StyleRegistry };
