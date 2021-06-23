// buttons: radios, checkboxes

var baseColor;
var highlightColor = "#1b63ad";
var schemeColor = "#f1f3f6";
var lightenSchemeColor = "#ffffff";
var darkenSchemeColor = "#dcdee2";
var contrastSchemeColor = "#000"; // -> baseColor
var colorfull1;
var colorfull2;
var colorfull3;

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
        $(".social a i, .segmented-control label, .checkbox i")
                .hover(
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
                        });
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
}

export function updateHighlightColor() {
        updateButtonsColor();

        const colorSelectors = [
                ".base-color",
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

        const backgroundSelectors = [
                ".section",
                ".button-border",
                ".box-border",
                ".segmented-control",
                ".image-border",
                ".form-group",
                ".skill-box .skillbar",
                ".pallet-button"
        ];
        const boxShadowSelectors = [
                ".button-border",
        ];

        //TODO: Parameterize
        const boxShadow = `3px 3px 3px ${darkenSchemeColor}, -3px -3px 3px ${lightenSchemeColor}`;

        $(formatString(backgroundSelectors)).css("background-color", schemeColor);
        $(formatString(boxShadowSelectors)).css("box-shadow", boxShadow);
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