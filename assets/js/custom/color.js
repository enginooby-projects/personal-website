import * as ColorSelectors from './color-selectors.js'
import * as NeuModule from './neu-style.js'

var styleSheet;
var $squareImg;

// COLORS
var colorfull1;
var colorfull2;
var colorfull3;

export var highlightColor = "#227DD8";
export var baseColor;
var lightBaseColor = "#EBEBEB";
var darkBaseColor = "#212529";
var mutedBaseColor;
var lightMutedBaseColor = "#b2b2b2";
var darkMutedBaseColor = "#4D4D4D";
export var schemeColor = "#680317";// "#f1f3f6";

export const Styles = Object.freeze({ "FLAT": 1, "NEU": 2, "GLASS": 3 });
var currentStyle = Styles.NEU;

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
        initStyle();

        // init
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

        $("#scheme-color-picker").attr('value', schemeColor);
        $("#highlight-color-picker").attr('value', highlightColor);
        updateSchemeColor(schemeColor);
        updateHighlightColor(highlightColor);
}

export function updateStyle(newStyle) {
        currentStyle = newStyle;
        // update styles
        switch (currentStyle) {
                case Styles.NEU:
                        NeuModule.update();
                        console.log("neu");
                        break;
                case Styles.FLAT:
                        updateFlatStyle();
                        console.log("flat");
                        break;
        }
}

function initStyle() {
        switch (currentStyle) {
                case Styles.NEU:
                        NeuModule.init();
                        break;
                case Styles.FLAT:
                        updateFlatSty / le();
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
        $(".social a i").hover(
                function () {
                        $(this).css('color', highlightColor);
                }, function () {
                        $(this).css('color', baseColor);
                }
        );

        $(".segmented-control label, .checkbox i").hover(
                function () {
                        $(this).css('color', highlightColor);
                }, function () {
                        var id = $(this).attr("for"); // radio
                        if (!id) id = $(this).parent().attr("for"); // checkbox
                        // reset color if the  button not checked
                        if (!$("#" + id).prop("checked")) $(this).css('color', mutedBaseColor);
                }
        );
}

function setupColorClickEvents() {
        $("#test1").click(function () {
                updateHighlightColor(tinycolor(highlightColor).saturate().toString());
                console.log(tinycolor.readability(schemeColor, highlightColor));
                // $("#highlight-color-picker").value = highlightColor;
        });

        $("#test2").click(function () {
                updateHighlightColor(tinycolor(highlightColor).saturate(-10).toString());
                console.log(tinycolor.readability(schemeColor, highlightColor));
                // $("#highlight-color-picker").value = highlightColor;

        });

        $("#color-switcher .pallet-button").click(function () {
                $("#color-switcher .color-pallet").toggleClass('show');
        });

        // reset color for unchecked buttons
        $(".segmented-control input").click(function () {
                $(".segmented-control input[type='radio']:not(:checked)").each(
                        function () {
                                $(".segmented-control label[for='" + this.id + "']").css('color', mutedBaseColor);
                        }
                );
        });

        $(".checkbox input").click(function () {
                if (!$(this).prop("checked")) {
                        $(this).siblings(".name").css('color', mutedBaseColor);
                        $(".checkbox label[for='" + this.id + "']").css('box-shadow', unpressedBoxShadow);
                }
                else {
                        $(this).siblings(".name").css('color', highlightColor);
                        $(".checkbox label[for='" + this.id + "']").css('box-shadow', concaveBoxShadow);
                }
        });

        // TODO: Reset box shadow for inactive buttons
        $('#portfolio .pill-button').click(function () {
                $('#portfolio .pill-button').not(this).css('box-shadow', '');
        });
}

function updateHighlightColor(newColor) {
        highlightColor = newColor;
        $(ColorSelectors.colorHighlightColorSelectors).css("color", highlightColor);
        $(ColorSelectors.backgroundHighlightColorSelectors).css("background-color", highlightColor);
        updateRadioStates();
        updateCheckboxShadows();
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

function updateFlatStyle() {
        updateFlatElements();
}

function updateFlatElements() {
        $(ColorSelectors.noneBoxShadowSelectors).css('box-shadow', 'none');
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
        baseColor = invertColor(schemeColor, true);
        mutedBaseColor = (baseColor == lightBaseColor) ? lightMutedBaseColor : darkMutedBaseColor;
        const heroImg = (baseColor == lightBaseColor) ? "light-element_square" : "dark-element_square";
        $squareImg.attr('src', `assets/img/${heroImg}.png`);
}

export function updateRadioStates() {
        $("input[type='radio']:checked").each(
                function () {
                        $("label[for='" + this.id + "']").css('color', highlightColor);
                }
        );
        $("input[type='radio']:not(:checked)").each(
                function () {
                        $("label[for='" + this.id + "']").css('color', mutedBaseColor);
                }
        );
}

export function updateCheckboxShadows() {
        $("input[type='checkbox']:checked").each(
                function () {
                        $("label[for='" + this.id + "'] i").css('color', highlightColor);
                        $("label[for='" + this.id + "']").next().css('color', highlightColor);
                        // $("label[for='" + this.id + "']").css('box-shadow', concaveBoxShadow);
                }
        );
        $("input[type='checkbox']:not(:checked)").each(
                function () {
                        $("label[for='" + this.id + "'] i").css('color', mutedBaseColor);
                        $("label[for='" + this.id + "']").next().css('color', mutedBaseColor);
                        // $("label[for='" + this.id + "']").css('box-shadow', unpressedBoxShadow);
                }
        );
}

function invertColor(hex, isBlackWhite) {
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
