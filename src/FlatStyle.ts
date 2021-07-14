import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';

const bgSchemeSelectors = [
        ".display-content>.container",
        ".range-slider__range",
        ".range-slider__value",
        ".modal-content"
];

const bgLightenSchemeSelectors = [
        ".box-border",
        ".image-border",
        ".contact .form-item .form-group",
        ".segmented-control",
        ".checkbox label",
        ".pallet-border",
        ".color-pallet",
        ".pallet-button",
        "::-webkit-scrollbar-track"
];

const bgHighlightSelectors = [
        ".radio-selection",
        ".portfolio-filter .pill-button.active",
        ".pill-button:not( .theme-skin .pill-button):not(.portfolio-filter .pill-button)",
        " .theme-skin .pill-button.active",
        ".theme-skin .pill-button:not(.active):hover",
        ".portfolio-filter .pill-button:not(.active):hover",
        "table>tbody>tr:hover",
        "::-webkit-scrollbar-thumb",
        "::-webkit-slider-thumb "
];

const bgDarkenHighlightSelectors = [
        "::-webkit-scrollbar-thumb:hover",
        "::-webkit-slider-thumb:hover",
        ".pill-button:hover"
]

const colorHighlightSelectors = [
        ".segmented-control>input:hover+label",
        ".portfolio-filter .pill-button:not(.active)",
        ".theme-skin .pill-button:not(.active)",
        ".checkbox input:hover~label i",
        ".checkbox input:checked~label i",
        ".checkbox input:checked~label+.name"
];

const colorContrastHighlightSelectors = [
        ".segmented-control>input:checked+label",
]

const colorBaseSelectors = [
        ".portfolio-filter .pill-button ",
];

const colorMutedBaseSelectors = [
        ".segmented-control>input:not(:checked):not(:hover)+label",
        ".checkbox input:not(:checked)~label+.name",
        ".checkbox input:not(:checked):not(:hover)~label i",
]

export class FlatStyle extends Style {
        // Singleton Pattern
        private static _instance: FlatStyle;
        private constructor() { super() }
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

        init() {
                $("body").addClass('flat-style');
        }

        setupCustomizeEvents(): void { }

        onHighlightColorUpdated(): void {
                this.darkenHighlightColor = DynamicTheme.highlightColor.getDarken(this.darkHighlightIntensity);
                this.getBgHighlightRule().style.setProperty('background-color', DynamicTheme.highlightColor.hex, 'important');
                this.getBgHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
                this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
                this.getBgDarkenHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
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

        onBaseColorUpdated(): void {
                this.getColorBaseRule().style.setProperty('color', DynamicTheme.baseColor, 'important');
                this.getColorMutedBaseRule().style.setProperty('color', DynamicTheme.mutedBaseColor, 'important');
        }
}