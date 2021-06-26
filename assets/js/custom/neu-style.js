import * as ColorModule from './color.js';

export const unpressedBoxShadowSelectors = formatString([
        ".button-border",
        ".box-border",
        ".image-border",
        ".segmented-control",
        ".hero-03 .personal-image img",
        ".checkbox label",
        ".blog-intro"
]);

export const pressedBoxShadowSelectors = formatString([
        ".pill-button.active",
        ".custom-scrollbar",
        ".blog .blog-image .after",
]);

export const concaveBoxShadowSelectors = formatString([
        ".skill-box .skillbar",
        ".form-group",
        ".radio-selection"
]);

// NEO STYLE
var lightenSchemeColor = "#ffffff";
var darkenSchemeColor = "#dcdee2";
var pressedBoxShadow;
var unpressedBoxShadow;
var concaveBoxShadow;
var thumbScrollbarBoxShadow;
var neuDistance = '3px';
var neuBlur = '8px';
var neuLightIntensity = 7;
var neuDarkIntensity = 7;

export function init() {
        $("body").removeClass('flat-demo');
        $('.theme-skin li a').removeClass('active');
        $(this).addClass('active');

        initRangeSliders();
        setupClickEvents();
        setupRangeSliderEvents();
        setupHoverEvents();
}

function setupClickEvents() {
        "use strict";
        $('.theme-skin li .neo-skin').click(function () {
                $("body").removeClass('flat-demo');
                $('.theme-skin li a').removeClass('active');
                $(this).addClass('active');
                ColorModule.updateStyle(ColorModule.Styles.NEU);
        });
}

function setupHoverEvents() {
        $(".pill-button").hover(
                function () {
                        $(this).css('box-shadow', pressedBoxShadow);
                }, function () {
                        // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                        if (!$(this).hasClass('active')) $(this).css('box-shadow', '');
                }
        );
}

function initRangeSliders() {
        $('#distance').attr('value', neuDistance.replace('px', ''));
        $("#distance").next('.range-slider__value').html(neuDistance.replace('px', ''));
        $('#blur').attr('value', neuBlur.replace('px', ''));
        $("#blur").next('.range-slider__value').html(neuBlur.replace('px', ''));
        $('#light-intensity').attr('value', neuLightIntensity);
        $("#light-intensity").next('.range-slider__value').html(neuLightIntensity);
        $('#dark-intensity').attr('value', neuDarkIntensity);
        $("#dark-intensity").next('.range-slider__value').html(neuDarkIntensity);
}

function setupRangeSliderEvents() {
        $("#distance").on('input', function () {
                $(this).next('.range-slider__value').html(this.value);
                neuDistance = this.value + "px";
                update();
        });

        $("#blur").on('input', function () {
                $(this).next('.range-slider__value').html(this.value);
                neuBlur = this.value + "px";
                update();
        });

        $("#light-intensity").on('input', function () {
                $(this).next('.range-slider__value').html(this.value);
                neuLightIntensity = this.value;
                update();
        });

        $("#dark-intensity").on('input', function () {
                $(this).next('.range-slider__value').html(this.value);
                neuDarkIntensity = this.value;
                update();
        });
};

function formatString(selectorsArray) {
        return selectorsArray.join(", ");
}

export function update() {
        lightenSchemeColor = tinycolor(ColorModule.schemeColor).lighten(neuLightIntensity).toString();
        darkenSchemeColor = tinycolor(ColorModule.schemeColor).darken(neuDarkIntensity).toString();
        unpressedBoxShadow = `${neuDistance} ${neuDistance} ${neuBlur} ${darkenSchemeColor}, -${neuDistance} -${neuDistance} ${neuBlur} ${lightenSchemeColor}`;
        pressedBoxShadow = `inset ${neuDistance} ${neuDistance} ${neuBlur} ${darkenSchemeColor}, inset -${neuDistance} -${neuDistance} ${neuBlur} ${lightenSchemeColor}`;
        concaveBoxShadow = `${unpressedBoxShadow}, ${pressedBoxShadow}`;         // TODO: Does not look good!
        thumbScrollbarBoxShadow = `inset -${neuDistance} -${neuDistance} ${neuBlur} ${darkenSchemeColor}, inset ${neuDistance} ${neuDistance} ${neuBlur} ${lightenSchemeColor}`;
        applyStyle();
}

function applyStyle() {
        $(unpressedBoxShadowSelectors).css("box-shadow", unpressedBoxShadow);
        $(pressedBoxShadowSelectors).css("box-shadow", pressedBoxShadow);
        $(concaveBoxShadowSelectors).css("box-shadow", concaveBoxShadow);
        ColorModule.trackScrollbarRule.style.boxShadow = pressedBoxShadow;
        ColorModule.thumbScrollbarRule.style.boxShadow = thumbScrollbarBoxShadow;
        // updateCheckboxShadows();
}