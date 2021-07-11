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
import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
// TODO: move this to CSS file
var noneBoxShadowSelectors = formatString([
    ".theme-skin .pill-button",
]);
var backgroundSchemeColorSelectors = formatString([
    ".section",
    " .button-border",
    " .box-border",
    ".image-border",
    " .contact .form-item .form-group",
    ".segmented-control",
    ".checkbox label",
    ".color-pallet",
    ".portfolio-single .modal-content",
    ".range-slider__range",
    ".pallet-border",
    ".range-slider__value",
    ".theme-skin .pill-button",
    ".pill-button.active",
    ".pill-button"
]);
// TODO: move this to CSS file
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
    ".badge-border",
    "table",
    "table thead ",
    ".pallet-border",
    ".range-slider__value",
]);
var insetBoxShadowSelectors = formatString([
    ".pill-button.active",
    ".custom-scrollbar",
    ".blog .blog-image .after",
    " .pal-button.active",
    ".skill-boxes ,box-border",
    ".color-pallet",
    ".timeline-items.box-border",
    ".range-slider__range",
    ".pallet-button.active",
    ".theme-skin .pill-button.active",
]);
var concaveBoxShadowSelectors = formatString([
    ".skill-box .skillbar",
    ".form-group",
    ".radio-selection",
]);
// EFFECTS
var hoverInsetBoxShadowSelectors = formatString([
    " .badge-border",
    "table>tbody>tr",
    ".pill-button",
    ".pallet-button"
]);
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}
// REFACTOR: Implement singleton pattern for base class instead/generic singleton
var NeuStyle = /** @class */ (function (_super) {
    __extends(NeuStyle, _super);
    function NeuStyle() {
        var _this = _super.call(this) || this;
        _this.lightenSchemeColor = "#ffffff";
        _this.darkenSchemeColor = "#dcdee2";
        _this.insetBoxShadow = '';
        _this.dropBoxShadow = '';
        _this.concaveBoxShadow = '';
        _this.thumbScrollbarBoxShadow = '';
        _this.distance = 3;
        _this.blur = 8;
        _this.lightenIntensity = 7;
        _this.darkenIntensity = 7;
        _this.lastHoverElement = 'lastHover';
        _this.originalProperty = '';
        _this.originalPropertyValue = '';
        return _this;
    }
    Object.defineProperty(NeuStyle, "Instance", {
        get: function () {
            var _a;
            (_a = NeuStyle._instance) !== null && _a !== void 0 ? _a : (NeuStyle._instance = new NeuStyle());
            return NeuStyle._instance;
        },
        enumerable: false,
        configurable: true
    });
    NeuStyle.prototype.updateLastHoverElement = function (element, originalProperty, originalPropertyValue) {
        element.classList.add(this.lastHoverElement);
        if (!element.classList.contains('active')) { // for buttons
            this.originalProperty = originalProperty;
            this.originalPropertyValue = originalPropertyValue;
        }
    };
    NeuStyle.prototype.resetLastHoverElement = function (element) {
        element.classList.remove(this.lastHoverElement);
        if (!element.classList.contains('active')) // for buttons
            $(element).css(this.originalProperty, this.originalPropertyValue);
    };
    NeuStyle.prototype.onEnable = function () {
        $("body").addClass("neo-style");
        $("#neo-customizer").show();
        this.setupClickEvents();
        this.setupHoverEvents();
        this.initRangeSliders();
        this.setupRangeSliderEvents();
        this.updateRadioUI();
        this.update();
    };
    NeuStyle.prototype.onDisable = function () {
    };
    NeuStyle.prototype.setupHoverEvents = function () {
        var _this = this;
        $(".segmented-control label").off('mouseenter').on('mouseenter', function () {
            $(this).css('color', DynamicTheme.highlightColor.hex);
        });
        $(".range-slider__range ").off('mouseenter mouseleave').hover(function (event) {
            event.currentTarget.classList.add('focus');
        }, function (event) {
            event.currentTarget.classList.remove('focus');
        });
        $(hoverInsetBoxShadowSelectors).off('mouseenter mouseleave').hover(function (event) {
            var target = event.currentTarget;
            _this.updateLastHoverElement(target, 'box-shadow', target.style.boxShadow);
            target.style.boxShadow = _this.insetBoxShadow;
        }, function (event) {
            _this.resetLastHoverElement(event.currentTarget);
        });
    };
    NeuStyle.prototype.setupClickEvents = function () {
        var _this = this;
        $(".segmented-control input").off('click').on('click', function (event) {
            $(".segmented-control label[for='" + event.currentTarget.id + "']").css('color', DynamicTheme.highlightColor.hex);
            $(".segmented-control input[type='radio']:not(:checked)").each(function (i, currentElement) {
                $(".segmented-control label[for='" + currentElement.id + "']").css('color', DynamicTheme.mutedBaseColor);
            });
        });
        $(".checkbox input").off('click').on('click', function (event) {
            if (!$(event.currentTarget).prop("checked")) {
                $(event.currentTarget).siblings(".name").css('color', DynamicTheme.mutedBaseColor);
                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', _this.dropBoxShadow);
            }
            else {
                $(event.currentTarget).siblings(".name").css('color', DynamicTheme.highlightColor.hex);
                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', _this.concaveBoxShadow);
            }
        });
    };
    NeuStyle.prototype.update = function () {
        this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(this.lightenIntensity);
        this.darkenSchemeColor = DynamicTheme.schemeColor.getDarken(this.darkenIntensity);
        this.dropBoxShadow = this.distance + "px " + this.distance + "px " + this.blur + "px " + this.darkenSchemeColor + ", -" + this.distance + "px -" + this.distance + "px " + this.blur + "px " + this.lightenSchemeColor;
        this.insetBoxShadow = "inset " + this.distance + "px " + this.distance + "px " + this.blur + "px " + this.darkenSchemeColor + ", inset -" + this.distance + "px -" + this.distance + "px " + this.blur + "px " + this.lightenSchemeColor;
        this.concaveBoxShadow = this.dropBoxShadow + ", " + this.insetBoxShadow; // TODO: Does not look good!
        this.thumbScrollbarBoxShadow = "inset -" + this.distance + "px -" + this.distance + "px " + this.blur + "px " + this.darkenSchemeColor + ", inset " + this.distance + "px " + this.distance + "px " + this.blur + "px " + this.lightenSchemeColor;
        $(backgroundSchemeColorSelectors).css("background-color", DynamicTheme.schemeColor.hex);
        $(backgroundTransparentSelectors).css("background", 'transparent');
        $(colorHighlightColorSelectors).css("color", DynamicTheme.highlightColor.hex);
        $(noneBoxShadowSelectors).css("box-shadow", 'none');
        $(dropBoxShadowSelectors).css("box-shadow", this.dropBoxShadow);
        $(insetBoxShadowSelectors).css("box-shadow", this.insetBoxShadow);
        $(concaveBoxShadowSelectors).css("box-shadow", this.concaveBoxShadow);
        DynamicTheme.trackScrollbarRule.style.boxShadow = this.insetBoxShadow;
        DynamicTheme.thumbScrollbarRule.style.boxShadow = this.thumbScrollbarBoxShadow;
        DynamicTheme.trackScrollbarRule.style.background = DynamicTheme.schemeColor.hex;
        DynamicTheme.thumbScrollbarRule.style.background = DynamicTheme.schemeColor.hex;
        DynamicTheme.sliderThumbRule.style.boxShadow = this.dropBoxShadow;
        DynamicTheme.sliderThumbRule.style.backgroundColor = DynamicTheme.schemeColor.hex;
        DynamicTheme.sliderThumbFocusRule.style.boxShadow = this.concaveBoxShadow;
        DynamicTheme.sliderThumbFocusRule.style.backgroundColor = DynamicTheme.schemeColor.hex;
        // DynamicTheme.colorSwatchRule.style.boxShadow = this.dropBoxShadow;
    };
    NeuStyle.prototype.updateRadioUI = function () {
        $("input[type='radio']:checked").each(function () {
            $("label[for='" + this.id + "']").css('color', DynamicTheme.highlightColor.hex);
        });
        $("input[type='radio']:not(:checked)").each(function () {
            $("label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
            // $(" label[for='" + this.id + "']").css('box-shadow', dropBoxShadow);
        });
    };
    NeuStyle.prototype.updateCheckboxUI = function () {
        var _this = this;
        $("input[type='checkbox']:checked").each(function (i, currentElement) {
            $("label[for='" + currentElement.id + "'] i").css('color', DynamicTheme.highlightColor.hex);
            $("label[for='" + currentElement.id + "']").next().css('color', DynamicTheme.highlightColor.hex);
            $("label[for='" + currentElement.id + "']").css('box-shadow', _this.concaveBoxShadow);
        });
        $("input[type='checkbox']:not(:checked)").each(function (i, currentElement) {
            $("label[for='" + currentElement.id + "'] i").css('color', DynamicTheme.mutedBaseColor);
            $("label[for='" + currentElement.id + "']").next().css('color', DynamicTheme.mutedBaseColor);
            $("label[for='" + currentElement.id + "']").css('box-shadow', _this.dropBoxShadow);
        });
    };
    NeuStyle.prototype.resetUncheckedButtons = function (currentCheckedButton) {
        $('#portfolio .pill-button').not(currentCheckedButton).css('box-shadow', '');
    };
    NeuStyle.prototype.initRangeSliders = function () {
        $('#distance').attr('value', this.distance);
        $("#distance").next('.range-slider__value').html(this.distance.toString());
        $('#blur').attr('value', this.blur);
        $("#blur").next('.range-slider__value').html(this.blur.toString());
        $('#light-intensity').attr('value', this.lightenIntensity);
        $("#light-intensity").next('.range-slider__value').html(this.lightenIntensity.toString());
        $('#dark-intensity').attr('value', this.darkenIntensity);
        $("#dark-intensity").next('.range-slider__value').html(this.darkenIntensity.toString());
    };
    NeuStyle.prototype.setupRangeSliderEvents = function () {
        var _this = this;
        $("#distance, #blur, #light-intensity, #dark-intensity").on('input', function (event) {
            var newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'distance':
                    _this.distance = parseInt(newValue);
                    break;
                case 'blur':
                    _this.blur = parseInt(newValue);
                    break;
                case 'light-intensity':
                    _this.lightenIntensity = parseInt(newValue);
                    break;
                case 'dark-intensity':
                    _this.darkenIntensity = parseInt(newValue);
                    break;
            }
            //TODO: Seperate update functions
            _this.update();
        });
    };
    ;
    //  Singleton Pattern
    NeuStyle._instance = new NeuStyle();
    return NeuStyle;
}(Style));
export { NeuStyle };
