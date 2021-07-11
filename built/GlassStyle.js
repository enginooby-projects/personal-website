import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
import { TinyColor } from './TinyColor.js';
const lightenIntensity = 15;
const darkenIntensity = 10;
const backgroundGlassHighlightColorSelectors = formatString([
    ".glass-style .pill-button:not(.glass-style .pill-button.active)",
    " .contact .form-item .form-group",
    ".segmented-control",
    ".checkbox label",
    ".glass-style .segmented-control",
]);
const backgroundGlassSchemeColorSelectors = formatString([
    // ".glass-style .section",
    ".glass-style .display-content>.container",
    ".glass-style .color-switcher .color-pallet.show",
    ".glass-style .color-switcher .color-pallet",
    ".glass-style .pallet-button",
    ".glass-style .skillbar",
    ".glass-style .radio-selection"
]);
const backgroundGlassLightenSchemeColorSelectors = formatString([
    ".glass-style .box-border",
    ".glass-style #self-education .image-border",
    ".glass-style .contact .form-item .form-group",
    ".glass-style .checkbox label",
    // ".glass-style .pallet-border",
]);
const backgroundGlassActiveButtonSelectors = formatString([
    ".glass-style .pill-button.active"
]);
const backgroundGlassColorfull1Selectors = formatString([
    ".background-colorfull1:not(#self-education .background-colorfull1)",
]);
const backgroundGlassColorfull2Selectors = formatString([
    ".background-colorfull2:not(#self-education .background-colorfull2)",
]);
const backgroundGlassColorfull3Selectors = formatString([
    ".background-colorfull3:not(#self-education .background-colorfull3)",
]);
const borderSizeBlurDependentSelectors = `${backgroundGlassHighlightColorSelectors}, ${backgroundGlassSchemeColorSelectors}, ${backgroundGlassLightenSchemeColorSelectors}, ${backgroundGlassColorfull1Selectors}, ${backgroundGlassColorfull2Selectors}, ${backgroundGlassColorfull3Selectors}, ${backgroundGlassActiveButtonSelectors}`;
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}
export class GlassStyle extends Style {
    constructor() {
        super();
        this.blur = '2';
        this.transparency = '0.6';
        this.borderSize = '1';
        this.lightenSchemeColor = new TinyColor('#000000');
        this.darkenSchemeColor = "#680317";
    }
    static get Instance() {
        var _a;
        (_a = GlassStyle._instance) !== null && _a !== void 0 ? _a : (GlassStyle._instance = new GlassStyle());
        return GlassStyle._instance;
    }
    init() {
        $("body").addClass('glass-style');
        this.initRangeSliders();
        $('section').each((index, element) => {
            element.classList.add('background-2');
        });
    }
    revertStyle() {
        $(backgroundGlassSchemeColorSelectors).css('background-color', DynamicTheme.schemeColor.hex);
        $(backgroundGlassHighlightColorSelectors).css('background-color', DynamicTheme.highlightColor.hex);
        $(backgroundGlassColorfull1Selectors).css('background-color', DynamicTheme.colorfull1.hex);
        $(backgroundGlassColorfull2Selectors).css('background-color', DynamicTheme.colorfull2.hex);
        $(backgroundGlassColorfull3Selectors).css('background-color', DynamicTheme.colorfull3.hex);
        $(borderSizeBlurDependentSelectors).css({
            'border': `none`, // alternative: use CSS file
        });
    }
    setupEvents() {
        this.setupRangeSliderEvents();
        $('.background-item').on('click', (event) => {
            const background = event.currentTarget.id;
            $('section').each((index, element) => {
                this.removeClassesByPrefix(element, 'background');
                element.classList.add(background);
            });
        });
        $(".glass-style .pill-button ").hover((event) => {
            // TODO: variablize
            $(event.currentTarget).css({
                'background-color': `rgba(255, 255, 255, ${this.transparency})`,
                'color': DynamicTheme.highlightColor.hex
            });
        }, (event) => {
            if ($(event.currentTarget).hasClass('active'))
                return;
            $(event.currentTarget).css({
                'background-color': `rgba(${DynamicTheme.highlightColor.rValue}, ${DynamicTheme.highlightColor.gValue}, ${DynamicTheme.highlightColor.bValue}, ${this.transparency})`,
                'color': DynamicTheme.highlightColor.getInvertBlackWhite()
            });
        });
    }
    removeEvents() {
        $('.pill-button').off('mouseenter mouseleave');
    }
    //HELPER
    removeClassesByPrefix(element, prefix) {
        for (let i = element.classList.length - 1; i >= 0; i--) {
            const className = element.classList[i];
            if (className.startsWith(prefix)) {
                element.classList.remove(className);
            }
        }
    }
    updateLightenSchemeColor() {
        this.lightenSchemeColor.setHex(DynamicTheme.schemeColor.getLighten(lightenIntensity));
    }
    initRangeSliders() {
        $('#glass-transparency').attr('value', this.transparency);
        $("#glass-transparency").next('.range-slider__value').html(this.transparency.toString());
        $('#glass-blur').attr('value', this.blur);
        $("#glass-blur").next('.range-slider__value').html(this.blur.toString());
        $('#glass-border-size').attr('value', this.borderSize);
        $("#glass-border-size").next('.range-slider__value').html(this.borderSize.toString());
    }
    setupRangeSliderEvents() {
        $("#glass-transparency, #glass-blur, #glass-border-size").on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'glass-transparency':
                    this.transparency = newValue;
                    this.updateTransparency();
                    break;
                case 'glass-blur':
                    this.blur = newValue;
                    this.updateBlur();
                    break;
                case 'glass-border-size':
                    this.borderSize = newValue;
                    this.updateBorderSize();
                    break;
            }
        });
    }
    updateTransparency() {
        $(backgroundGlassHighlightColorSelectors).css('background-color', this.formatRgba(DynamicTheme.highlightColor));
        $(backgroundGlassSchemeColorSelectors).css('background-color', this.formatRgba(DynamicTheme.schemeColor));
        $(backgroundGlassLightenSchemeColorSelectors).css('background-color', this.formatRgba(this.lightenSchemeColor));
        $(backgroundGlassColorfull1Selectors).css('background-color', this.formatRgba(DynamicTheme.colorfull1));
        $(backgroundGlassColorfull2Selectors).css('background-color', this.formatRgba(DynamicTheme.colorfull2));
        $(backgroundGlassColorfull3Selectors).css('background-color', this.formatRgba(DynamicTheme.colorfull3));
        $(backgroundGlassActiveButtonSelectors).css({
            'background-color': `rgba(255, 255, 255, ${this.transparency})`,
            'color': DynamicTheme.highlightColor.hex
        });
        DynamicTheme.thumbScrollbarRule.style.backgroundColor = this.formatRgba(DynamicTheme.highlightColor);
        DynamicTheme.trackScrollbarRule.style.backgroundColor = this.formatRgba(DynamicTheme.schemeColor);
    }
    formatRgba(color) {
        return `rgba(${color.rValue}, ${color.gValue}, ${color.bValue}, ${this.transparency})`;
    }
    updateBlur() {
        $(borderSizeBlurDependentSelectors).css({
            'backdrop-filter': `blur(${this.blur}px)`,
            '-webkit-backdrop-filter': `blur(${this.blur}px)`,
        });
    }
    updateBorderSize() {
        $(borderSizeBlurDependentSelectors).css({
            'border': `${this.borderSize}px solid rgba(209, 213, 219, 0.3)`,
        });
    }
    applyStyle() {
        this.updateLightenSchemeColor();
        this.updateTransparency();
        this.updateBlur();
        this.updateBorderSize();
        $(".glass-style :not(.portfolio-filter) .pill-button:not(.active)").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
        DynamicTheme.sliderThumbRule.style.boxShadow = 'none';
        DynamicTheme.sliderThumbFocusRule.style.boxShadow = 'none';
    }
    updateRadioUI() {
    }
    updateCheckboxUI() {
    }
    resetInactiveButtons(currentActiveButton) {
        $('#portfolio .pill-button').not(currentActiveButton).css({
            'background-color': this.formatRgba(DynamicTheme.highlightColor),
            'color': DynamicTheme.highlightColor.getInvertBlackWhite()
        });
    }
}
