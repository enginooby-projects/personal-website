// buttons: radios, checkboxes

var baseColor; // texts, icons
var lightBaseColor = "#EBEBEB";
var darkBaseColor = "#212529";
var mutedBaseColor;
var lightMutedBaseColor = "#DBDBDB";
var darkMutedBaseColor = "#4D4D4D";

var highlightColor = "#1b63ad";
var schemeColor = "#f1f3f6";
var lightenSchemeColor = "#ffffff";
var darkenSchemeColor = "#dcdee2";
var contrastSchemeColor = "#000"; // -> baseColor
var colorfull1;
var colorfull2;
var colorfull3;

// NEO style
var pressedBoxShadow;
var flatButtonBoxShadow;
var concaveBoxShadow;
var thumbScrollbarBoxShadow;

// TODO: Remove
function ColorPallet() {
        "use strict";
        $("ul.pattern .color1").click(function () {
                return $("#option-color").attr("href", "assets/css/color/green-color.css")
        });
        $("ul.pattern .color2").click(function () {
                return $("#option-color").attr("href", "assets/css/color/yellow-color.css")
        });
        $("ul.pattern .color3").click(function () {
                return $("#option-color").attr("href", "assets/css/color/golden-color.css")
        });
        $("ul.pattern .color4").click(function () {
                return $("#option-color").attr("href", "assets/css/color/sky-blue-color.css")
        });
        $("ul.pattern .color5").click(function () {
                return $("#option-color").attr("href", "assets/css/color/blue-color.css")
        });
        $("ul.pattern .color6").click(function () {
                return $("#option-color").attr("href", "assets/css/color/purple-color.css")
        });
        $("ul.pattern .color7").click(function () {
                return $("#option-color").attr("href", "assets/css/color/orange-color.css")
        });
        $("ul.pattern .color8").click(function () {
                return $("#option-color").attr("href", "assets/css/color/pink-color.css")
        });
        $("ul.pattern .color9").click(function () {
                return $("#option-color").attr("href", "assets/css/color/red-color.css")
        });
        $("#color-switcher .pallet-button").click(function () {
                $("#color-switcher .color-pallet").toggleClass('show')
        });
}

export function setupColorEvents() {
        setupPickerEvents();
        setupColorHoverEvents();
        setupColorClickEvents();
        updateHighlightColor();
        // updateSchemeColor();
}

function setupPickerEvents() {
        $("#highlight-color-picker").on('input', function (event) {
                highlightColor = event.target.value;
                updateHighlightColor();
        });

        $("#scheme-color-picker").on('input', function (event) {
                schemeColor = event.target.value;
                updateSchemeColor();
        });
}

function setupColorHoverEvents() {
        $("").hover(
                function () {

                }, function () {

                }
        );

        $(".social a i, .segmented-control label, .checkbox i").hover(
                function () {
                        $(this).css('color', highlightColor);
                }, function () {
                        var id = $(this).attr("for"); // radio
                        if (!id)
                                id = $(this).parent().attr("for"); // checkbox

                        // reset color if the  button not checked
                        if (!$("#" + id).prop("checked"))
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                $(this).css('color', '');
                }
        );

        $(".pill-button").hover(
                function () {
                        $(this).css('box-shadow', pressedBoxShadow);
                }, function () {
                        if (!$(this).hasClass('active')) $(this).css('box-shadow', '');
                }
        );
}

function setupColorClickEvents() {
        $("#color-switcher .pallet-button").click(function () {
                $("#color-switcher .color-pallet").toggleClass('show');
        });

        // reset color for unchecked buttons
        $(".segmented-control input").click(function () {
                $(".segmented-control input[type='radio']:not(:checked)").each(
                        function () {
                                $(".segmented-control label[for='" + this.id + "']").css('color', '');
                        }
                );
        });

        $(".checkbox input").click(function () {
                if (!$(this).prop("checked"))
                        $(this).siblings(".name").css('color', '');
                else {
                        $(this).siblings(".name").css('color', highlightColor);
                        $(this).siblings("label").child().css('color', highlightColor);
                }
        });

        // TODO: Reset box shadow for inactive buttons
        $('.pill-button').click(function () {
                $('.pill-button').each(function () {
                        if (!$(this).hasClass('active')) {
                                // $(this).css('box-shadow', '');
                        } else {
                                // $(this).css('box-shadow', pressedButtonBoxShadow);
                        }
                });
        });
}

export function updateHighlightColor() {
        updateButtonsColor();

        const colorSelectors = [
                ".highlight-color",
                ".pill-button",
                ".overlay-menu a.active",
                ".timeline-year",
                ".portfolio .portfolio-filter li a",
                ".portfolio .portfolio-icon a i",
                ".contact .form-item .form-control",
        ];
        const backgroundSelectors = [
                ".bg-base-color",
                ".border-style",
                ".timeline-icon",
                ".flat-demo .button-border",
                ".dark - scheme.flat - demo.button - border",
                ".flat-demo .pill-button.active",
                ".dark-scheme #pp-nav li .active span",
        ];

        $(formatString(colorSelectors)).css("color", highlightColor);
        $(formatString(backgroundSelectors)).css("background-color", highlightColor);
        // TODO: overide important css rule for pp
        // $("#pp-nav li .active span").each(function () { this.style.setProperty('background-color', 'red', 'important'); });
}

function updateSchemeColor() {
        lightenSchemeColor = tinycolor(schemeColor).lighten(7).toString();
        darkenSchemeColor = tinycolor(schemeColor).darken(10).toString();
        updateBaseColor();
        updateNeuStyle();

        const backgroundSchemeSelectors = [
                ".section",
                ".button-border",
                ".box-border",
                ".segmented-control",
                ".image-border",
                ".form-group",
                ".skill-box .skillbar",
                ".pallet-button",
                ".blog .blog-image",
        ];
        const flatBoxShadowSelectors = [
                ".button-border",
                ".box-border",
                ".image-border",
                ".segmented-control",
                ".hero-03 .personal-image img",
                ".checkbox label",
                ".blog-intro"
        ];
        const pressedBoxShadowSelectors = [
                ".pill-button.active",
                ".custom-scrollbar",
        ];
        const concaveBoxShadowSelectors = [
                // ".pill-button.active",
                ".skill-box .skillbar",
                ".form-group",
        ];
        const colorBaseSelectors = [
                "body",
                ".logo",
                ".color-switcher .pallet-button i",
                ".follow-label",
                ".social a",
                ".segmented-control label",
                ".blog-content h6 a",
                ".form-group input",
                ".form-group textarea",
                ".overlay-menu-toggler",
        ];
        const backgroundBaseSelectors = [
                "#pp-nav li span",
        ];
        const mutedBaseColorSelectors = [
                ".blog-content .list-inline-item span",
                ".contact-info-text small",
                ".hero-content p"
        ];

        updateScrollBar();
        $(formatString(backgroundSchemeSelectors)).css("background-color", schemeColor);
        $(formatString(flatBoxShadowSelectors)).css("box-shadow", flatButtonBoxShadow);
        $(formatString(pressedBoxShadowSelectors)).css("box-shadow", pressedBoxShadow);
        $(formatString(concaveBoxShadowSelectors)).css("box-shadow", concaveBoxShadow);
        $(formatString(colorBaseSelectors)).css("color", baseColor);
        $(formatString(backgroundBaseSelectors)).css("background-color", baseColor);
        $(formatString(mutedBaseColorSelectors)).css("color", mutedBaseColor);
        // updateButtonsColor();
}

function updateScrollBar() {
        for (var i = 0; i < document.styleSheets.length; i++) {
                var cursheet = document.styleSheets[i];
                if (cursheet.title == 'style') {
                        cursheet.addRule("::-webkit-scrollbar-track", `box-shadow: ${pressedBoxShadow}`);
                        cursheet.addRule("::-webkit-scrollbar-thumb", `box-shadow: ${thumbScrollbarBoxShadow}; background: ${schemeColor}`);
                }
        }
}

function updateBaseColor() {
        baseColor = getContrast(schemeColor);
        mutedBaseColor = (baseColor == lightBaseColor) ? lightMutedBaseColor : darkMutedBaseColor;
}

function updateNeuStyle() {
        //TODO: Variablize
        const distance = '3px';
        const blur = '3px';
        flatButtonBoxShadow = `${distance} ${distance} ${blur} ${darkenSchemeColor}, -${distance} -${distance} ${blur} ${lightenSchemeColor}`;
        pressedBoxShadow = `inset ${distance} ${distance} ${blur} ${darkenSchemeColor}, inset -${distance} -${distance} ${blur} ${lightenSchemeColor}`;
        concaveBoxShadow = `${flatButtonBoxShadow}, ${pressedBoxShadow}`;
        thumbScrollbarBoxShadow = `inset -${distance} -${distance} ${blur} ${darkenSchemeColor}, inset ${distance} ${distance} ${blur} ${lightenSchemeColor}`;
}

function formatString(selectorsArray) {
        return selectorsArray.join(", ");
}

export function updateButtonsColor() {
        $("input[type='radio']:checked").each(
                function () {
                        $("label[for='" + this.id + "']").css('color', highlightColor);
                }
        );
        $("input[type='radio']:not(:checked)").each(
                function () {
                        $("label[for='" + this.id + "']").css('color', '');
                }
        );
        $("input[type='checkbox']:checked").each(
                function () {
                        $("label[for='" + this.id + "'] i").css('color', highlightColor);
                        $("label[for='" + this.id + "']").next().css('color', highlightColor);
                }
        );
        $("input[type='checkbox']:not(:checked)").each(
                function () {
                        $("label[for='" + this.id + "'] i").css('color', '');
                        $("label[for='" + this.id + "']").next().css('color', '');
                }
        );
}

/*!
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
var getContrast = function (hexcolor) {

        // If a leading # is provided, remove it
        if (hexcolor.slice(0, 1) === '#') {
                hexcolor = hexcolor.slice(1);
        }

        // If a three-character hexcode, make six-character
        if (hexcolor.length === 3) {
                hexcolor = hexcolor.split('').map(function (hex) {
                        return hex + hex;
                }).join('');
        }

        // Convert to RGB value
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);

        // Get YIQ ratio
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        // Check contrast
        return (yiq >= 128) ? darkBaseColor : lightBaseColor;
};