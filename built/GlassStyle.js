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
import { TinyColor } from './TinyColor.js';
var lightenIntensity = 15;
var darkenIntensity = 10;
var backgroundGlassHighlightColorSelectors = formatString([
    ".glass-style .pill-button:not(.glass-style .pill-button.active)",
    " .contact .form-item .form-group",
    ".segmented-control",
    ".checkbox label",
    ".glass-style .segmented-control",
]);
var backgroundGlassSchemeColorSelectors = formatString([
    // ".glass-style .section",
    ".glass-style .display-content>.container",
    ".glass-style .color-switcher .color-pallet.show",
    ".glass-style .color-switcher .color-pallet",
    ".glass-style .pallet-button",
    ".glass-style .skillbar",
    ".glass-style .radio-selection"
]);
var backgroundGlassLightenSchemeColorSelectors = formatString([
    ".glass-style .box-border",
    ".glass-style #self-education .image-border",
    ".glass-style .contact .form-item .form-group",
    ".glass-style .checkbox label",
    // ".glass-style .pallet-border",
]);
var backgroundGlassActiveButtonSelectors = formatString([
    ".glass-style .pill-button.active"
]);
var backgroundGlassColorfull1Selectors = formatString([
    ".background-colorfull1:not(#self-education .background-colorfull1)",
]);
var backgroundGlassColorfull2Selectors = formatString([
    ".background-colorfull2:not(#self-education .background-colorfull2)",
]);
var backgroundGlassColorfull3Selectors = formatString([
    ".background-colorfull3:not(#self-education .background-colorfull3)",
]);
var borderSizeBlurDependentSelectors = backgroundGlassHighlightColorSelectors + ", " + backgroundGlassSchemeColorSelectors + ", " + backgroundGlassLightenSchemeColorSelectors + ", " + backgroundGlassColorfull1Selectors + ", " + backgroundGlassColorfull2Selectors + ", " + backgroundGlassColorfull3Selectors + ", " + backgroundGlassActiveButtonSelectors;
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}
var GlassStyle = /** @class */ (function (_super) {
    __extends(GlassStyle, _super);
    function GlassStyle() {
        var _this = _super.call(this) || this;
        _this.blur = '3.5';
        _this.transparency = '0.6';
        _this.borderSize = '1';
        _this.lightenSchemeColor = new TinyColor('#000000');
        _this.darkenSchemeColor = "#680317";
        return _this;
    }
    Object.defineProperty(GlassStyle, "Instance", {
        get: function () {
            var _a;
            (_a = GlassStyle._instance) !== null && _a !== void 0 ? _a : (GlassStyle._instance = new GlassStyle());
            return GlassStyle._instance;
        },
        enumerable: false,
        configurable: true
    });
    GlassStyle.prototype.onEnable = function () {
        $("body").addClass('glass-style');
        $("#glass-customizer").show();
        this.setupEvents();
        this.updateRadioUI();
        this.initRangeSliders();
        this.setupRangeSliderEvents();
        this.update();
    };
    GlassStyle.prototype.onDisable = function () {
        this.removeEvents();
        $(backgroundGlassSchemeColorSelectors).css('background-color', DynamicTheme.schemeColor.hex);
        $(backgroundGlassHighlightColorSelectors).css('background-color', DynamicTheme.highlightColor.hex);
        $(backgroundGlassColorfull1Selectors).css('background-color', DynamicTheme.colorfull1.hex);
        $(backgroundGlassColorfull2Selectors).css('background-color', DynamicTheme.colorfull2.hex);
        $(backgroundGlassColorfull3Selectors).css('background-color', DynamicTheme.colorfull3.hex);
        $(borderSizeBlurDependentSelectors).css({
            'border': "none", // alternative: use CSS file
        });
    };
    GlassStyle.prototype.setupEvents = function () {
        var _this = this;
        $(".glass-style .pill-button ").hover(function (event) {
            // TODO: variablize
            $(event.currentTarget).css({
                'background-color': "rgba(255, 255, 255, " + _this.transparency + ")",
                'color': DynamicTheme.highlightColor.hex
            });
        }, function (event) {
            if ($(event.currentTarget).hasClass('active'))
                return;
            $(event.currentTarget).css({
                'background-color': "rgba(" + DynamicTheme.highlightColor.rValue + ", " + DynamicTheme.highlightColor.gValue + ", " + DynamicTheme.highlightColor.bValue + ", " + _this.transparency + ")",
                'color': DynamicTheme.highlightColor.getInvertBlackWhite()
            });
        });
    };
    GlassStyle.prototype.removeEvents = function () {
        $('.pill-button').off('mouseenter mouseleave');
    };
    GlassStyle.prototype.updateLightenSchemeColor = function () {
        this.lightenSchemeColor.setHex(DynamicTheme.schemeColor.getLighten(lightenIntensity));
    };
    GlassStyle.prototype.initRangeSliders = function () {
        $('#glass-transparency').attr('value', this.transparency);
        $("#glass-transparency").next('.range-slider__value').html(this.transparency.toString());
        $('#glass-blur').attr('value', this.blur);
        $("#glass-blur").next('.range-slider__value').html(this.blur.toString());
        $('#glass-border-size').attr('value', this.borderSize);
        $("#glass-border-size").next('.range-slider__value').html(this.borderSize.toString());
    };
    GlassStyle.prototype.setupRangeSliderEvents = function () {
        var _this = this;
        $("#glass-transparency, #glass-blur, #glass-border-size").on('input', function (event) {
            var newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'glass-transparency':
                    _this.transparency = newValue;
                    _this.updateTransparency();
                    break;
                case 'glass-blur':
                    _this.blur = newValue;
                    _this.updateBlur();
                    break;
                case 'glass-border-size':
                    _this.borderSize = newValue;
                    _this.updateBorderSize();
                    break;
            }
        });
    };
    GlassStyle.prototype.updateTransparency = function () {
        $(backgroundGlassHighlightColorSelectors).css('background-color', "rgba(" + DynamicTheme.highlightColor.rValue + ", " + DynamicTheme.highlightColor.gValue + ", " + DynamicTheme.highlightColor.bValue + ", " + this.transparency + ")");
        $(backgroundGlassSchemeColorSelectors).css('background-color', "rgba(" + DynamicTheme.schemeColor.rValue + ", " + DynamicTheme.schemeColor.gValue + ", " + DynamicTheme.schemeColor.bValue + ", " + this.transparency + ")");
        $(backgroundGlassLightenSchemeColorSelectors).css('background-color', "rgba(" + this.lightenSchemeColor.rValue + ", " + this.lightenSchemeColor.gValue + ", " + this.lightenSchemeColor.bValue + ", " + this.transparency + ")");
        $(backgroundGlassColorfull1Selectors).css('background-color', "rgba(" + DynamicTheme.colorfull1.rValue + ", " + DynamicTheme.colorfull1.gValue + ", " + DynamicTheme.colorfull1.bValue + ", " + this.transparency + ")");
        $(backgroundGlassColorfull2Selectors).css('background-color', "rgba(" + DynamicTheme.colorfull2.rValue + ", " + DynamicTheme.colorfull2.gValue + ", " + DynamicTheme.colorfull2.bValue + ", " + this.transparency + ")");
        $(backgroundGlassColorfull3Selectors).css('background-color', "rgba(" + DynamicTheme.colorfull3.rValue + ", " + DynamicTheme.colorfull3.gValue + ", " + DynamicTheme.colorfull3.bValue + ", " + this.transparency + ")");
        $(backgroundGlassActiveButtonSelectors).css({
            'background-color': "rgba(255, 255, 255, " + this.transparency + ")",
            'color': DynamicTheme.highlightColor.hex
        });
    };
    GlassStyle.prototype.updateBlur = function () {
        $(borderSizeBlurDependentSelectors).css({
            'backdrop-filter': "blur(" + this.blur + "px)",
            '-webkit-backdrop-filter': "blur(" + this.blur + "px)",
        });
    };
    GlassStyle.prototype.updateBorderSize = function () {
        $(borderSizeBlurDependentSelectors).css({
            'border': this.borderSize + "px solid rgba(209, 213, 219, 0.3)",
        });
    };
    GlassStyle.prototype.update = function () {
        this.updateLightenSchemeColor();
        this.updateTransparency();
        this.updateBlur();
        this.updateBorderSize();
        $(".glass-style :not(.portfolio-filter) .pill-button:not(.active)").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
        DynamicTheme.sliderThumbRule.style.boxShadow = 'none';
        DynamicTheme.sliderThumbFocusRule.style.boxShadow = 'none';
    };
    GlassStyle.prototype.updateRadioUI = function () {
    };
    GlassStyle.prototype.updateCheckboxUI = function () {
    };
    GlassStyle.prototype.resetUncheckedButtons = function (currentCheckedButton) {
        $('#portfolio .pill-button').not(currentCheckedButton).css({
            'background-color': "rgba(" + DynamicTheme.highlightColor.rValue + ", " + DynamicTheme.highlightColor.gValue + ", " + DynamicTheme.highlightColor.bValue + ", " + this.transparency + ")",
            'color': DynamicTheme.highlightColor.getInvertBlackWhite()
        });
    };
    return GlassStyle;
}(Style));
export { GlassStyle };
