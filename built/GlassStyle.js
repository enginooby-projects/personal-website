import * as DynamicTheme from './DynamicTheme.js';
import { FlatStyle } from './FlatStyle.js';
import { Style } from './Style.js';
import { TinyColor } from './TinyColor.js';
// CAUTION: FlatStyle depedent
export class GlassStyle extends Style {
    constructor() {
        super();
        this.blur = 2;
        this.transparency = 0.6;
        this.borderSize = 1;
        this.lightenSchemeIntensity = 15;
        this.darkHighlightIntensity = 15;
        this.lightenSchemeColor = new TinyColor('#fafafa');
        this.darkenHighlightColor = new TinyColor('#033669');
        // lazy initializations
        this.getBgColorfull1Rule = () => { var _a; return (_a = this.bgColorfull1Rule) !== null && _a !== void 0 ? _a : (this.bgColorfull1Rule = this.insertEmptyRule(['.background-colorfull1:not(.fill-skillbar)'])); };
        this.getBgColorfull2Rule = () => { var _a; return (_a = this.bgColorfull2Rule) !== null && _a !== void 0 ? _a : (this.bgColorfull2Rule = this.insertEmptyRule(['.background-colorfull2:not(.fill-skillbar)'])); };
        this.getBgColorfull3Rule = () => { var _a; return (_a = this.bgColorfull3Rule) !== null && _a !== void 0 ? _a : (this.bgColorfull3Rule = this.insertEmptyRule(['.background-colorfull3:not(.fill-skillbar)'])); };
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
    initRangeSliders() {
        $('#glass-transparency').attr('value', this.transparency);
        $("#glass-transparency").next('.range-slider__value').html(this.transparency.toString());
        $('#glass-blur').attr('value', this.blur);
        $("#glass-blur").next('.range-slider__value').html(this.blur.toString());
        $('#glass-border-size').attr('value', this.borderSize);
        $("#glass-border-size").next('.range-slider__value').html(this.borderSize.toString());
    }
    setupCustomizeEvents() {
        $("#glass-transparency, #glass-blur, #glass-border-size").on('input', (event) => {
            const newValue = parseInt(event.target.value);
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
        $('.background-item').on('click', (event) => {
            const background = event.currentTarget.id;
            $('section').each((index, element) => {
                this.removeClassesByPrefix(element, 'background');
                element.classList.add(background);
            });
        });
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
    updateBlur() {
        this.setToCurrentBlur(FlatStyle.Instance.getBgSchemeRule());
        this.setToCurrentBlur(FlatStyle.Instance.getBgLightenSchemeRule());
        this.setToCurrentBlur(FlatStyle.Instance.getBgHighlightRule());
        this.setToCurrentBlur(FlatStyle.Instance.getBgDarkenHighlightRule());
        this.setToCurrentBlur(this.getBgColorfull1Rule());
        this.setToCurrentBlur(this.getBgColorfull2Rule());
        this.setToCurrentBlur(this.getBgColorfull3Rule());
    }
    setToCurrentBlur(rule) {
        rule.style.setProperty('backdrop-filter', `blur(${this.blur}px)`, 'important');
        rule.style.setProperty('-webkit-backdrop-filter', `blur(${this.blur}px)`, 'important');
    }
    updateBorderSize() {
        this.setToCurrentBorderSize(FlatStyle.Instance.getBgSchemeRule());
        this.setToCurrentBorderSize(FlatStyle.Instance.getBgLightenSchemeRule());
        this.setToCurrentBorderSize(FlatStyle.Instance.getBgHighlightRule());
        this.setToCurrentBorderSize(FlatStyle.Instance.getBgDarkenHighlightRule());
        this.setToCurrentBorderSize(this.getBgColorfull1Rule());
        this.setToCurrentBorderSize(this.getBgColorfull2Rule());
        this.setToCurrentBorderSize(this.getBgColorfull3Rule());
        //TODO: use Map or Dictionary
        this.limitBorderSize('.pallet-button', 1.5);
        this.limitBorderSize('.range-slider__range', 2.5);
        this.limitBorderSize('.range-slider__value', 4);
    }
    //HELPER
    limitBorderSize(selector, limit) {
        document.querySelectorAll(selector).forEach((element) => element.style.setProperty('border-width', `${Math.min(limit, this.borderSize)}`, 'important'));
    }
    setToCurrentBorderSize(rule) {
        //TODO: Variablize border properties
        rule.style.setProperty('border', `${this.borderSize}px solid rgba(209, 213, 219, 0.3)`, 'important');
    }
    updateTransparency() {
        this.updateTransparencySchemeColor();
        this.updateTransparencyHighlightColor();
        this.updateTransparencyColorfull();
    }
    setToCurrentTransparency(rule, color) {
        const formattedColor = `rgba(${color.rValue}, ${color.gValue}, ${color.bValue}, ${this.transparency})`;
        const contrastColor = color.getInvertBlackWhite();
        rule.style.setProperty('background-color', formattedColor, 'important');
        rule.style.setProperty('color', contrastColor, 'important');
    }
    updateTransparencySchemeColor() {
        this.setToCurrentTransparency(FlatStyle.Instance.getBgSchemeRule(), DynamicTheme.schemeColor);
        this.setToCurrentTransparency(FlatStyle.Instance.getBgLightenSchemeRule(), this.lightenSchemeColor);
    }
    updateTransparencyHighlightColor() {
        this.setToCurrentTransparency(FlatStyle.Instance.getBgHighlightRule(), DynamicTheme.highlightColor);
        this.setToCurrentTransparency(FlatStyle.Instance.getBgDarkenHighlightRule(), DynamicTheme.highlightColor);
    }
    updateTransparencyColorfull() {
        //CONSIDER: Separate update functions if optimization needed
        this.setToCurrentTransparency(this.getBgColorfull1Rule(), DynamicTheme.colorfull1);
        this.setToCurrentTransparency(this.getBgColorfull2Rule(), DynamicTheme.colorfull2);
        this.setToCurrentTransparency(this.getBgColorfull3Rule(), DynamicTheme.colorfull3);
    }
    onHighlightColorUpdated() {
        this.darkenHighlightColor.setHex(DynamicTheme.highlightColor.getLighten(this.darkHighlightIntensity));
        this.updateTransparencyHighlightColor();
        FlatStyle.Instance.updateColorHighlight();
    }
    onSchemeColorUpdated() {
        this.lightenSchemeColor.setHex(DynamicTheme.schemeColor.getLighten(this.lightenSchemeIntensity));
        this.updateTransparencySchemeColor();
    }
    onBaseColorUpdated() {
        FlatStyle.Instance.onBaseColorUpdated();
    }
}
