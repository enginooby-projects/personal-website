import * as ColorSelectors from './color-selectors.js'
import { Style } from './Style.js'
import { FlatStyle } from './FlatStyle.js'
import { NeuStyle } from './NeuStyle.js'
// import tinycolor from 'tinycolor2';
// import $ from "jquery";

let styleSheet: CSSStyleSheet;
let $squareImg: JQuery<HTMLElement>;

// COLORFULL
let colorfull1: string;
let colorfull2: string;
let colorfull3: string;

export let schemeColor: string = "#680317";// "#f1f3f6";
export let highlightColor: string = "#227DD8";
export let baseColor: string;
export let mutedBaseColor: string;
const lightBaseColor: string = "#EBEBEB";
const darkBaseColor: string = "#212529";
const lightMutedBaseColor: string = "#b2b2b2";
const darkMutedBaseColor: string = "#4D4D4D";

export let currentStyle: Style;
let FLAT_STYLE: Style;
let NEU_STYLE: Style;

$(document).ready(function () {
        FLAT_STYLE = new FlatStyle();
        NEU_STYLE = new NeuStyle();
        "use strict";
        $('.theme-skin li .flat-skin').click(function () {
                currentStyle = FLAT_STYLE;
                $(this).addClass('active');
                currentStyle.onEnable();
        });
        $('.theme-skin li .neo-skin').click(function () {
                currentStyle = NEU_STYLE;
                $(this).addClass('active');
                currentStyle.onEnable();
        });
});

// PSEUDO RULES
export let trackScrollbarRule: CSSStyleRule;
export let thumbScrollbarRule: CSSStyleRule;
let placeholderRule: CSSStyleRule;
let papePilingTooltipRule: CSSStyleRule;
let selectionRule: CSSStyleRule;
let selectionOldFirefoxRule: CSSStyleRule;

function getStyleSheet() {
        for (let i = 0; i < document.styleSheets.length; i++) {
                let cursheet = document.styleSheets[i];
                if (cursheet.title == 'style') styleSheet = cursheet;
        }
}

export function init() {
        getStyleSheet();
        setupEvents();

        $squareImg = $(".hero-image .square img");
        const cssRules = styleSheet.cssRules || styleSheet.rules;
        trackScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-track {border-radius: 15px;}`)] as CSSStyleRule;
        thumbScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-thumb {background: ${schemeColor}; border-radius: 15px;}`)] as CSSStyleRule;
        placeholderRule = cssRules[styleSheet.insertRule(`.form-control::placeholder {color: ${mutedBaseColor}; opacity: 1;}`)] as CSSStyleRule;
        papePilingTooltipRule = cssRules[styleSheet.insertRule(`#pp-nav li .pp-tooltip  {color: ${baseColor}}`)] as CSSStyleRule;

        // initStyle();
        currentStyle = NEU_STYLE;
        currentStyle.onEnable();
        $("#scheme-color-picker").attr('value', schemeColor);
        $("#highlight-color-picker").attr('value', highlightColor);
        updateSchemeColor(schemeColor);
        updateHighlightColor(highlightColor);
}

function setupEvents() {
        setupColorPickerEvents();
        setupColorHoverEvents();
        setupColorClickEvents();
}

function setupColorPickerEvents() {
        $("#highlight-color-picker").on('input', function (event) {
                updateHighlightColor((event.target as any).value);
        });

        $("#scheme-color-picker").on('input', function (event) {
                updateSchemeColor((event.target as any).value);
        });
}

function setupColorHoverEvents() {
        $(".social a i, .list-inline.socials li a i").hover(
                function () {
                        $(this).css('color', highlightColor);
                }, function () {
                        $(this).css('color', baseColor);
                }
        );

        $(".segmented-control label").hover(
                function () {
                        let id = $(this).attr("for");
                        if (currentStyle == NEU_STYLE) $(this).css('color', highlightColor);
                        if (currentStyle == FLAT_STYLE && !$("#" + id).prop("checked")) $(this).css('color', highlightColor);
                }, function () {
                        let id = $(this).attr("for");
                        // reset color if the  button not checked
                        if (!$("#" + id).prop("checked")) $(this).css('color', mutedBaseColor);
                }
        );

        $(".checkbox i").hover(
                function () {
                        $(this).css('color', highlightColor);
                }, function () {
                        let id = $(this).parent().attr("for");
                        // reset color if the  button not checked
                        if (!$("#" + id).prop("checked")) $(this).css('color', mutedBaseColor);
                }
        );
}

function setupColorClickEvents() {
        $("#color-switcher .pallet-button").click(function () {
                $("#color-switcher .color-pallet").toggleClass('show');
                $(this).toggleClass('active');
        });

        // reset color for unchecked buttons
        $(".segmented-control input").click(function () {
                $(".segmented-control label[for='" + this.id + "']").css('color', baseColor);
                $(".segmented-control input[type='radio']:not(:checked)").each(
                        function () {
                                $(".segmented-control label[for='" + this.id + "']").css('color', mutedBaseColor);
                        }
                );
        });

        $('#portfolio .pill-button').click(function (this: HTMLElement) {
                resetUncheckedButtons(this);
        });
}

function resetUncheckedButtons(checkedButton: HTMLElement) {
        if (currentStyle == NEU_STYLE) $('#portfolio .pill-button').not(checkedButton).css('box-shadow', '');
        if (currentStyle == FLAT_STYLE) $('#portfolio .pill-button').not(checkedButton).css('background', 'transparent');
}

function updateHighlightColor(newColor: string) {
        highlightColor = newColor;
        $(ColorSelectors.colorHighlightColorSelectors).css("color", highlightColor);
        $(ColorSelectors.backgroundHighlightColorSelectors).css("background-color", highlightColor);
        currentStyle.updateRadioUI();
        currentStyle.updateCheckboxUI();
        currentStyle.update();
}

function updateSchemeColor(newColor: string) {
        schemeColor = newColor;
        updateBaseColor();

        // update selectors
        $(ColorSelectors.backgroundSchemeColorSelectors).css("background-color", schemeColor);
        $(ColorSelectors.colorBaseColorSelectors).css("color", baseColor);
        $(ColorSelectors.backgroundBaseColorSelectors).css("background-color", baseColor);
        $(ColorSelectors.colorMutedBaseColorSelectors).css("color", mutedBaseColor);
        updatePseudoElements();

        // updateStyle(currentStyle);
        currentStyle.update();
}

function updatePseudoElements() {
        thumbScrollbarRule.style.background = schemeColor;
        placeholderRule.style.color = mutedBaseColor;
        papePilingTooltipRule.style.color = baseColor;
        if ((window as any).chrome) {
                // selectionRule.background = tinycolor(highlightColor).setAlpha(0.3).toRgbString();
        }
        // selectionOldFirefoxRule.background = highlightColor;
}

function updateBaseColor() {
        const lastBaseColor = baseColor;
        baseColor = invertColor(schemeColor, true);
        mutedBaseColor = (baseColor == lightBaseColor) ? lightMutedBaseColor : darkMutedBaseColor;
        const heroImg = (baseColor == lightBaseColor) ? "light-element_square" : "dark-element_square";
        $squareImg.attr('src', `assets/img/${heroImg}.png`);

        if (lastBaseColor != baseColor) {
                currentStyle.updateRadioUI();
                currentStyle.updateCheckboxUI();
        }
}

export function invertColor(hex: string, isBlackWhite: boolean) {
        if (hex.indexOf('#') === 0) {
                hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
                throw new Error('Invalid HEX color.');
        }
        let r = parseInt(hex.slice(0, 2), 16),
                g = parseInt(hex.slice(2, 4), 16),
                b = parseInt(hex.slice(4, 6), 16);
        if (isBlackWhite) {
                // http://stackoverflow.com/a/3943023/112731
                return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? darkBaseColor : lightBaseColor;
        }
        // invert color components
        const rString: string = (255 - r).toString(16);
        const bString: string = (255 - b).toString(16);
        const gString: string = (255 - g).toString(16);

        // pad each with zeros and return
        return "#" + padZero(rString) + padZero(gString) + padZero(bString);
}

function padZero(str: string, len?: number) {
        len = len || 2;
        let zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
}
