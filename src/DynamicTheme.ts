import * as ColorSelectors from './color-selectors.js'
import { Style } from './Style.js'
import { StyleRegistry } from './StyleRegistry.js';
import { Color, lightBaseValue } from './Color.js';
import { TinyColor } from './TinyColor.js';

let styleSheet: CSSStyleSheet;
let $squareImg: JQuery<HTMLElement>;

let borderRadius: number = 15;

// COLORFULL
let colorfull1: Color = new TinyColor("#00a584");
let colorfull2: Color = new TinyColor("#ebbc00");
let colorfull3: Color = new TinyColor("#e93666");

export let schemeColor: Color = new TinyColor("#680317");
export let highlightColor: Color = new TinyColor("#227DD8");
export let baseColor: string;
export let mutedBaseColor: string;
const lightMutedBaseColor: string = "#b2b2b2";
const darkMutedBaseColor: string = "#4D4D4D";

export let currentStyle: Style;
let styleRegistry: StyleRegistry;

// PSEUDO RULES
export let trackScrollbarRule: CSSStyleRule;
export let thumbScrollbarRule: CSSStyleRule;
export let sliderThumbRule: CSSStyleRule;
export let sliderThumbFocusRule: CSSStyleRule;
export let colorSwatchRule: CSSStyleRule;

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

export function changeStyle(htmlElement: HTMLElement | JQuery<HTMLElement>, newStyle: Style) {
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
        const cssRules = styleSheet.cssRules || styleSheet.rules;
        trackScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-track {border-radius: 15px;}`)] as CSSStyleRule;
        thumbScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-thumb {background: ${schemeColor}; border-radius: 15px;}`)] as CSSStyleRule;
        placeholderRule = cssRules[styleSheet.insertRule(`.form-control::placeholder {color: ${mutedBaseColor}; opacity: 1;}`)] as CSSStyleRule;
        papePilingTooltipRule = cssRules[styleSheet.insertRule(`#pp-nav li .pp-tooltip  {color: ${baseColor}}`)] as CSSStyleRule;
        sliderThumbRule = cssRules[styleSheet.insertRule(`.range-slider__range::-webkit-slider-thumb {background:${schemeColor}; border-radius: ${borderRadius}}`)] as CSSStyleRule;
        sliderThumbFocusRule = cssRules[styleSheet.insertRule(`.range-slider__range.focus::-webkit-slider-thumb {background:${schemeColor};border-radius: ${borderRadius}}`)] as CSSStyleRule;
        colorSwatchRule = cssRules[styleSheet.insertRule(`::-webkit-color-swatch{}`)] as CSSStyleRule;

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
                updateHighlightColor((event.target as any).value);
        });
        $("#scheme-color-picker").on('input', function (event) {
                updateSchemeColor((event.target as any).value);
        });
        $("#colorfull1-picker").on('input', function (event) {
                updateColorfull1((event.target as any).value);
        });
        $("#colorfull2-picker").on('input', function (event) {
                updateColorfull2((event.target as any).value);
        });
        $("#colorfull3-picker").on('input', function (event) {
                updateColorfull3((event.target as any).value);
        });
}

function updateColorfull1(hex: string) {
        colorfull1.setHex(hex);
        $('.colorfull1, .background-colorfull1>.badge').css('color', colorfull1.hex);
        $('.background-colorfull1').css('background-color', colorfull1.hex);
        $('.background-colorfull1').css('color', colorfull1.getInvertBlackWhite());
        $('#education-timeline .timeline-item').css('border-left-color', colorfull1.hex);
        $('.badge-pill.background-colorfull1 .badge').css('background', colorfull1.getInvertBlackWhite());
}

function updateColorfull2(hex: string) {
        colorfull2.setHex(hex);
        $('.colorfull2, .background-colorfull2>.badge').css('color', colorfull2.hex);
        $('.background-colorfull2').css('background-color', colorfull2.hex);
        $('.background-colorfull2').css('color', colorfull2.getInvertBlackWhite());
        $('#experience-timeline .timeline-item').css('border-left-color', colorfull2.hex);
        $('.badge-pill.background-colorfull2 .badge').css('background', colorfull2.getInvertBlackWhite());
}

function updateColorfull3(hex: string) {
        colorfull3.setHex(hex);
        $('.colorfull3, .background-colorfull3>.badge').css('color', colorfull3.hex);
        $('.background-colorfull3').css('background-color', colorfull3.hex);
        $('.background-colorfull3').css('color', colorfull3.getInvertBlackWhite());
        $('#achievements-timeline .timeline-item').css('border-left-color', colorfull3.hex);
        $('.badge-pill.background-colorfull3 .badge').css('background', colorfull3.getInvertBlackWhite());
}

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
                if (!$("#" + id).prop("checked")) $(this).css('color', mutedBaseColor);
        });

        $(".checkbox i")
                .on('mouseenter', function () {
                        $(this).css('color', highlightColor.hex);
                }).on('mouseleave', function () {
                        let id = $(this).parent().attr("for");
                        // reset color if the  button not checked
                        if (!$("#" + id).prop("checked")) $(this).css('color', mutedBaseColor);
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
                $(".segmented-control input[type='radio']:not(:checked)").each(
                        function () {
                                $(".segmented-control label[for='" + this.id + "']").css('color', mutedBaseColor);
                        }
                );
        });
        $('#portfolio .pill-button').on('click', function (this: HTMLElement) {
                currentStyle.resetUncheckedButtons(this);
        });
}

function updateHighlightColor(hex: string) {
        highlightColor.setHex(hex);
        $(ColorSelectors.colorHighlightColorSelectors).css("color", highlightColor.hex);
        $(ColorSelectors.backgroundHighlightColorSelectors).css("background-color", highlightColor.hex);
        currentStyle.updateRadioUI();
        currentStyle.updateCheckboxUI();
        currentStyle.update();
}

function updateSchemeColor(hex: string) {
        schemeColor.setHex(hex);
        updateBaseColor();

        // update selectors
        $(ColorSelectors.backgroundSchemeColorSelectors).css("background-color", schemeColor.hex);
        $(ColorSelectors.colorBaseColorSelectors).css("color", baseColor);
        $(ColorSelectors.backgroundBaseColorSelectors).css("background-color", baseColor);
        $(ColorSelectors.colorMutedBaseColorSelectors).css("color", mutedBaseColor);
        updatePseudoElements();
        currentStyle.update();
}

function updatePseudoElements() {
        thumbScrollbarRule.style.background = schemeColor.hex;
        placeholderRule.style.color = mutedBaseColor;
        papePilingTooltipRule.style.color = baseColor;
}

function updateBaseColor() {
        const lastBaseColor = baseColor;
        baseColor = schemeColor.getInvertBlackWhite();
        console.log(`Base color: ${baseColor}`);
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
        $(ColorSelectors.borderRadiusSelectors).css('border-radius', borderRadius);
        // TODO; not working
        // sliderThumbRule.style.borderRadius = borderRadius.toString();         
        // thumbScrollbarRule.style.borderRadius = borderRadius.toString();
        // trackScrollbarRule.style.borderRadius = borderRadius.toString();
}

