import * as ColorSelectors from './color-selectors.js';
import { StyleRegistry } from './StyleRegistry.js';
import { lightBaseValue } from './Color.js';
import { TinyColor } from './TinyColor.js';
let styleSheet;
let $squareImg;
let borderRadius = 15;
export let colorfull1 = new TinyColor("#00a584");
export let colorfull2 = new TinyColor("#ebbc00");
export let colorfull3 = new TinyColor("#e93666");
// export let schemeColor: Color = new TinyColor("#680317");
export let schemeColor = new TinyColor("#D4D4D4");
export let highlightColor = new TinyColor("#055CB3");
export let baseColor;
export let mutedBaseColor;
const lightMutedBaseColor = "#b2b2b2";
const darkMutedBaseColor = "#4D4D4D";
export let currentStyle;
let styleRegistry;
// PSEUDO RULES
export let trackScrollbarRule;
export let thumbScrollbarRule;
export let sliderThumbRule;
export let sliderThumbFocusRule;
export let colorSwatchRule;
let placeholderRule;
let papePilingTooltipRule;
let selectionRule;
let selectionOldFirefoxRule;
function getStyleSheet() {
    for (let i = 0; i < document.styleSheets.length; i++) {
        let cursheet = document.styleSheets[i];
        if (cursheet.title == 'style')
            styleSheet = cursheet;
    }
}
export function changeStyle(htmlElement, newStyle) {
    currentStyle === null || currentStyle === void 0 ? void 0 : currentStyle.onDisable();
    currentStyle = newStyle;
    // update option buttons
    $('.theme-skin .button-border a').removeClass('active');
    $(htmlElement).children('.pill-button').addClass('active');
    $(".customizer").hide();
    $("body").removeClass();
    currentStyle.onEnable();
}
export function init() {
    getStyleSheet();
    setupEvents();
    $squareImg = $(".hero-image .square img");
    const cssRules = styleSheet.cssRules || styleSheet.rules;
    trackScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-track {border-radius: 15px;}`)];
    thumbScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-thumb {background: ${schemeColor}; border-radius: 15px;}`)];
    placeholderRule = cssRules[styleSheet.insertRule(`.form-control::placeholder {color: ${mutedBaseColor}; opacity: 1;}`)];
    papePilingTooltipRule = cssRules[styleSheet.insertRule(`#pp-nav li .pp-tooltip  {color: ${baseColor}}`)];
    sliderThumbRule = cssRules[styleSheet.insertRule(`.range-slider__range::-webkit-slider-thumb {background:${schemeColor}; border-radius: ${borderRadius}}`)];
    sliderThumbFocusRule = cssRules[styleSheet.insertRule(`.range-slider__range.focus::-webkit-slider-thumb {background:${schemeColor};border-radius: ${borderRadius}}`)];
    colorSwatchRule = cssRules[styleSheet.insertRule(`::-webkit-color-swatch{}`)];
    styleRegistry = new StyleRegistry();
    $("#scheme-color-picker").attr('value', schemeColor.hex);
    $("#highlight-color-picker").attr('value', highlightColor.hex);
    updateSchemeColor(schemeColor.hex);
    updateHighlightColor(highlightColor.hex);
    $('#border-radius').attr('value', borderRadius);
    $("#border-radius").next('.range-slider__value').html(borderRadius.toString());
}
function setupEvents() {
    setupColorPickerEvents();
    setupCommonHoverEvents();
    setupCommonClickEvents();
    setupRangeSliderEvents();
}
function setupColorPickerEvents() {
    $("#highlight-color-picker").on('input', function (event) {
        updateHighlightColor(event.target.value);
    });
    $("#scheme-color-picker").on('input', function (event) {
        updateSchemeColor(event.target.value);
    });
    $("#colorfull1-picker").on('input', function (event) {
        colorfull1.setHex(event.target.value);
        updateColorfull(1);
    });
    $("#colorfull2-picker").on('input', function (event) {
        colorfull2.setHex(event.target.value);
        updateColorfull(2);
    });
    $("#colorfull3-picker").on('input', function (event) {
        colorfull3.setHex(event.target.value);
        updateColorfull(3);
    });
}
function updateColorfull(colorfullNumber) {
    let colorfull;
    let timelineSelector;
    if (colorfullNumber == 1) {
        colorfull = colorfull1;
        timelineSelector = '#education-timeline';
    }
    if (colorfullNumber == 2) {
        colorfull = colorfull2;
        timelineSelector = '#experience-timeline';
    }
    if (colorfullNumber == 3) {
        colorfull = colorfull3;
        timelineSelector = '#achievements-timeline';
    }
    $(`.colorfull${colorfullNumber}, .background-colorfull${colorfullNumber}>.badge`).css('color', colorfull.hex);
    $(`.background-colorfull${colorfullNumber}`).css('background-color', colorfull.hex);
    $(`.background-colorfull${colorfullNumber}`).css('color', colorfull.getInvertBlackWhite());
    $(`${timelineSelector} .timeline-item`).css('border-left-color', colorfull.hex);
    $(`.badge-pill.background-colorfull${colorfullNumber} .badge`).css('background', colorfull.getInvertBlackWhite());
}
;
function setupCommonHoverEvents() {
    $(".social a i, .list-inline.socials li a i")
        .on('mouseenter', function () {
        $(this).css('color', highlightColor.hex);
    }).on('mouseleave', function () {
        $(this).css('color', baseColor);
    });
    $(".list-inline.socials li a i, #myMenu li a")
        .on('mouseenter', function () {
        $(this).css('color', highlightColor.hex);
    }).on('mouseleave', function () {
        $(this).css('color', 'white');
    });
    $(".segmented-control label").on('mouseleave', function () {
        let id = $(this).attr("for");
        // reset color if the  button not checked
        if (!$("#" + id).prop("checked"))
            $(this).css('color', mutedBaseColor);
    });
    $(".checkbox i")
        .on('mouseenter', function () {
        $(this).css('color', highlightColor.hex);
    }).on('mouseleave', function () {
        let id = $(this).parent().attr("for");
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
        currentStyle.resetInactiveButtons(this);
    });
}
function updateHighlightColor(hex) {
    highlightColor.setHex(hex);
    console.log(highlightColor);
    $(ColorSelectors.colorHighlightColorSelectors).css("color", highlightColor.hex);
    $(ColorSelectors.backgroundHighlightColorSelectors).css("background-color", highlightColor.hex);
    currentStyle.updateRadioUI();
    currentStyle.updateCheckboxUI();
    currentStyle.applyStyle();
}
function updateSchemeColor(hex) {
    schemeColor.setHex(hex);
    updateBaseColor();
    // update selectors
    $(ColorSelectors.backgroundSchemeColorSelectors).css("background-color", schemeColor.hex);
    $(ColorSelectors.colorBaseColorSelectors).css("color", baseColor);
    $(ColorSelectors.backgroundBaseColorSelectors).css("background-color", baseColor);
    $(ColorSelectors.colorMutedBaseColorSelectors).css("color", mutedBaseColor);
    updatePseudoElements();
    currentStyle.applyStyle();
}
function updatePseudoElements() {
    thumbScrollbarRule.style.background = schemeColor.hex;
    placeholderRule.style.color = mutedBaseColor;
    papePilingTooltipRule.style.color = baseColor;
}
function updateBaseColor() {
    const lastBaseColor = baseColor;
    baseColor = schemeColor.getInvertBlackWhite();
    mutedBaseColor = (baseColor == lightBaseValue) ? lightMutedBaseColor : darkMutedBaseColor;
    const heroImg = (baseColor == lightBaseValue) ? "light-element_square" : "dark-element_square";
    $squareImg.attr('src', `assets/img/${heroImg}.png`);
    if (lastBaseColor != baseColor) {
        currentStyle.updateRadioUI();
        currentStyle.updateCheckboxUI();
    }
}
function setupRangeSliderEvents() {
    $("#border-radius").on('input', (event) => {
        const newValue = event.target.value;
        $("#" + event.target.id).next('.range-slider__value').text(newValue);
        switch (event.target.id) {
            case 'border-radius':
                borderRadius = parseInt(newValue);
                break;
        }
        updateBorder();
    });
}
function updateBorder() {
    $(ColorSelectors.borderRadiusSelectors).css('border-radius', borderRadius);
    $('.background-item').css('border-radius', borderRadius * 6); // since its zoom is 1/6
    // TODO; not working
    // sliderThumbRule.style.borderRadius = borderRadius.toString();         
    // thumbScrollbarRule.style.borderRadius = borderRadius.toString();
    // trackScrollbarRule.style.borderRadius = borderRadius.toString();
}
