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
import ColorUtility from './ColorUtility.js';
import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
$(document).ready(function () {
    "use strict";
    $('.theme-skin li .flat-skin').click(function () {
        DynamicTheme.changeStyle(this, FlatStyle.Instance);
    });
});
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
        var _this = _super.call(this) || this;
        _this.lightenSchemeColor = "#680317";
        _this.darkenSchemeColor = "#680317";
        return _this;
    }
    Object.defineProperty(FlatStyle, "Instance", {
        get: function () {
            var _a;
            (_a = FlatStyle._instance) !== null && _a !== void 0 ? _a : (FlatStyle._instance = new FlatStyle());
            return FlatStyle._instance;
        },
        enumerable: false,
        configurable: true
    });
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
            $(this).css('background', ColorUtility.getDarken(DynamicTheme.highlightColor, 15));
        }, function () {
            // jQuery will alter the style INLINE, so by setting value to null we  get the original value
            if (!$(this).hasClass('active'))
                $(this).css('background', '');
        });
        $(" .pallet-button").off('mouseenter mouseleave');
        $(" .portfolio-filter .pill-button").off('mouseenter mouseleave').hover(function () {
            $(this).css('background', DynamicTheme.highlightColor);
        }, function () {
            // jQuery will alter the style INLINE, so by setting value to null we  get the original value
            if (!$(this).hasClass('active'))
                $(this).css('background', '');
        });
        $("table>tbody>tr").off('mouseenter mouseleave').hover(function () {
            $(this).css('background', DynamicTheme.highlightColor);
        }, function () {
            $(this).css('background', '');
        });
        $(" .badge-border").off('mouseenter mouseleave');
    };
    FlatStyle.prototype.setupClickEvents = function () {
        $(".segmented-control input").off('click').click(function () {
            $(".segmented-control label[for='" + this.id + "']").css('color', DynamicTheme.baseColor);
            $(".segmented-control input[type='radio']:not(:checked)").each(function () {
                $(".segmented-control label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
            });
        });
        $(".checkbox input").off('click').click(function () {
            if (!$(this).prop("checked")) {
                $(this).siblings(".name").css('color', DynamicTheme.mutedBaseColor);
            }
            else {
                $(this).siblings(".name").css('color', DynamicTheme.highlightColor);
            }
        });
    };
    FlatStyle.prototype.update = function () {
        this.lightenSchemeColor = ColorUtility.getLighten(DynamicTheme.schemeColor, lightenIntensity);
        this.darkenSchemeColor = ColorUtility.getDarken(DynamicTheme.schemeColor, darkenIntensity);
        $(".flat-demo :not(.portfolio-filter) .pill-button").css('color', ColorUtility.getInvert(DynamicTheme.highlightColor, true));
        $(backgroundLightenSchemeColorSelectors).css('background', this.lightenSchemeColor);
        $(backgroundHighlightColorSelectors).css('background', DynamicTheme.highlightColor);
        $(backgroundTransparentSelectors).css('background', 'transparent');
        $(colorBaseColorSelectors).css('color', DynamicTheme.baseColor);
        $(noneBoxShadowSelectors).css('box-shadow', 'none');
        DynamicTheme.trackScrollbarRule.style.background = this.lightenSchemeColor;
        DynamicTheme.thumbScrollbarRule.style.background = this.darkenSchemeColor;
    };
    FlatStyle.prototype.updateRadioUI = function () {
        $("input[type='radio']:checked").each(function () {
            $("label[for='" + this.id + "']").css('color', ColorUtility.getInvert(DynamicTheme.highlightColor, true));
        });
        $("input[type='radio']:not(:checked)").each(function () {
            $("label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
        });
    };
    FlatStyle.prototype.updateCheckboxUI = function () {
        $("input[type='checkbox']:checked").each(function () {
            $("label[for='" + this.id + "'] i").css('color', DynamicTheme.highlightColor);
            $("label[for='" + this.id + "']").next().css('color', DynamicTheme.highlightColor);
        });
        $("input[type='checkbox']:not(:checked)").each(function () {
            $("label[for='" + this.id + "'] i").css('color', DynamicTheme.mutedBaseColor);
            $("label[for='" + this.id + "']").next().css('color', DynamicTheme.mutedBaseColor);
        });
    };
    return FlatStyle;
}(Style));
export { FlatStyle };
