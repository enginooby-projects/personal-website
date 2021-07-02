var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import tinycolor from 'tinycolor2';
import * as ColorModule from './DynamicTheme.js';
import { Style } from './Style.js';
var lightenIntensity = 5;
var darkenIntensity = 5;
var noneBoxShadowSelectors = formatString([
    ".flat-demo .image-border",
    ".flat-demo .button-border",
    ".hero-03 .personal-image img",
    ".flat-demo .box-border",
    ".flat-demo .box-hover-border",
    ".flat-demo .contact .form-item .form-group",
    ".checkbox label",
    ".segmented-control",
    ".radio-selection",
    ".flat-demo .portfolio-filter .pill-button.active",
    ".flat-demo .blog-intro",
    ".flat-demo .blog .blog-image .after",
    ".flat-demo .skill-box .skillbar",
    ".flat-demo .pallet-border",
    ".flat-demo .pallet-button",
    ".color-pallet",
    "table",
    "table thead ",
]);
var backgroundHighlightColorSelectors = formatString([
    ".flat-demo .button-border",
    ".radio-selection",
    ".flat-demo .portfolio-filter .pill-button.active",
]);
var backgroundLightenSchemeColorSelectors = formatString([
    ".flat-demo .box-border",
    ".flat-demo .image-border",
    ".flat-demo .box-hover-border",
    ".flat-demo .contact .form-item .form-group",
    ".flat-demo .segmented-control",
    ".flat-demo .checkbox label",
    ".flat-demo .pallet-border",
    ".color-pallet"
]);
var backgroundSchemeColorSelectors = formatString([
// ".flat-demo .portfolio-filter .pill-button.active",
]);
var colorBaseColorSelectors = formatString([
    ".flat-demo .portfolio-filter .pill-button ",
]);
var backgroundTransparentSelectors = formatString([
    ".flat-demo .portfolio-filter .pill-button:not(.active)",
    ".flat-demo .portfolio-filter .button-border",
    ".flat-demo .testimonial .owl-carousel .testimonial-image",
]);
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}
var FlatStyle = /** @class */ (function (_super) {
    __extends(FlatStyle, _super);
    function FlatStyle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lightenSchemeColor = "#680317";
        _this.darkenSchemeColor = "#680317";
        return _this;
    }
    FlatStyle.prototype.onEnable = function () {
        $("body").addClass('flat-demo');
        $('.theme-skin li a').removeClass('active'); // option button
        this.setupHoverEvents();
        this.setupClickEvents();
        this.updateRadioUI();
        $(".customizer").hide();
        $("#flat-customizer").show();
        this.update();
    };
    FlatStyle.prototype.setupHoverEvents = function () {
        $(" .pill-button").off('mouseenter mouseleave').hover(function () {
            $(this).css('background', tinycolor(ColorModule.highlightColor).darken(15).toString());
        }, function () {
            // jQuery will alter the style INLINE, so by setting value to null we  get the original value
            if (!$(this).hasClass('active'))
                $(this).css('background', '');
        });
        $(" .pallet-button").off('mouseenter mouseleave');
        $(" .portfolio-filter .pill-button").off('mouseenter mouseleave').hover(function () {
            $(this).css('background', ColorModule.highlightColor);
        }, function () {
            // jQuery will alter the style INLINE, so by setting value to null we  get the original value
            if (!$(this).hasClass('active'))
                $(this).css('background', '');
        });
        $("table>tbody>tr").off('mouseenter mouseleave').hover(function () {
            $(this).css('background', ColorModule.highlightColor);
        }, function () {
            $(this).css('background', '');
        });
        $(" .badge-border").off('mouseenter mouseleave');
    };
    FlatStyle.prototype.setupClickEvents = function () {
        $(".segmented-control input").off('click').click(function () {
            $(".segmented-control label[for='" + this.id + "']").css('color', ColorModule.baseColor);
            $(".segmented-control input[type='radio']:not(:checked)").each(function () {
                $(".segmented-control label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
            });
        });
        $(".checkbox input").off('click').click(function () {
            if (!$(this).prop("checked")) {
                $(this).siblings(".name").css('color', ColorModule.mutedBaseColor);
            }
            else {
                $(this).siblings(".name").css('color', ColorModule.highlightColor);
            }
        });
    };
    FlatStyle.prototype.update = function () {
        this.lightenSchemeColor = tinycolor(ColorModule.schemeColor).lighten(lightenIntensity).toString();
        this.darkenSchemeColor = tinycolor(ColorModule.schemeColor).darken(darkenIntensity).toString();
        $(".flat-demo :not(.portfolio-filter) .pill-button").css('color', ColorModule.invertColor(ColorModule.highlightColor, true));
        $(backgroundLightenSchemeColorSelectors).css('background', this.lightenSchemeColor);
        $(backgroundHighlightColorSelectors).css('background', ColorModule.highlightColor);
        $(backgroundTransparentSelectors).css('background', 'transparent');
        $(colorBaseColorSelectors).css('color', ColorModule.baseColor);
        $(noneBoxShadowSelectors).css('box-shadow', 'none');
        ColorModule.trackScrollbarRule.style.background = this.lightenSchemeColor;
        ColorModule.thumbScrollbarRule.style.background = this.darkenSchemeColor;
    };
    FlatStyle.prototype.updateRadioUI = function () {
        $("input[type='radio']:checked").each(function () {
            $("label[for='" + this.id + "']").css('color', ColorModule.invertColor(ColorModule.highlightColor, true));
        });
        $("input[type='radio']:not(:checked)").each(function () {
            $("label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
        });
    };
    FlatStyle.prototype.updateCheckboxUI = function () {
        $("input[type='checkbox']:checked").each(function () {
            $("label[for='" + this.id + "'] i").css('color', ColorModule.highlightColor);
            $("label[for='" + this.id + "']").next().css('color', ColorModule.highlightColor);
        });
        $("input[type='checkbox']:not(:checked)").each(function () {
            $("label[for='" + this.id + "'] i").css('color', ColorModule.mutedBaseColor);
            $("label[for='" + this.id + "']").next().css('color', ColorModule.mutedBaseColor);
        });
    };
    return FlatStyle;
}(Style));
export { FlatStyle };
