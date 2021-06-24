import * as ColorSelectors from './color-selectors.js'

var styleSheet;

// COLORS
var colorfull1;
var colorfull2;
var colorfull3;

export var highlightColor = "#1b63ad";
export var baseColor;
var lightBaseColor = "#EBEBEB";
var darkBaseColor = "#212529";
var mutedBaseColor;
var lightMutedBaseColor = "#b2b2b2";
var darkMutedBaseColor = "#4D4D4D";

var schemeColor = "#f1f3f6";
var lightenSchemeColor = "#ffffff";
var darkenSchemeColor = "#dcdee2";

// NEO STYLES
var pressedBoxShadow;
var flatButtonBoxShadow;
var concaveBoxShadow;
var thumbScrollbarBoxShadow;

// PSEUDO RULES
var trackScrollbarRule;
var thumbScrollbarRule;
var placeholderRule;
var papePilingTooltipRule;

export function getStyleSheet() {
        for (var i = 0; i < document.styleSheets.length; i++) {
                var cursheet = document.styleSheets[i];
                if (cursheet.title == 'style') styleSheet = cursheet;
        }
}

export function setupColorEvents() {
        setupColorPickerEvents();
        setupColorHoverEvents();
        setupColorClickEvents();

        updateHighlightColor(highlightColor);
        const cssRules = styleSheet.cssRules || styleSheet.rules;
        trackScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-track {box-shadow: ${pressedBoxShadow}; border-radius: 15px;}`)];
        thumbScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-thumb {box-shadow: ${thumbScrollbarBoxShadow}; background: ${schemeColor}; border-radius: 15px;}`)];
        placeholderRule = cssRules[styleSheet.insertRule(`.form-control::placeholder {color: ${mutedBaseColor}; opacity: 1;}`)];
        papePilingTooltipRule = cssRules[styleSheet.insertRule(`#pp-nav li .pp-tooltip  {color: ${baseColor}}`)];
        // updateSchemeColor();
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

        $(".pill-button").hover(
                function () {
                        $(this).css('box-shadow', pressedBoxShadow);
                }, function () {
                        // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                        if (!$(this).hasClass('active')) $(this).css('box-shadow', '');
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
                        $(".checkbox label[for='" + this.id + "']").css('box-shadow', flatButtonBoxShadow);
                }
                else {
                        $(this).siblings(".name").css('color', highlightColor);
                        $(".checkbox label[for='" + this.id + "']").css('box-shadow', concaveBoxShadow);
                }
        });

        // TODO: Reset box shadow for inactive buttons
        $('.pill-button').click(function () {
                $('.pill-button').not(this).css('box-shadow', '');
        });
}

function updateHighlightColor(newColor) {
        highlightColor = newColor;
        $(ColorSelectors.colorHighlightColorSelectors).css("color", highlightColor);
        $(ColorSelectors.backgroundHighlightColorSelectors).css("background-color", highlightColor);
        updateButtonsColor();
        // TODO: overide important css rule for pp
        // $("#pp-nav li .active span").each(function () { this.style.setProperty('background-color', 'red', 'important'); });
}

function getBrightFamilyColor(originalColor) {
        return [
                // tinycolor(originalColor).brighten(-20).toString(),
                tinycolor(originalColor).brighten(-10).toString(),
                tinycolor(originalColor).brighten(0).toString(),
                tinycolor(originalColor).brighten(10).toString(),
                // tinycolor(originalColor).brighten(20).toString()
        ];
}

function updateSchemeColor(newColor) {
        // update derived colors 
        schemeColor = newColor;
        lightenSchemeColor = tinycolor(schemeColor).lighten(7).toString();
        darkenSchemeColor = tinycolor(schemeColor).darken(10).toString();
        updateBaseColor();
        updateNeuStyle();
        // updateHighlightColor(tinycolor.mostReadable(schemeColor, getBrightFamilyColor(highlightColor), { includeFallbackColors: false }).toHexString());

        // update selectors
        $(ColorSelectors.backgroundSchemeColorSelectors).css("background-color", schemeColor);
        $(ColorSelectors.flatBoxShadowSelectors).css("box-shadow", flatButtonBoxShadow);
        $(ColorSelectors.pressedBoxShadowSelectors).css("box-shadow", pressedBoxShadow);
        $(ColorSelectors.concaveBoxShadowSelectors).css("box-shadow", concaveBoxShadow);
        $(ColorSelectors.colorBaseColorSelectors).css("color", baseColor);
        $(ColorSelectors.backgroundBaseColorSelectors).css("background-color", baseColor);
        $(ColorSelectors.colorMutedBaseColorSelectors).css("color", mutedBaseColor);
        updatePseudoElements();
        updateButtonsColor();
}

function updatePseudoElements() {
        trackScrollbarRule.style.boxShadow = pressedBoxShadow;
        thumbScrollbarRule.style.boxShadow = thumbScrollbarBoxShadow;
        thumbScrollbarRule.style.background = schemeColor;
        placeholderRule.style.color = mutedBaseColor;
        papePilingTooltipRule.style.color = baseColor;
}

function updateBaseColor() {
        baseColor = invertColor(schemeColor, true);
        mutedBaseColor = (baseColor == lightBaseColor) ? lightMutedBaseColor : darkMutedBaseColor;
}

function updateNeuStyle() {
        //TODO: Variablize
        const distance = '3px';
        const blur = '3px';
        flatButtonBoxShadow = `${distance} ${distance} ${blur} ${darkenSchemeColor}, -${distance} -${distance} ${blur} ${lightenSchemeColor}`;
        pressedBoxShadow = `inset ${distance} ${distance} ${blur} ${darkenSchemeColor}, inset -${distance} -${distance} ${blur} ${lightenSchemeColor}`;
        // TODO: Does not look good!
        concaveBoxShadow = `${flatButtonBoxShadow}, ${pressedBoxShadow}`;
        thumbScrollbarBoxShadow = `inset -${distance} -${distance} ${blur} ${darkenSchemeColor}, inset ${distance} ${distance} ${blur} ${lightenSchemeColor}`;
}

export function updateButtonsColor() {
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
        $("input[type='checkbox']:checked").each(
                function () {
                        $("label[for='" + this.id + "'] i").css('color', highlightColor);
                        $("label[for='" + this.id + "']").next().css('color', highlightColor);
                        $("label[for='" + this.id + "']").css('box-shadow', concaveBoxShadow);
                }
        );
        $("input[type='checkbox']:not(:checked)").each(
                function () {
                        $("label[for='" + this.id + "'] i").css('color', mutedBaseColor);
                        $("label[for='" + this.id + "']").next().css('color', mutedBaseColor);
                        $("label[for='" + this.id + "']").css('box-shadow', flatButtonBoxShadow);
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
