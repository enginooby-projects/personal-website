import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
const backgroundSchemeColorSelectors = [
    ".display-content>.container",
    "::-webkit-scrollbar-track",
    "::-webkit-scrollbar-thumb",
];
const colorHighlightColorSelectors = [
    ".pill-button",
    " .checkbox input:checked~label+.name",
    ".checkbox input:checked~label i",
    ".checkbox input:hover~label i",
    ".segmented-control>input:checked+label",
    ".segmented-control>input:hover+label",
];
const colorMutedBaseColorSelectors = [
    ".checkbox input:not(:checked)~label+.name",
    ".checkbox input:not(:checked):not(:hover)~label i",
    ".segmented-control>input:not(:checked):not(:hover)+label"
];
const dropBoxShadowSelectors = [
    //COMMON
    ".toggle .indicator",
    ".button-border",
    ".box-border",
    ".image-border",
    ".badge-border",
    ".pallet-border",
    ".segmented-control",
    ".hero-03 .personal-image img",
    ".checkbox label",
    ".blog-intro",
    "table",
    "table thead ",
    ".range-slider__value",
    ".color-pallet",
    "::-webkit-slider-thumb",
    //contact
    ".form-group input:focus",
    ".form-group textarea:focus",
];
const insetBoxShadowSelectors = [
    ".custom-scrollbar",
    ".blog .blog-image .after",
    ".skill-boxes .box-border",
    ".color-switcher .scrollable",
    ".timeline-items.box-border",
    ".range-slider__range",
    "::-webkit-scrollbar-track",
    ".checkbox input:checked~label",
    ".pill-button.active",
    ".theme-skin .pill-button.active",
    ".pallet-button.active",
    ".pill-button:hover",
    ".theme-skin .pill-button:hover",
    ".badge-border:hover",
    "table>tbody>tr:hover",
    ".pallet-button:hover",
    ".radio-selection",
];
const concaveBoxShadowSelectors = [
    ".skill-box .skillbar",
    // ".form-group",
    "input[type=range]:focus",
    "::-webkit-slider-thumb:hover",
    //CONTACT
    ".form-group input",
    ".form-group textarea",
    ".toggle",
];
const surfaceSelectors = [
    ".pill-button",
    ".pallet-button",
    ".box-border",
    ".color-pallet",
    ".image-border",
    ".badge-border",
    ".segmented-control",
    ".checkbox label",
    ".blog-intro",
    "  .form-item .form-group",
    ".range-slider__range",
    ".range-slider__value",
    "::-webkit-slider-thumb",
    ".portfolio-single .modal-content",
    "table thead ",
];
// REFACTOR: generic singleton
export class NeuStyle extends Style {
    constructor() {
        super('neu-style');
        this.distance = 3;
        this.blur = 4;
        this.lightenIntensity = 7;
        this.darkenIntensity = 7;
        this.lightenSchemeColor = "#e6e6e6";
        this.darkenSchemeColor = "#c2c2c2";
        this.dropBoxShadow = '';
        this.insetBoxShadow = '';
        this.pressedBoxShadow = '';
        this.thumbScrollbarBoxShadow = '';
        //TODO: implement curvature for colorful background
        // negative: concave - 0: flat - positive: convex
        this.surfaceCurvature = 0;
        this.bgSurface = '';
        // lazy initializations
        this.getBackgroundSchemeColorRule = () => { var _a; return (_a = this.backgroundSchemeColorRule) !== null && _a !== void 0 ? _a : (this.backgroundSchemeColorRule = this.insertEmptyRule(backgroundSchemeColorSelectors)); };
        this.getColorHighlightColorRule = () => { var _a; return (_a = this.colorHighlightColorRule) !== null && _a !== void 0 ? _a : (this.colorHighlightColorRule = this.insertEmptyRule(colorHighlightColorSelectors)); };
        this.getColorMutedBaseColorRule = () => { var _a; return (_a = this.colorMutedBaseColorRule) !== null && _a !== void 0 ? _a : (this.colorMutedBaseColorRule = this.insertEmptyRule(colorMutedBaseColorSelectors)); };
        this.getDropBoxShadowRule = () => { var _a; return (_a = this.dropBoxShadowRule) !== null && _a !== void 0 ? _a : (this.dropBoxShadowRule = this.insertEmptyRule(dropBoxShadowSelectors)); };
        this.getInsetBoxShadowRule = () => { var _a; return (_a = this.insetBoxShadowRule) !== null && _a !== void 0 ? _a : (this.insetBoxShadowRule = this.insertEmptyRule(insetBoxShadowSelectors)); };
        this.getConcaveBoxShadowRule = () => { var _a; return (_a = this.concaveBoxShadowRule) !== null && _a !== void 0 ? _a : (this.concaveBoxShadowRule = this.insertEmptyRule(concaveBoxShadowSelectors)); };
        this.getThumbScrollbarBoxShadowRule = () => { var _a; return (_a = this.thumbScrollbarBoxShadowRule) !== null && _a !== void 0 ? _a : (this.thumbScrollbarBoxShadowRule = this.insertEmptyRule(['::-webkit-scrollbar-thumb'])); };
        this.getSurfaceRule = () => { var _a; return (_a = this.surfaceRule) !== null && _a !== void 0 ? _a : (this.surfaceRule = this.insertEmptyRule(surfaceSelectors)); };
    }
    static get Instance() {
        var _a;
        (_a = NeuStyle._instance) !== null && _a !== void 0 ? _a : (NeuStyle._instance = new NeuStyle());
        return NeuStyle._instance;
    }
    init() {
        this.initRangeSliders();
    }
    initRangeSliders() {
        $('#distance').attr('value', this.distance);
        $("#distance").next('.range-slider__value').html(this.distance.toString());
        $('#blur').attr('value', this.blur);
        $("#blur").next('.range-slider__value').html(this.blur.toString());
        $('#light-intensity').attr('value', this.lightenIntensity);
        $("#light-intensity").next('.range-slider__value').html(this.lightenIntensity.toString());
        $('#dark-intensity').attr('value', this.darkenIntensity);
        $("#dark-intensity").next('.range-slider__value').html(this.darkenIntensity.toString());
        $('#surface-curvature').attr('value', this.surfaceCurvature);
        $("#surface-curvature").next('.range-slider__value').html(this.surfaceCurvature.toString());
    }
    setupCustomizeEvents() {
        $("#distance, #blur, #light-intensity, #dark-intensity, #surface-curvature").on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'distance':
                    this.distance = parseInt(newValue);
                    break;
                case 'blur':
                    this.blur = parseInt(newValue);
                    break;
                case 'light-intensity':
                    this.lightenIntensity = parseInt(newValue);
                    break;
                case 'dark-intensity':
                    this.darkenIntensity = parseInt(newValue);
                    break;
                case 'surface-curvature':
                    this.surfaceCurvature = parseInt(newValue);
                    this.updateSurface();
                    return;
                // break;
            }
            this.updateBoxShadows();
        });
    }
    onHighlightColorUpdated() {
        this.getColorHighlightColorRule().style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
    }
    onSchemeColorUpdated() {
        this.getBackgroundSchemeColorRule().style.setProperty('background', DynamicTheme.schemeColor.hex, 'important');
        this.updateBoxShadows();
        this.updateSurface();
    }
    onBaseColorUpdated() {
        this.getColorMutedBaseColorRule().style.setProperty('color', DynamicTheme.mutedBaseColor, 'important');
    }
    updateBoxShadows() {
        this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(this.lightenIntensity);
        this.darkenSchemeColor = DynamicTheme.schemeColor.getDarken(this.darkenIntensity);
        this.dropBoxShadow = `${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
        this.insetBoxShadow = `inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
        this.pressedBoxShadow = `${this.dropBoxShadow}, ${this.insetBoxShadow}`; // TODO: Does not look good!
        this.thumbScrollbarBoxShadow = `inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
        this.getDropBoxShadowRule().style.setProperty('box-shadow', this.dropBoxShadow, 'important');
        this.getInsetBoxShadowRule().style.setProperty('box-shadow', this.insetBoxShadow, 'important');
        this.getConcaveBoxShadowRule().style.setProperty('box-shadow', this.pressedBoxShadow, 'important');
        this.getThumbScrollbarBoxShadowRule().style.setProperty('box-shadow', this.thumbScrollbarBoxShadow, 'important');
    }
    updateSurface() {
        const leftSurfaceColor = DynamicTheme.schemeColor.getLighten(this.surfaceCurvature);
        const rightSurfaceColor = DynamicTheme.schemeColor.getDarken(this.surfaceCurvature);
        this.bgSurface = `linear-gradient(145deg, ${leftSurfaceColor}, ${rightSurfaceColor})`;
        this.getSurfaceRule().style.setProperty('background', this.bgSurface, 'important');
    }
}
//  Singleton Pattern
NeuStyle._instance = new NeuStyle();
