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
import * as ColorModule from './DynamicTheme.js';
import { Style } from './Style.js';
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
    ".neo-skin",
    ".color-pallet",
    ".portfolio-single .modal-content",
    ".range-slider__range",
    ".pallet-border",
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
    " .pal-border",
    ".badge-border",
    ".neo-skin",
    "table",
    "table thead ",
    ".pallet-border",
    // ".badge-pill"
]);
var insetBoxShadowSelectors = formatString([
    ".pill-button.active",
    ".custom-scrollbar",
    ".blog .blog-image .after",
    " .pal-button.active",
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
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}
var NeuStyle = /** @class */ (function (_super) {
    __extends(NeuStyle, _super);
    function NeuStyle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lightenSchemeColor = "#ffffff";
        _this.darkenSchemeColor = "#dcdee2";
        _this.insetBoxShadow = '';
        _this.dropBoxShadow = '';
        _this.concaveBoxShadow = '';
        _this.thumbScrollbarBoxShadow = '';
        _this.neuDistance = '3px';
        _this.neuBlur = '8px';
        _this.neuLightIntensity = 7;
        _this.neuDarkIntensity = 7;
        return _this;
    }
    NeuStyle.prototype.onEnable = function () {
        $("body").removeClass('flat-demo');
        $('.theme-skin li a').removeClass('active');
        this.setupClickEvents();
        this.setupHoverEvents();
        this.initRangeSliders();
        // this.setupRangeSliderEvents();
        this.updateRadioUI();
        $(".customizer").hide();
        $("#neo-customizer").show();
        this.update();
    };
    NeuStyle.prototype.setupHoverEvents = function () {
        var _this = this;
        $(".pill-button").off('mouseenter mouseleave').hover(function (event) {
            event.currentTarget.style.boxShadow = _this.insetBoxShadow;
        }, function (event) {
            // jQuery will alter the style INLINE, so by setting value to null we  get the original value
            if (!(event.currentTarget).classList.contains('active'))
                event.currentTarget.style.boxShadow = '';
        });
        $(" .pallet-button").off('mouseenter mouseleave').hover(function (event) {
            event.currentTarget.style.boxShadow = _this.insetBoxShadow;
        }, function (event) {
            event.currentTarget.style.boxShadow = 'none';
        });
        $("table>tbody>tr").off('mouseenter mouseleave').hover(function (event) {
            event.currentTarget.style.boxShadow = _this.insetBoxShadow;
        }, function (event) {
            event.currentTarget.style.boxShadow = '';
        });
        $(" .badge-border").off('mouseenter mouseleave').hover(function (event) {
            event.currentTarget.style.boxShadow = _this.insetBoxShadow;
        }, function (event) {
            event.currentTarget.style.boxShadow = _this.dropBoxShadow;
        });
    };
    NeuStyle.prototype.setupClickEvents = function () {
        var _this = this;
        $(".segmented-control input").off('click').on('click', function (event) {
            $(".segmented-control label[for='" + event.currentTarget.id + "']").css('color', ColorModule.highlightColor);
            $(".segmented-control input[type='radio']:not(:checked)").each(function () {
                $(".segmented-control label[for='" + event.currentTarget.id + "']").css('color', ColorModule.mutedBaseColor);
            });
        });
        $(".checkbox input").off('click').on('click', function (event) {
            if (!$(event.currentTarget).prop("checked")) {
                $(event.currentTarget).siblings(".name").css('color', ColorModule.mutedBaseColor);
                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', _this.dropBoxShadow);
            }
            else {
                $(event.currentTarget).siblings(".name").css('color', ColorModule.highlightColor);
                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', _this.concaveBoxShadow);
            }
        });
    };
    NeuStyle.prototype.update = function () {
        this.lightenSchemeColor = tinycolor(ColorModule.schemeColor).lighten(this.neuLightIntensity).toString();
        this.darkenSchemeColor = tinycolor(ColorModule.schemeColor).darken(this.neuDarkIntensity).toString();
        this.dropBoxShadow = this.neuDistance + " " + this.neuDistance + " " + this.neuBlur + " " + this.darkenSchemeColor + ", -" + this.neuDistance + " -" + this.neuDistance + " " + this.neuBlur + " " + this.lightenSchemeColor;
        this.insetBoxShadow = "inset " + this.neuDistance + " " + this.neuDistance + " " + this.neuBlur + " " + this.darkenSchemeColor + ", inset -" + this.neuDistance + " -" + this.neuDistance + " " + this.neuBlur + " " + this.lightenSchemeColor;
        this.concaveBoxShadow = this.dropBoxShadow + ", " + this.insetBoxShadow; // TODO: Does not look good!
        this.thumbScrollbarBoxShadow = "inset -" + this.neuDistance + " -" + this.neuDistance + " " + this.neuBlur + " " + this.darkenSchemeColor + ", inset " + this.neuDistance + " " + this.neuDistance + " " + this.neuBlur + " " + this.lightenSchemeColor;
        $(backgroundSchemeColorSelectors).css("background-color", ColorModule.schemeColor);
        $(backgroundTransparentSelectors).css("background", 'transparent');
        $(colorHighlightColorSelectors).css("color", ColorModule.highlightColor);
        $(dropBoxShadowSelectors).css("box-shadow", this.dropBoxShadow);
        $(insetBoxShadowSelectors).css("box-shadow", this.insetBoxShadow);
        $(concaveBoxShadowSelectors).css("box-shadow", this.concaveBoxShadow);
        ColorModule.trackScrollbarRule.style.boxShadow = this.insetBoxShadow;
        ColorModule.thumbScrollbarRule.style.boxShadow = this.thumbScrollbarBoxShadow;
        ColorModule.trackScrollbarRule.style.background = ColorModule.schemeColor;
        ColorModule.thumbScrollbarRule.style.background = ColorModule.schemeColor;
    };
    NeuStyle.prototype.updateRadioUI = function () {
        $("input[type='radio']:checked").each(function () {
            $("label[for='" + this.id + "']").css('color', ColorModule.highlightColor);
        });
        $("input[type='radio']:not(:checked)").each(function () {
            $("label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
            // $(" label[for='" + this.id + "']").css('box-shadow', dropBoxShadow);
        });
    };
    NeuStyle.prototype.updateCheckboxUI = function () {
        var _this = this;
        $("input[type='checkbox']:checked").each(function (i, currentElement) {
            $("label[for='" + currentElement.id + "'] i").css('color', ColorModule.highlightColor);
            $("label[for='" + currentElement.id + "']").next().css('color', ColorModule.highlightColor);
            $("label[for='" + currentElement.id + "']").css('box-shadow', _this.concaveBoxShadow);
        });
        $("input[type='checkbox']:not(:checked)").each(function (i, currentElement) {
            $("label[for='" + currentElement.id + "'] i").css('color', ColorModule.mutedBaseColor);
            $("label[for='" + currentElement.id + "']").next().css('color', ColorModule.mutedBaseColor);
            $("label[for='" + currentElement.id + "']").css('box-shadow', _this.dropBoxShadow);
        });
    };
    NeuStyle.prototype.initRangeSliders = function () {
        $('#distance').attr('value', this.neuDistance.replace('px', ''));
        $("#distance").next('.range-slider__value').html(this.neuDistance.replace('px', ''));
        $('#blur').attr('value', this.neuBlur.replace('px', ''));
        $("#blur").next('.range-slider__value').html(this.neuBlur.replace('px', ''));
        $('#light-intensity').attr('value', this.neuLightIntensity);
        $("#light-intensity").next('.range-slider__value').html(this.neuLightIntensity.toString());
        $('#dark-intensity').attr('value', this.neuDarkIntensity);
        $("#dark-intensity").next('.range-slider__value').html(this.neuDarkIntensity.toString());
    };
    NeuStyle.prototype.setupRangeSliderEvents = function () {
        var _this = this;
        $("#distance").on('input', function (event) {
            $(_this).next('.range-slider__value').html(_this.value);
            _this.neuDistance = _this.value + "px";
            _this.update();
        });
        $("#blur").on('input', function (event) {
            $(_this).next('.range-slider__value').html(_this.value);
            _this.neuBlur = _this.value + "px";
            _this.update();
        });
        $("#light-intensity").on('input', function (event) {
            $(_this).next('.range-slider__value').html(_this.value);
            _this.neuLightIntensity = _this.value;
            _this.update();
        });
        $("#dark-intensity").on('input', function (event) {
            $(_this).next('.range-slider__value').html(_this.value);
            _this.neuDarkIntensity = _this.value;
            _this.update();
        });
    };
    ;
    return NeuStyle;
}(Style));
export { NeuStyle };
