import * as ColorModule from './color.js';

var blur = '16px';
var transparency = '0.5'

var lightenSchemeColor = "#680317";
var darkenSchemeColor = "#680317";
const lightenIntensity = 5;
const darkenIntensity = 5;

const noneBoxShadowSelectors = formatString([
        ".glass-style .image-border",
        ".glass-style .button-border",
        ".hero-03 .personal-image img",
        ".glass-style .box-border",
        ".glass-style .box-hover-border",
        ".glass-style .contact .form-item .form-group",
        ".checkbox label",//
        ".segmented-control", //
        ".radio-selection",
        ".glass-style .portfolio-filter .pill-button.active",
        ".glass-style .blog-intro",
        ".glass-style .blog .blog-image .after",
        ".glass-style .skill-box .skillbar",
        ".glass-style .pallet-border",
        ".glass-style .pallet-button",
        // ".glass-style .image-border",
]);

const backgroundGlassSelectors = formatString([
        " .button-border",
        " .box-border",
        ".box-hover-border",
        " .contact .form-item .form-group",
        ".pill-button.active",
        ".segmented-control",
        ".checkbox label",
        ".pallet-border",
        ".neo-skin"
]);


function formatString(selectorsArray) {
        return selectorsArray.join(", ");
}

$(document).ready(function () {
        "use strict";

        $('.theme-skin li .glass-skin').click(function () {
                init();
                ColorModule.updateStyle(ColorModule.Styles.GLASS);
        });
});

export function init() {
        $("body").addClass('glass-style');
        $('.theme-skin li a').removeClass('active'); // option button
        $(this).addClass('active');
        setupHoverEvents();
        setupClickEvents();
        updateRadioUI();
        $(".customizer").hide();
        $("#glass-customizer").show();

        $(".section").css({
                'background': '#0f2027', // fallback for old browsers
                'background': '-webkit-linear-gradient(to right, #0f2027, #203a43, #2c5364)', /* Chrome 10-25, Safari 5.1-6 */
                'background': 'linear-gradient(to right, #0f2027, #203a43, #2c5364)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        });

        $(backgroundGlassSelectors).css({
                'backdrop-filter': `blur(${blur})`,
                '-webkit-backdrop-filter': `blur(${blur})`,
                // 'opacity': `${transparency}`,
                'background-color': `rgba(255, 255, 255, ${transparency})`,
                // 'border-radius': '24px',
                'border': '1px solid rgba(209, 213, 219, 0.3)',
        });
}

function setupHoverEvents() {
        $(" .pill-button").off('mouseenter mouseleave').hover(
                function () {
                        $(this).css('background', tinycolor(ColorModule.highlightColor).darken(15).toString());
                }, function () {
                        // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                        if (!$(this).hasClass('active')) $(this).css('background', '');
                }
        );

        $(" .pallet-button").off('mouseenter mouseleave');

        $(" .portfolio-filter .pill-button").off('mouseenter mouseleave').hover(
                function () {
                        $(this).css('background', ColorModule.highlightColor);
                }, function () {
                        // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                        if (!$(this).hasClass('active')) $(this).css('background', '');
                }
        );
        // $(".portfolio-filter .pill-button").off('mouseenter mouseleave');
}

function setupClickEvents() {
        $(".segmented-control input").off('click').click(function () {
                $(".segmented-control label[for='" + this.id + "']").css('color', ColorModule.baseColor);
                $(".segmented-control input[type='radio']:not(:checked)").each(
                        function () {
                                $(".segmented-control label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
                        }
                );
        });

        $(".checkbox input").off('click').click(function () {
                if (!$(this).prop("checked")) {
                        $(this).siblings(".name").css('color', ColorModule.mutedBaseColor);
                }
                else {
                        $(this).siblings(".name").css('color', ColorModule.highlightColor);
                }
        });
}

export function update() {
        applyStyle();
}

function applyStyle() {
        $(noneBoxShadowSelectors).css('box-shadow', 'none');
}

export function updateRadioUI() {
        $("input[type='radio']:checked").each(
                function () {
                        $("label[for='" + this.id + "']").css('color', ColorModule.invertColor(ColorModule.highlightColor, true));
                }
        );
        $("input[type='radio']:not(:checked)").each(
                function () {
                        $("label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
                }
        );
}