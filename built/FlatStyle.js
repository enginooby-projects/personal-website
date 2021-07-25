import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
export const bgSchemeSelectors = [
    ".display-content>.container",
    ".display-content",
    ".range-slider__range",
    ".range-slider__value",
    ".modal-content"
];
export const bgLightenSchemeSelectors = [
    ".box-border",
    ".image-border",
    ".contact .form-item .form-group",
    ".segmented-control",
    ".checkbox label",
    ".setting-button-border",
    ".setting-panel",
    ".setting-button",
    "::-webkit-scrollbar-track"
];
export const bgHighlightSelectors = [
    ".radio-selection",
    ".radio-button-group .button.active",
    ".button:not(.radio-button-group .button)",
    ".radio-button-group .button:not(.active):hover",
    "table>tbody>tr:hover",
    "::-webkit-scrollbar-thumb",
    "::-webkit-slider-thumb "
];
export const bgDarkenHighlightSelectors = [
    "::-webkit-scrollbar-thumb:hover",
    "::-webkit-slider-thumb:hover",
    ".button:hover",
    ".button:not(.radio-button-group .button):hover",
];
export const colorHighlightSelectors = [
    ".segmented-control>input:hover+label",
    ".radio-button-group .button:not(.active)",
    ".checkbox input:hover~label i",
    ".checkbox input:checked~label i",
    ".checkbox input:checked~label+.name"
];
export const colorContrastHighlightSelectors = [
    ".segmented-control>input:checked+label",
];
export const colorBaseSelectors = [
    ".radio-button-group .button ",
];
export const colorMutedBaseSelectors = [
    ".segmented-control>input:not(:checked):not(:hover)+label",
    ".checkbox input:not(:checked)~label+.name",
    ".checkbox input:not(:checked):not(:hover)~label i",
];
export class FlatStyle extends Style {
    constructor() {
        super('flat-style');
        this.lightSchemeIntensity = 5;
        // darkenSchemeColor: string = "#c7c7c7";
        this.darkHighlightIntensity = 15;
        this.lightenSchemeColor = "#e1e1e1";
        this.darkenHighlightColor = "#033669";
        // lazy initializations
        this.getBgSchemeRule = () => { var _a; return (_a = this.bgSchemeRule) !== null && _a !== void 0 ? _a : (this.bgSchemeRule = this.insertEmptyRule(bgSchemeSelectors)); };
        this.getBgLightenSchemeRule = () => { var _a; return (_a = this.bgLightenSchemeRule) !== null && _a !== void 0 ? _a : (this.bgLightenSchemeRule = this.insertEmptyRule(bgLightenSchemeSelectors)); };
        this.getBgHighlightRule = () => { var _a; return (_a = this.bgHighlightRule) !== null && _a !== void 0 ? _a : (this.bgHighlightRule = this.insertEmptyRule(bgHighlightSelectors)); };
        this.getBgDarkenHighlightRule = () => { var _a; return (_a = this.bgDarkenHighlightRule) !== null && _a !== void 0 ? _a : (this.bgDarkenHighlightRule = this.insertEmptyRule(bgDarkenHighlightSelectors)); };
        this.getColorHighlightRule = () => { var _a; return (_a = this.colorHighlightRule) !== null && _a !== void 0 ? _a : (this.colorHighlightRule = this.insertEmptyRule(colorHighlightSelectors)); };
        this.getColorContrastHighlightRule = () => { var _a; return (_a = this.colorContrastHighlightRule) !== null && _a !== void 0 ? _a : (this.colorContrastHighlightRule = this.insertEmptyRule(colorContrastHighlightSelectors)); };
        this.getColorBaseRule = () => { var _a; return (_a = this.colorBaseRule) !== null && _a !== void 0 ? _a : (this.colorBaseRule = this.insertEmptyRule(colorBaseSelectors)); };
        this.getColorMutedBaseRule = () => { var _a; return (_a = this.colorMutedBaseRule) !== null && _a !== void 0 ? _a : (this.colorMutedBaseRule = this.insertEmptyRule(colorMutedBaseSelectors)); };
    }
    static get Instance() {
        var _a;
        (_a = FlatStyle._instance) !== null && _a !== void 0 ? _a : (FlatStyle._instance = new FlatStyle());
        return FlatStyle._instance;
    }
    init() { }
    setupCustomizeEvents() { }
    onHighlightColorUpdated() {
        this.darkenHighlightColor = DynamicTheme.highlightColor.getDarken(this.darkHighlightIntensity);
        this.updateBgHighlight();
        this.updateColorHighlight();
    }
    updateBgHighlight() {
        this.getBgHighlightRule().style.setProperty('background-color', DynamicTheme.highlightColor.hex, 'important');
        this.getBgHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
        this.insertEmptyRule(bgDarkenHighlightSelectors).style.setProperty('background-color', this.darkenHighlightColor, 'important');
        this.getBgDarkenHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
    }
    updateColorHighlight() {
        this.getColorHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
        this.getColorContrastHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
    }
    onSchemeColorUpdated() {
        this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(this.lightSchemeIntensity);
        this.getBgSchemeRule().style.setProperty('background-color', DynamicTheme.schemeColor.hex, 'important');
        this.getBgSchemeRule().style.setProperty('color', DynamicTheme.schemeColor.getInvertBlackWhite(), 'important');
        this.getBgLightenSchemeRule().style.setProperty('background-color', this.lightenSchemeColor, 'important');
        this.getBgLightenSchemeRule().style.setProperty('color', DynamicTheme.schemeColor.getInvertBlackWhite(), 'important');
    }
    onBaseColorUpdated() {
        this.getColorBaseRule().style.setProperty('color', DynamicTheme.baseColor, 'important');
        this.getColorMutedBaseRule().style.setProperty('color', DynamicTheme.mutedBaseColor, 'important');
    }
}
