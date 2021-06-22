var baseColor = "#1b63ad";
var schemeColor = "#f1f3f6";
var lightenSchemeColor = "#ffffff";
var darkenSchemeColor = "#dcdee2";
var contractSchemeColor = "#000";

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
        $("#base-color-picker").on('input', function (event) {
                baseColor = event.target.value;
                updateBaseColor();
        });

        $("#scheme-color-picker").on('input', function (event) {
                schemeColor = event.target.value;
                updateSchemeColor();
        });

        $("#color-switcher .pallet-button").click(function () {
                $("#color-switcher .color-pallet").toggleClass('show')
        });

        $(".social a i, .segmented-control label, .checkbox i")
                .hover(
                        function () {
                                $(this).css('color', baseColor);
                        }, function () {
                                var id = $(this).attr("for"); // radio
                                if (!id) id = $(this).parent().attr("for"); // checkbox
                                // reset color if the  button not checked
                                if (!$("#" + id).prop("checked"))
                                        // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                        $(this).css('color', '');
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
                if (!$(this).prop("checked")) $(this).siblings(".name").css('color', '')
                else {
                        $(this).siblings(".name").css('color', baseColor);
                        $(this).siblings("label").child().css('color', baseColor);
                }
        });
}

export function updateBaseColor() {
        updateButtonsColor();
        $(".base-color, .pill-button, .overlay-menu a.active, .timeline-year, .portfolio .portfolio-filter li a, .portfolio .portfolio-icon a i , .contact .form-item .form-control")
                .css("color", baseColor);
        $(".bg-base-color, .border-style, .timeline-icon, .flat-demo .button-border, .dark - scheme.flat - demo.button - border, .flat-demo .pill-button.active, .dark-scheme #pp-nav li .active span, element.style")
                .css("background-color", baseColor);
        // TODO: overide important css rule for pp
        // $("#pp-nav li .active span").each(function () { this.style.setProperty('background-color', 'red', 'important'); });
}

function updateSchemeColor() {
        const backgroundSelectorsArray = [
                ".section",
                ".button-border",
                ".box-border",
                ".segmented-control",
                ".image-border",
                ".form-group",
                ".skill-box .skillbar",
                ".pallet-button"
        ];
        const boxShadowSelectorsArray = [
                ".button-border",
        ];
        const darkenSelectorsArray = [
                ".button-border",
        ];

        const backgroundSelectors = backgroundSelectorsArray.join(", ");
        const boxShadowSelectors = boxShadowSelectorsArray.join(", ");

        lightenSchemeColor = tinycolor(schemeColor).lighten(7).toString();
        darkenSchemeColor = tinycolor(schemeColor).darken(10).toString();

        const boxShadow = `3px 3px 3px ${darkenSchemeColor}, -3px -3px 3px ${lightenSchemeColor}`;

        $(backgroundSelectors).css("background-color", schemeColor);
        $(boxShadowSelectors).css("box-shadow", boxShadow);
}


export function updateButtonsColor() {
        $("input[type='radio']:checked").each(
                function () {
                        $("label[for='" + this.id + "']").css('color', baseColor);
                }
        );
        $("input[type='radio']:not(:checked)").each(
                function () {
                        $("label[for='" + this.id + "']").css('color', '');
                }
        );
        $("input[type='checkbox']:checked").each(
                function () {
                        $("label[for='" + this.id + "'] i").css('color', baseColor);
                        $("label[for='" + this.id + "']").next().css('color', baseColor);
                }
        );
        $("input[type='checkbox']:not(:checked)").each(
                function () {
                        $("label[for='" + this.id + "'] i").css('color', '');
                        $("label[for='" + this.id + "']").next().css('color', '');
                }
        );
}