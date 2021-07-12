import * as Selectors from './color-selectors.js'
import { Style } from './Style.js'
import { StyleRegistry } from './StyleRegistry.js';
import { Color, darkBaseValue, lightBaseValue } from './Color.js';
import { TinyColor } from './TinyColor.js';

export let styleSheet: CSSStyleSheet;
export let cssRules: CSSRuleList;
let $squareImg: JQuery<HTMLElement>;

let borderRadius: number = 15;

export let colorfull1: Color = new TinyColor("#00a584");
export let colorfull2: Color = new TinyColor("#ebbc00");
export let colorfull3: Color = new TinyColor("#e93666");

// export let schemeColor: Color = new TinyColor("#680317");
export let schemeColor: Color = new TinyColor("#D4D4D4");
export let highlightColor: Color = new TinyColor("#055CB3");
export let baseColor: string = darkBaseValue;
const lightMutedBaseColor: string = "#b2b2b2";
const darkMutedBaseColor: string = "#4D4D4D";
export let mutedBaseColor: string = darkMutedBaseColor;


export let currentStyle: Style;
let styleRegistry: StyleRegistry;

// PSEUDO RULES
export let trackScrollbarRule: CSSStyleRule;
export let thumbScrollbarRule: CSSStyleRule;
export let sliderThumbRule: CSSStyleRule;
export let sliderThumbHoverRule: CSSStyleRule;
export let sliderTrackForcusRule: CSSStyleRule;
export let colorSwatchRule: CSSStyleRule;

export let radioLabelHoverRule: CSSStyleRule;
export let radioLabelCheckedRule: CSSStyleRule;
export let radioLabelUncheckedRule: CSSStyleRule;
export let checkboxLabelHoverRule: CSSStyleRule;
export let checkboxNameCheckedRule: CSSStyleRule;
export let checkboxIconCheckedRule: CSSStyleRule;
export let checkboxNameUncheckedRule: CSSStyleRule;
export let checkboxIconUncheckedRule: CSSStyleRule;

let placeholderRule: CSSStyleRule;
let papePilingTooltipRule: CSSStyleRule;
let selectionRule: CSSStyleRule;
let selectionOldFirefoxRule: CSSStyleRule;

let hoverEventsAreSetup: boolean = false;
let clickEventsAreSetup: boolean = false;

function getStyleSheet() {
        for (let i = 0; i < document.styleSheets.length; i++) {
                let cursheet = document.styleSheets[i];
                if (cursheet.title == 'style') styleSheet = cursheet;
        }
}

export function changeStyle(htmlElement: HTMLElement | JQuery<HTMLElement>, newStyle: Style) {
        currentStyle?.onDisable();
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
        setupCustomizeEvents();

        $squareImg = $(".hero-image .square img");
        cssRules = styleSheet.cssRules || styleSheet.rules;

        // TODO: lazy init
        trackScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-track {}`)] as CSSStyleRule;
        thumbScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-thumb {}`)] as CSSStyleRule;
        placeholderRule = cssRules[styleSheet.insertRule(`.form-control::placeholder {color: ${mutedBaseColor}; opacity: 1;}`)] as CSSStyleRule;
        papePilingTooltipRule = cssRules[styleSheet.insertRule(`#pp-nav li .pp-tooltip  {color: ${baseColor}}`)] as CSSStyleRule;
        sliderThumbRule = cssRules[styleSheet.insertRule(`::-webkit-slider-thumb {}`)] as CSSStyleRule;
        sliderThumbHoverRule = cssRules[styleSheet.insertRule(`::-webkit-slider-thumb:hover {}`)] as CSSStyleRule;
        sliderTrackForcusRule = cssRules[styleSheet.insertRule(`input[type=range]:focus {}`)] as CSSStyleRule;
        colorSwatchRule = cssRules[styleSheet.insertRule(`::-webkit-color-swatch{}`)] as CSSStyleRule;

        radioLabelHoverRule = cssRules[styleSheet.insertRule(`.segmented-control>input:hover+label {}`)] as CSSStyleRule;
        radioLabelCheckedRule = cssRules[styleSheet.insertRule(`.segmented-control>input:checked+label {}`)] as CSSStyleRule;
        radioLabelUncheckedRule = cssRules[styleSheet.insertRule(`.segmented-control>input:not(:checked)+label {}`)] as CSSStyleRule;
        checkboxLabelHoverRule = cssRules[styleSheet.insertRule(` .checkbox input:hover~label i {}`)] as CSSStyleRule;
        checkboxNameCheckedRule = cssRules[styleSheet.insertRule(`.checkbox input:checked~label+.name {}`)] as CSSStyleRule;
        checkboxIconCheckedRule = cssRules[styleSheet.insertRule(` .checkbox input:checked~label i {}`)] as CSSStyleRule;
        checkboxNameUncheckedRule = cssRules[styleSheet.insertRule(` .checkbox input:not(:checked)~label+.name {}`)] as CSSStyleRule;
        checkboxIconUncheckedRule = cssRules[styleSheet.insertRule(` .checkbox input:not(:checked)~label i {}`)] as CSSStyleRule;

        styleRegistry = new StyleRegistry();
        $("#scheme-color-picker").attr('value', schemeColor.hex);
        $("#highlight-color-picker").attr('value', highlightColor.hex);
        // updateSchemeColor(schemeColor.hex);
        // updateHighlightColor(highlightColor.hex);

        $('#border-radius').attr('value', borderRadius);
        $("#border-radius").next('.range-slider__value').html(borderRadius.toString());
}

function setupCustomizeEvents() {
        $("#color-switcher .pallet-button").on('click', function () {
                $("#color-switcher .color-pallet").toggleClass('show');
                $(this).toggleClass('active');
        });
        setupColorPickerEvents();
        setupRangeSliderEvents();
}

function setupColorPickerEvents() {
        $("#highlight-color-picker").on('input', function (event) {
                updateHighlightColor((event.target as any).value);
        });
        $("#scheme-color-picker").on('input', function (event) {
                updateSchemeColor((event.target as any).value);
        });
        $("#colorfull1-picker").on('input', function (event) {
                colorfull1.setHex((event.target as any).value);
                updateColorfull(1);
        });
        $("#colorfull2-picker").on('input', function (event) {
                colorfull2.setHex((event.target as any).value);
                updateColorfull(2);
        });
        $("#colorfull3-picker").on('input', function (event) {
                colorfull3.setHex((event.target as any).value);
                updateColorfull(3);
        });
}

function setupRangeSliderEvents() {
        $("#border-radius").on('input', (event) => {
                const newValue = (event.target as HTMLInputElement).value;
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
        $(Selectors.borderRadiusSelectors).css('border-radius', borderRadius);
        $('.background-item').css('border-radius', borderRadius * 6); // since its zoom is 1/6
        trackScrollbarRule.style.setProperty('border-radius', `${borderRadius}px`, 'important');
        thumbScrollbarRule.style.setProperty('border-radius', `${borderRadius}px`, 'important');
}

function updateColorfull(colorfullNumber: number) {
        let colorfull: Color;
        let timelineSelector: string;
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

        $(`.colorfull${colorfullNumber}, .background-colorfull${colorfullNumber}>.badge`).css('color', colorfull!.hex);
        $(`.background-colorfull${colorfullNumber}`).css('background-color', colorfull!.hex);
        $(`.background-colorfull${colorfullNumber}`).css('color', colorfull!.getInvertBlackWhite());
        $(`${timelineSelector!} .timeline-item`).css('border-left-color', colorfull!.hex);
        $(`.badge-pill.background-colorfull${colorfullNumber} .badge`).css('background', colorfull!.getInvertBlackWhite());
};


function updateHighlightColor(hex: string) {
        highlightColor.setHex(hex);
        $(Selectors.colorHighlightColorSelectors).css("color", highlightColor.hex);
        $(Selectors.backgroundHighlightColorSelectors).css("background-color", highlightColor.hex);
        setupCommonHoverEvents();
        setupCommonClickEvents();
        currentStyle.onHighlightColorUpdated();
}

function updateSchemeColor(hex: string) {
        schemeColor.setHex(hex);
        updateBaseColor();
        updateCommonElements();
        updatePseudoElements();
        setupCommonHoverEvents();
        setupCommonClickEvents();
        currentStyle.onSchemeColorUpdated();
}


function setupCommonHoverEvents() {
        // lazily setup
        if (hoverEventsAreSetup) return;
        hoverEventsAreSetup = true;

        $(".portfolio .portfolio-icon a, .list-inline.socials li a i, #myMenu li a, .social a i").on('mouseenter', (event) => {
                $(event.currentTarget).css('color', highlightColor.hex);
        });

        $(".social a i").on('mouseleave', function () {
                $(this).css('color', baseColor);
        });

        $(".list-inline.socials li a i, #myMenu li a").on('mouseleave', function () {
                $(this).css('color', 'white');
        });
}

function setupCommonClickEvents() {
        // lazily setup
        if (clickEventsAreSetup) return;
        clickEventsAreSetup = true;

        $('#portfolio .pill-button').on('click', function (this: HTMLElement) {
                currentStyle.resetInactiveButtons(this);
        });
}

function updateCommonElements() {
        $(Selectors.backgroundSchemeColorSelectors).css("background-color", schemeColor.hex);
        $(Selectors.colorBaseColorSelectors).css("color", baseColor);
        $(Selectors.backgroundBaseColorSelectors).css("background-color", baseColor);
        $(Selectors.colorMutedBaseColorSelectors).css("color", mutedBaseColor);
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
                currentStyle.onBaseColorUpdated();
                //TODO: revoke onBaseColorChangedEvent
        }
}

