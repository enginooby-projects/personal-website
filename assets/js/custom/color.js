import * as ColorSelectors from './color-selectors.js'
import * as NeuModule from './neu-style.js'
import * as FlatModule from './flat-style.js'
import * as GlassModule from './glass-style.js'

var styleSheet;
var $squareImg;

// COLORS
var colorfull1;
var colorfull2;
var colorfull3;

export var schemeColor = "#680317";// "#f1f3f6";
export var highlightColor = "#227DD8";
export var baseColor;
export var mutedBaseColor;
const lightBaseColor = "#EBEBEB";
const darkBaseColor = "#212529";
const lightMutedBaseColor = "#b2b2b2";
const darkMutedBaseColor = "#4D4D4D";

export const Styles = Object.freeze({ "FLAT": 1, "NEU": 2, "GLASS": 3 });
export var currentStyle = Styles.NEU;

// FLAT STYLE
var flatBoxShadow;

// PSEUDO RULES
export var trackScrollbarRule;
export var thumbScrollbarRule;
var placeholderRule;
var papePilingTooltipRule;
var selectionRule;
var selectionOldFirefoxRule;

function getStyleSheet() {
        for (var i = 0; i < document.styleSheets.length; i++) {
                var cursheet = document.styleSheets[i];
                if (cursheet.title == 'style') styleSheet = cursheet;
        }
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
        const selectionbackgroud = tinycolor(highlightColor).setAlpha(0.3).toRgbString();
        if (window.chrome) {
                console.log("chrome");
                selectionRule = cssRules[styleSheet.insertRule(`::selection  {background: ${selectionbackgroud}}`)];
        }
        // selectionOldFirefoxRule = cssRules[styleSheet.insertRule(`::-moz-selection  {background: ${selectionbackgroud}}`)];
        // selectionOldFirefoxRule = cssRules[styleSheet.insertRule(`::-moz-selection  {background: ${highlightColor}}`)];

        initStyle();
        $("#scheme-color-picker").attr('value', schemeColor);
        $("#highlight-color-picker").attr('value', highlightColor);
        updateSchemeColor(schemeColor);
        updateHighlightColor(highlightColor);
}

export function updateStyle(newStyle) {
        currentStyle = newStyle;
        // TODO: use interface
        switch (currentStyle) {
                case Styles.NEU:
                        NeuModule.update();
                        break;
                case Styles.FLAT:
                        FlatModule.update();
                        break;
                case Styles.GLASS:
                        GlassModule.update();
                        break;
        }
}

function initStyle() {
        switch (currentStyle) {
                case Styles.NEU:
                        NeuModule.init();
                        break;
                case Styles.FLAT:
                        FlatModule.init();
                        break;
                case Styles.GLASS:
                        GlassModule.init();
                        break;
        }
}

function setupEvents() {
        setupColorPickerEvents();
        setupColorHoverEvents();
        setupColorClickEvents();
}

function setupColorPickerEvents() {
        $("#highlight-color-picker").on('input', function (event) {
                updateHighlightColor(event.target.value);
                console.log(tinycolor.readability(schemeColor, highlightColor));
        });

        $("#scheme-color-picker").on('input', function (event) {
                updateSchemeColor(event.target.value);
                console.log(tinycolor.readability(schemeColor, highlightColor));
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
                        var id = $(this).attr("for");
                        if (currentStyle == Styles.NEU) $(this).css('color', highlightColor);
                        if (currentStyle == Styles.FLAT && !$("#" + id).prop("checked")) $(this).css('color', highlightColor);
                }, function () {
                        var id = $(this).attr("for");
                        // reset color if the  button not checked
                        if (!$("#" + id).prop("checked")) $(this).css('color', mutedBaseColor);
                }
        );

        $(".checkbox i").hover(
                function () {
                        $(this).css('color', highlightColor);
                }, function () {
                        var id = $(this).parent().attr("for");
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

        $('#portfolio .pill-button').click(resetUncheckedButtons);
}

function resetUncheckedButtons() {
        if (currentStyle == Styles.NEU) $('#portfolio .pill-button').not(this).css('box-shadow', '');
        if (currentStyle == Styles.FLAT) $('#portfolio .pill-button').not(this).css('background', 'transparent');
}

function updateHighlightColor(newColor) {
        highlightColor = newColor;
        $(ColorSelectors.colorHighlightColorSelectors).css("color", highlightColor);
        $(ColorSelectors.backgroundHighlightColorSelectors).css("background-color", highlightColor);
        updateRadioUI();
        updateCheckboxUI();
        updateStyle(currentStyle);
        // TODO: overide important css rule for pp
        // $("#pp-nav li .active span").each(function () { this.style.setProperty('background-color', 'red', 'important'); });
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

        updateStyle(currentStyle);
}

function updatePseudoElements() {
        thumbScrollbarRule.style.background = schemeColor;
        placeholderRule.style.color = mutedBaseColor;
        papePilingTooltipRule.style.color = baseColor;
        if (window.chrome) {
                selectionRule.background = tinycolor(highlightColor).setAlpha(0.3).toRgbString();
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
                updateRadioUI();
                updateCheckboxUI();
        }
}

export function updateRadioUI() {
        switch (currentStyle) {
                case Styles.NEU:
                        NeuModule.updateRadioUI();
                        break;
                case Styles.FLAT:
                        FlatModule.updateRadioUI();
                        break;
                case Styles.GLASS:
                        GlassModule.updateRadioUI();
                        break;
        }
}

export function updateCheckboxUI() {
        switch (currentStyle) {
                case Styles.NEU:
                        NeuModule.updateCheckboxUI();
                        break;
                case Styles.FLAT:
                        FlatModule.updateCheckboxUI();
                        break;
                case Styles.GLASS:
                        GlassModule.updateCheckboxUI();
                        break;
        }
}

export function invertColor(hex, isBlackWhite) {
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
        var r = parseInt(hex.slice(0, 2), 16),
                g = parseInt(hex.slice(2, 4), 16),
                b = parseInt(hex.slice(4, 6), 16);
        if (isBlackWhite) {
                // http://stackoverflow.com/a/3943023/112731
                return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? darkBaseColor : lightBaseColor;
        }
        // invert color components
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        // pad each with zeros and return
        return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
}
