import * as ColorModule from './color.js';

var lightenSchemeColor = "#680317";
var darkenSchemeColor = "#680317";
const lightenIntensity = 5;
const darkenIntensity = 5;


const noneBoxShadowSelectors = formatString([
        ".flat-demo .image-border",
        ".flat-demo .button-border",
        ".hero-03 .personal-image img",
        ".flat-demo .box-border",
        ".flat-demo .box-hover-border",
        ".flat-demo .contact .form-item .form-group",
        ".checkbox label",//
        ".segmented-control", //
        ".radio-selection",
        ".flat-demo .portfolio-filter .pill-button.active",
        ".flat-demo .blog-intro",
        ".flat-demo .blog .blog-image .after",
        ".flat-demo .skill-box .skillbar",
]);

const backgroundHighlightColorSelectors = formatString([
        ".flat-demo .button-border",
        ".radio-selection",
        ".flat-demo .portfolio-filter .pill-button.active",
]);

const backgroundLightenSchemeColorSelectors = formatString([
        ".flat-demo .box-border",
        ".flat-demo .image-border",
        ".flat-demo .box-hover-border",
        ".flat-demo .contact .form-item .form-group",
        ".flat-demo .segmented-control",
        ".flat-demo .checkbox label"
]);

const backgroundSchemeColorSelectors = formatString([
        // ".flat-demo .portfolio-filter .pill-button.active",
]);

const colorBaseColorSelectors = formatString([
        ".flat-demo .portfolio-filter .pill-button ",
]);

const backgroundTransparentSelectors = formatString([
        ".flat-demo .portfolio-filter .pill-button:not(.active)",
        ".flat-demo .portfolio-filter .button-border",
        ".flat-demo .testimonial .owl-carousel .testimonial-image",
]);

function formatString(selectorsArray) {
        return selectorsArray.join(", ");
}

$(document).ready(function () {
        "use strict";
        $('.theme-skin li .flat-skin').click(function () {
                init();
                ColorModule.updateStyle(ColorModule.Styles.FLAT);
        });
});

export function init() {
        $("body").addClass('flat-demo');
        $('.theme-skin li a').removeClass('active'); // option button
        $(this).addClass('active');
        setupHoverEvents();
        setupClickEvents();
        updateRadioStates();
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
        // TODO: variablize
        lightenSchemeColor = tinycolor(ColorModule.schemeColor).lighten(lightenIntensity).toString();
        darkenSchemeColor = tinycolor(ColorModule.schemeColor).darken(darkenIntensity).toString();
        applyStyle();
}

function applyStyle() {
        $(".flat-demo :not(.portfolio-filter) .pill-button").css('color', ColorModule.invertColor(ColorModule.highlightColor, true));
        $(backgroundLightenSchemeColorSelectors).css('background', lightenSchemeColor);
        $(backgroundHighlightColorSelectors).css('background', ColorModule.highlightColor);
        $(backgroundTransparentSelectors).css('background', 'transparent');
        $(colorBaseColorSelectors).css('color', ColorModule.baseColor);
        $(noneBoxShadowSelectors).css('box-shadow', 'none');
        // $('.image-border').css('padding: 1rem');
        ColorModule.trackScrollbarRule.style.background = lightenSchemeColor;
        ColorModule.thumbScrollbarRule.style.background = darkenSchemeColor;

}

export function updateRadioStates() {
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