/*
Responsibility: manage, load all styles & initialize current style of the theme
Reason to change: add/remove a style, change the first style
*/
import { changeStyle } from "./DynamicTheme.js";
import { FlatStyle } from "./FlatStyle.js";
import { NeuStyle } from "./NeuStyle.js";
import { GlassStyle } from "./GlassStyle.js";
const FLAT_OPTION_SELECTOR = '#flat-skin-button';
const NEU_OPTION_SELECTOR = '#neu-skin-button';
const GLASS_OPTION_SELECTOR = '#glass-skin-button';
jQuery(function () {
    "use strict";
    $(FLAT_OPTION_SELECTOR).on('click', function () {
        changeStyle(FlatStyle.Instance);
    });
    $(NEU_OPTION_SELECTOR).on('click', function () {
        changeStyle(NeuStyle.Instance);
    });
    $(GLASS_OPTION_SELECTOR).on('click', function () {
        changeStyle(GlassStyle.Instance);
    });
});
export class StyleRegistry {
    constructor() {
        changeStyle(GlassStyle.Instance);
        $(GLASS_OPTION_SELECTOR).children('.pill-button').addClass('active');
        // changeStyle(NeuStyle.Instance);
        // $(NEU_OPTION_SELECTOR).children('.pill-button').addClass('active');
        // changeStyle(FlatStyle.Instance);
        // $(FLAT_OPTION_SELECTOR).children('.pill-button').addClass('active');
    }
}
