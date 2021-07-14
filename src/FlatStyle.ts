import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
import { StyleRuleStore } from './StyleRuleStore.js';

const backgroundHighlightColorSelectors = formatString([//colorContrastHighlightColorSelectors
        ".radio-selection",
        ".portfolio-filter .pill-button.active",
        ".pill-button",
        " .theme-skin .pill-button.active",
        ".theme-skin .pill-button:not(.active):hover",
        ".portfolio-filter .pill-button:not(.active):hover",
        "table>tbody>tr:hover",
        "::-webkit-scrollbar-thumb",
        "::-webkit-slider-thumb "
]);

const backgroundDarkenHighlightColorSelectors = [
        "::-webkit-scrollbar-thumb:hover",
        "::-webkit-slider-thumb:hover",
        ".pill-button:hover"
]

const backgroundLightenSchemeColorSelectors = formatString([ //colorBaseColorSelectors
        ".box-border",
        ".image-border",
        ".contact .form-item .form-group",
        ".segmented-control",
        ".checkbox label",
        ".pallet-border",
        ".color-pallet",
        ".pallet-button",
        "::-webkit-scrollbar-track"
]);

const backgroundSchemeColorSelectors = formatString([
        ".display-content>.container",
        ".range-slider__range",
        ".range-slider__value",
]);

const colorBaseColorSelectors = formatString([
        ".portfolio-filter .pill-button ",
]);

const colorHighlightColorSelectors = [
        ".segmented-control>input:hover+label",
        ".portfolio-filter .pill-button:not(.active)",
        ".theme-skin .pill-button:not(.active)",
        ".checkbox input:hover~label",
        ".checkbox input:checked~label i",
        ".checkbox input:checked~label+.name"
];

const colorMutedBaseColorSelectors = [
        ".segmented-control>input:not(:checked):not(:hover)+label",
        ".checkbox input:not(:checked)~label+.name",
        ".checkbox input:not(:checked):not(:hover)~label i",
]

const colorContrastHighlightColorSelectors = [
        ".segmented-control>input:checked+label",
]


function formatString(selectorsArray: string[]): string {
        return selectorsArray.join(", ");
}

export class FlatStyle extends Style {
        // Singleton Pattern
        private static _instance: FlatStyle;
        private constructor() { super() }
        public static get Instance(): FlatStyle {
                FlatStyle._instance ??= new FlatStyle();
                return FlatStyle._instance;
        }

        lightSchemeIntensity: number = 5;
        lightenSchemeColor: string = "#e1e1e1";
        // darkenSchemeColor: string = "#c7c7c7";
        darkHighlightIntensity: number = 15;
        darkenHighlightColor: string = "#033669"

        init() {
                $("body").addClass('flat-style');
                console.log('<<<<<<<<<<<');
        }

        setupCustomizeEvents(): void { }

        onHighlightColorUpdated(): void {
                $(backgroundHighlightColorSelectors).css('background-color', DynamicTheme.highlightColor.hex);
                $(":not(.portfolio-filter) .pill-button").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
                $(".theme-skin .pill-button.active").css('background-color', DynamicTheme.highlightColor.getDarken(15));
                StyleRuleStore.Instance.getSliderThumbHoverRule().style.backgroundColor = DynamicTheme.highlightColor.hex;
        }

        onSchemeColorUpdated(): void {
                this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(this.lightSchemeIntensity);
                $(backgroundLightenSchemeColorSelectors).css('background-color', this.lightenSchemeColor);
                // $(backgroundDarkenSchemeColorSelectors).css('background-color', this.darkenSchemeColor);
                $(backgroundSchemeColorSelectors).css('background-color', DynamicTheme.schemeColor.hex);
                $(colorBaseColorSelectors).css('color', DynamicTheme.baseColor);
                StyleRuleStore.Instance.getTrackScrollbarRule().style.background = this.lightenSchemeColor;
                // StyleRuleStore.Instance.getThumbScrollbarRule().style.background = this.darkenSchemeColor;
        }

        onBaseColorUpdated(): void {
        }
}