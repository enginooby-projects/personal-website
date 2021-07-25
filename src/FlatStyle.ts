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
        ".button:not(.radio-button-group .button):hover",
]

export const colorHighlightSelectors = [
        ".segmented-control>input:hover+label",
        ".radio-button-group .button:not(.active)",
        ".checkbox input:hover~label i",
        ".checkbox input:checked~label i",
        ".checkbox input:checked~label+.name"
];

export const colorContrastHighlightSelectors = [
        ".segmented-control>input:checked+label",
]

export const colorBaseSelectors = [
        ".radio-button-group .button ",
];

export const colorMutedBaseSelectors = [
        ".segmented-control>input:not(:checked):not(:hover)+label",
        ".checkbox input:not(:checked)~label+.name",
        ".checkbox input:not(:checked):not(:hover)~label i",
]

export class FlatStyle extends Style {
        // Singleton Pattern
        private static _instance: FlatStyle;
        private constructor() { super('flat-style') }
        public static get Instance(): FlatStyle {
                FlatStyle._instance ??= new FlatStyle();
                return FlatStyle._instance;
        }

        lightSchemeIntensity: number = 5;
        // darkenSchemeColor: string = "#c7c7c7";
        darkHighlightIntensity: number = 15;
        lightenSchemeColor: string = "#e1e1e1";
        darkenHighlightColor: string = "#033669"

        private bgSchemeRule?: CSSStyleRule;
        private bgLightenSchemeRule?: CSSStyleRule;
        private bgHighlightRule?: CSSStyleRule;
        private bgDarkenHighlightRule?: CSSStyleRule;
        private colorHighlightRule?: CSSStyleRule;
        private colorContrastHighlightRule?: CSSStyleRule;
        private colorBaseRule?: CSSStyleRule;
        private colorMutedBaseRule?: CSSStyleRule;

        // lazy initializations
        getBgSchemeRule = () => this.bgSchemeRule ?? (this.bgSchemeRule = this.insertEmptyRule(bgSchemeSelectors));
        getBgLightenSchemeRule = () => this.bgLightenSchemeRule ?? (this.bgLightenSchemeRule = this.insertEmptyRule(bgLightenSchemeSelectors));
        getBgHighlightRule = () => this.bgHighlightRule ?? (this.bgHighlightRule = this.insertEmptyRule(bgHighlightSelectors));
        getBgDarkenHighlightRule = () => this.bgDarkenHighlightRule ?? (this.bgDarkenHighlightRule = this.insertEmptyRule(bgDarkenHighlightSelectors));
        getColorHighlightRule = () => this.colorHighlightRule ?? (this.colorHighlightRule = this.insertEmptyRule(colorHighlightSelectors));
        getColorContrastHighlightRule = () => this.colorContrastHighlightRule ?? (this.colorContrastHighlightRule = this.insertEmptyRule(colorContrastHighlightSelectors));
        getColorBaseRule = () => this.colorBaseRule ?? (this.colorBaseRule = this.insertEmptyRule(colorBaseSelectors));
        getColorMutedBaseRule = () => this.colorMutedBaseRule ?? (this.colorMutedBaseRule = this.insertEmptyRule(colorMutedBaseSelectors));

        init() { }

        setupCustomizeEvents(): void { }

        onHighlightColorUpdated(): void {
                this.darkenHighlightColor = DynamicTheme.highlightColor.getDarken(this.darkHighlightIntensity);
                this.updateBgHighlight();
                this.updateColorHighlight();
        }

        private updateBgHighlight() {
                this.getBgHighlightRule().style.setProperty('background-color', DynamicTheme.highlightColor.hex, 'important');
                this.getBgHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
                this.insertEmptyRule(bgDarkenHighlightSelectors).style.setProperty('background-color', this.darkenHighlightColor, 'important');
                this.getBgDarkenHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
        }

        public updateColorHighlight() {
                this.getColorHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
                this.getColorContrastHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
        }

        onSchemeColorUpdated(): void {
                this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(this.lightSchemeIntensity);
                this.getBgSchemeRule().style.setProperty('background-color', DynamicTheme.schemeColor.hex, 'important');
                this.getBgSchemeRule().style.setProperty('color', DynamicTheme.schemeColor.getInvertBlackWhite(), 'important');
                this.getBgLightenSchemeRule().style.setProperty('background-color', this.lightenSchemeColor, 'important');
                this.getBgLightenSchemeRule().style.setProperty('color', DynamicTheme.schemeColor.getInvertBlackWhite(), 'important');
        }

        public onBaseColorUpdated(): void {
                this.getColorBaseRule().style.setProperty('color', DynamicTheme.baseColor, 'important');
                this.getColorMutedBaseRule().style.setProperty('color', DynamicTheme.mutedBaseColor, 'important');
        }
}