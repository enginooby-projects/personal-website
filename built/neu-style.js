import * as ColorModule from './DynamicTheming.js';
var backgroundSchemeColorSelectors = formatString([
    ".section",
    " .button-border",
    " .box-border",
    ".image-border",
    ".box-hover-border",
    " .contact .form-item .form-group",
    ".pill-button.active",
    ".segmented-control",
    ".checkbox label",
    ".pallet-border",
    ".neo-skin",
    ".color-pallet",
    ".portfolio-single .modal-content",
    ".range-slider__range"
]);
var backgroundTransparentSelectors = formatString([
    ".radio-selection",
]);
var colorHighlightColorSelectors = formatString([
    ".pill-button",
]);
var dropBoxShadowSelectors = formatString([
    ".button-border",
    ".box-border",
    ".image-border",
    ".segmented-control",
    ".hero-03 .personal-image img",
    ".checkbox label",
    ".blog-intro",
    " .pallet-border",
    ".badge-border",
    ".neo-skin",
    "table",
    "table thead ",
    // ".badge-pill"
]);
var insetBoxShadowSelectors = formatString([
    ".pill-button.active",
    ".custom-scrollbar",
    ".blog .blog-image .after",
    " .pallet-button.active",
    ".skill-boxes ,box-border",
    ".color-pallet",
    ".timeline-items.box-border",
    ".range-slider__range"
]);
var concaveBoxShadowSelectors = formatString([
    ".skill-box .skillbar",
    ".form-group",
    ".radio-selection",
]);
// NEO STYLE
var lightenSchemeColor = "#ffffff";
var darkenSchemeColor = "#dcdee2";
var insetBoxShadow;
var dropBoxShadow;
var concaveBoxShadow;
var thumbScrollbarBoxShadow;
var neuDistance = '3px';
var neuBlur = '8px';
var neuLightIntensity = 7;
var neuDarkIntensity = 7;
$(document).ready(function () {
    "use strict";
    $('.theme-skin li .neo-skin').click(function () {
        init();
        ColorModule.updateStyle(ColorModule.Styles.NEU);
    });
});
export function init() {
    $("body").removeClass('flat-demo');
    $('.theme-skin li a').removeClass('active');
    $(this).addClass('active');
    setupClickEvents();
    initRangeSliders();
    setupHoverEvents();
    setupRangeSliderEvents();
    updateRadioUI();
    $(".customizer").hide();
    $("#neo-customizer").show();
}
function setupHoverEvents() {
    $(".pill-button").off('mouseenter mouseleave').hover(function () {
        $(this).css('box-shadow', insetBoxShadow);
    }, function () {
        // jQuery will alter the style INLINE, so by setting value to null we  get the original value
        if (!$(this).hasClass('active'))
            $(this).css('box-shadow', '');
    });
    $(" .pallet-button").off('mouseenter mouseleave').hover(function () {
        $(this).css('box-shadow', insetBoxShadow);
    }, function () {
        // jQuery will alter the style INLINE, so by setting value to null we  get the original value
        if (!$(this).hasClass('active'))
            $(this).css('box-shadow', 'none');
    });
    $("table>tbody>tr").off('mouseenter mouseleave').hover(function () {
        $(this).css('box-shadow', insetBoxShadow);
    }, function () {
        $(this).css('box-shadow', '');
    });
    $(" .badge-border").off('mouseenter mouseleave').hover(function () {
        $(this).css('box-shadow', insetBoxShadow);
    }, function () {
        $(this).css('box-shadow', dropBoxShadow);
    });
}
function setupClickEvents() {
    $(".segmented-control input").off('click').click(function () {
        $(".segmented-control label[for='" + this.id + "']").css('color', ColorModule.highlightColor);
        $(".segmented-control input[type='radio']:not(:checked)").each(function () {
            $(".segmented-control label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
        });
    });
    $(".checkbox input").off('click').click(function () {
        if (!$(this).prop("checked")) {
            $(this).siblings(".name").css('color', ColorModule.mutedBaseColor);
            $(".checkbox label[for='" + this.id + "']").css('box-shadow', dropBoxShadow);
        }
        else {
            $(this).siblings(".name").css('color', ColorModule.highlightColor);
            $(".checkbox label[for='" + this.id + "']").css('box-shadow', concaveBoxShadow);
        }
    });
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
}
;
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}
export function update() {
    lightenSchemeColor = tinycolor(ColorModule.schemeColor).lighten(neuLightIntensity).toString();
    darkenSchemeColor = tinycolor(ColorModule.schemeColor).darken(neuDarkIntensity).toString();
    dropBoxShadow = neuDistance + " " + neuDistance + " " + neuBlur + " " + darkenSchemeColor + ", -" + neuDistance + " -" + neuDistance + " " + neuBlur + " " + lightenSchemeColor;
    insetBoxShadow = "inset " + neuDistance + " " + neuDistance + " " + neuBlur + " " + darkenSchemeColor + ", inset -" + neuDistance + " -" + neuDistance + " " + neuBlur + " " + lightenSchemeColor;
    concaveBoxShadow = dropBoxShadow + ", " + insetBoxShadow; // TODO: Does not look good!
    thumbScrollbarBoxShadow = "inset -" + neuDistance + " -" + neuDistance + " " + neuBlur + " " + darkenSchemeColor + ", inset " + neuDistance + " " + neuDistance + " " + neuBlur + " " + lightenSchemeColor;
    applyStyle();
}
function applyStyle() {
    $(backgroundSchemeColorSelectors).css("background-color", ColorModule.schemeColor);
    $(backgroundTransparentSelectors).css("background", 'transparent');
    $(colorHighlightColorSelectors).css("color", ColorModule.highlightColor);
    $(dropBoxShadowSelectors).css("box-shadow", dropBoxShadow);
    $(insetBoxShadowSelectors).css("box-shadow", insetBoxShadow);
    $(concaveBoxShadowSelectors).css("box-shadow", concaveBoxShadow);
    ColorModule.trackScrollbarRule.style.boxShadow = insetBoxShadow;
    ColorModule.thumbScrollbarRule.style.boxShadow = thumbScrollbarBoxShadow;
    ColorModule.trackScrollbarRule.style.background = ColorModule.schemeColor;
    ColorModule.thumbScrollbarRule.style.background = ColorModule.schemeColor;
    // updateCheckboxShadows();
}
export function updateRadioUI() {
    $("input[type='radio']:checked").each(function () {
        $("label[for='" + this.id + "']").css('color', ColorModule.highlightColor);
    });
    $("input[type='radio']:not(:checked)").each(function () {
        $("label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
        // $(" label[for='" + this.id + "']").css('box-shadow', dropBoxShadow);
    });
}
export function updateCheckboxUI() {
    $("input[type='checkbox']:checked").each(function () {
        $("label[for='" + this.id + "'] i").css('color', ColorModule.highlightColor);
        $("label[for='" + this.id + "']").next().css('color', ColorModule.highlightColor);
        $("label[for='" + this.id + "']").css('box-shadow', concaveBoxShadow);
    });
    $("input[type='checkbox']:not(:checked)").each(function () {
        $("label[for='" + this.id + "'] i").css('color', ColorModule.mutedBaseColor);
        $("label[for='" + this.id + "']").next().css('color', ColorModule.mutedBaseColor);
        $("label[for='" + this.id + "']").css('box-shadow', dropBoxShadow);
    });
}
