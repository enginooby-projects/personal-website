import * as ColorSelectors from './color-selectors.js';
import ColorUtility from './ColorUtility.js';
import { StyleRegistry } from './StyleRegistry.js';
var styleSheet;
var $squareImg;
// COLORFULL
var colorfull1;
var colorfull2;
var colorfull3;
export var schemeColor = "#680317"; // "#f1f3f6";
export var highlightColor = "#227DD8";
export var baseColor;
export var mutedBaseColor;
var lightBaseColor = "#EBEBEB";
var darkBaseColor = "#212529";
var lightMutedBaseColor = "#b2b2b2";
var darkMutedBaseColor = "#4D4D4D";
export var currentStyle;
var styleRegistry;
// PSEUDO RULES
export var trackScrollbarRule;
export var thumbScrollbarRule;
export var sliderThumbRule;
export var sliderThumbFocusRule;
export var colorSwatchRule;
var placeholderRule;
var papePilingTooltipRule;
var selectionRule;
var selectionOldFirefoxRule;
function getStyleSheet() {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var cursheet = document.styleSheets[i];
        if (cursheet.title == 'style')
            styleSheet = cursheet;
    }
}
export function changeStyle(htmlElement, newStyle) {
    currentStyle = newStyle;
    // update option buttons
    $('.theme-skin .button-border a').removeClass('active');
    $(htmlElement).children('.pill-button').addClass('active');
    $(".customizer").hide();
    currentStyle.onEnable();
}
export function init() {
    getStyleSheet();
    setupEvents();
    $squareImg = $(".hero-image .square img");
    var cssRules = styleSheet.cssRules || styleSheet.rules;
    trackScrollbarRule = cssRules[styleSheet.insertRule("::-webkit-scrollbar-track {border-radius: 15px;}")];
    thumbScrollbarRule = cssRules[styleSheet.insertRule("::-webkit-scrollbar-thumb {background: " + schemeColor + "; border-radius: 15px;}")];
    placeholderRule = cssRules[styleSheet.insertRule(".form-control::placeholder {color: " + mutedBaseColor + "; opacity: 1;}")];
    papePilingTooltipRule = cssRules[styleSheet.insertRule("#pp-nav li .pp-tooltip  {color: " + baseColor + "}")];
    sliderThumbRule = cssRules[styleSheet.insertRule(".range-slider__range::-webkit-slider-thumb {background:" + schemeColor + ";}")];
    sliderThumbFocusRule = cssRules[styleSheet.insertRule(".range-slider__range.focus::-webkit-slider-thumb {background:" + schemeColor + ";}")];
    colorSwatchRule = cssRules[styleSheet.insertRule("::-webkit-color-swatch{}")];
    styleRegistry = new StyleRegistry();
    $("#scheme-color-picker").attr('value', schemeColor);
    $("#highlight-color-picker").attr('value', highlightColor);
    updateSchemeColor(schemeColor);
    updateHighlightColor(highlightColor);
}
function setupEvents() {
    setupColorPickerEvents();
    setupCommonHoverEvents();
    setupCommonClickEvents();
}
function setupColorPickerEvents() {
    $("#highlight-color-picker").on('input', function (event) {
        updateHighlightColor(event.target.value);
    });
    $("#scheme-color-picker").on('input', function (event) {
        updateSchemeColor(event.target.value);
    });
}
function setupCommonHoverEvents() {
    $(".social a i, .list-inline.socials li a i")
        .on('mouseenter', function () {
        $(this).css('color', highlightColor);
    }).on('mouseleave', function () {
        $(this).css('color', baseColor);
    });
    $(".list-inline.socials li a i, #myMenu li a")
        .on('mouseenter', function () {
        $(this).css('color', highlightColor);
    }).on('mouseleave', function () {
        $(this).css('color', 'white');
    });
    $(".segmented-control label").on('mouseleave', function () {
        var id = $(this).attr("for");
        // reset color if the  button not checked
        if (!$("#" + id).prop("checked"))
            $(this).css('color', mutedBaseColor);
    });
    $(".checkbox i")
        .on('mouseenter', function () {
        $(this).css('color', highlightColor);
    }).on('mouseleave', function () {
        var id = $(this).parent().attr("for");
        // reset color if the  button not checked
        if (!$("#" + id).prop("checked"))
            $(this).css('color', mutedBaseColor);
    });
}
function setupCommonClickEvents() {
    $("#color-switcher .pallet-button").on('click', function () {
        $("#color-switcher .color-pallet").toggleClass('show');
        $(this).toggleClass('active');
    });
    // reset color for unchecked buttons
    $(".segmented-control input").on('click', function () {
        $(".segmented-control label[for='" + this.id + "']").css('color', baseColor);
        $(".segmented-control input[type='radio']:not(:checked)").each(function () {
            $(".segmented-control label[for='" + this.id + "']").css('color', mutedBaseColor);
        });
    });
    $('#portfolio .pill-button').on('click', function () {
        currentStyle.resetUncheckedButtons(this);
    });
}
function updateHighlightColor(newColor) {
    highlightColor = newColor;
    $(ColorSelectors.colorHighlightColorSelectors).css("color", highlightColor);
    $(ColorSelectors.backgroundHighlightColorSelectors).css("background-color", highlightColor);
    currentStyle.updateRadioUI();
    currentStyle.updateCheckboxUI();
    currentStyle.update();
}
function updateSchemeColor(newColor) {
    schemeColor = newColor;
    updateBaseColor();
    // update selectors
    $(ColorSelectors.backgroundSchemeColorSelectors).css("background-color", schemeColor);
    $(ColorSelectors.colorBaseColorSelectors).css("color", baseColor);
    $(ColorSelectors.backgroundBaseColorSelectors).css("background-color", baseColor);
    $(ColorSelectors.colorMutedBaseColorSelectors).css("color", mutedBaseColor);
    updatePseudoElements();
    currentStyle.update();
}
function updatePseudoElements() {
    thumbScrollbarRule.style.background = schemeColor;
    placeholderRule.style.color = mutedBaseColor;
    papePilingTooltipRule.style.color = baseColor;
}
function updateBaseColor() {
    var lastBaseColor = baseColor;
    baseColor = ColorUtility.getInvert(schemeColor, true);
    mutedBaseColor = (baseColor == lightBaseColor) ? lightMutedBaseColor : darkMutedBaseColor;
    var heroImg = (baseColor == lightBaseColor) ? "light-element_square" : "dark-element_square";
    $squareImg.attr('src', "assets/img/" + heroImg + ".png");
    if (lastBaseColor != baseColor) {
        currentStyle.updateRadioUI();
        currentStyle.updateCheckboxUI();
    }
}
