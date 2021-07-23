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
]

// REFACTOR: generic singleton
export class NeuStyle extends Style {
        //  Singleton Pattern
        private static _instance: NeuStyle = new NeuStyle();
        private constructor() { super('neu-style') }
        public static get Instance(): NeuStyle {
                NeuStyle._instance ??= new NeuStyle();
                return NeuStyle._instance;
        }

        // TODO: implement border size
        distance: number = 3;
        blur: number = 4;
        lightenIntensity: number = 7;
        darkenIntensity: number = 7;
        lightenSchemeColor: string = "#e6e6e6";
        darkenSchemeColor: string = "#c2c2c2";

        dropBoxShadow: string = '';
        insetBoxShadow: string = '';
        pressedBoxShadow: string = '';
        thumbScrollbarBoxShadow: string = '';

        //TODO: implement curvature for colorful background
        // negative: concave - 0: flat - positive: convex
        surfaceCurvature: number = 0;
        bgSurface: string = '';

        private backgroundSchemeColorRule?: CSSStyleRule;
        private colorHighlightColorRule?: CSSStyleRule;
        private colorMutedBaseColorRule?: CSSStyleRule;
        private dropBoxShadowRule?: CSSStyleRule;
        private insetBoxShadowRule?: CSSStyleRule;
        private concaveBoxShadowRule?: CSSStyleRule;
        private thumbScrollbarBoxShadowRule?: CSSStyleRule;
        private surfaceRule?: CSSStyleRule;

        // lazy initializations
        getBackgroundSchemeColorRule = () => this.backgroundSchemeColorRule ?? (this.backgroundSchemeColorRule = this.insertEmptyRule(backgroundSchemeColorSelectors));
        getColorHighlightColorRule = () => this.colorHighlightColorRule ?? (this.colorHighlightColorRule = this.insertEmptyRule(colorHighlightColorSelectors));
        getColorMutedBaseColorRule = () => this.colorMutedBaseColorRule ?? (this.colorMutedBaseColorRule = this.insertEmptyRule(colorMutedBaseColorSelectors));
        getDropBoxShadowRule = () => this.dropBoxShadowRule ?? (this.dropBoxShadowRule = this.insertEmptyRule(dropBoxShadowSelectors));
        getInsetBoxShadowRule = () => this.insetBoxShadowRule ?? (this.insetBoxShadowRule = this.insertEmptyRule(insetBoxShadowSelectors));
        getConcaveBoxShadowRule = () => this.concaveBoxShadowRule ?? (this.concaveBoxShadowRule = this.insertEmptyRule(concaveBoxShadowSelectors));
        getThumbScrollbarBoxShadowRule = () => this.thumbScrollbarBoxShadowRule ?? (this.thumbScrollbarBoxShadowRule = this.insertEmptyRule(['::-webkit-scrollbar-thumb']));
        getSurfaceRule = () => this.surfaceRule ?? (this.surfaceRule = this.insertEmptyRule(surfaceSelectors));

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

        setupCustomizeEvents(): void {
                $("#distance, #blur, #light-intensity, #dark-intensity, #surface-curvature").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
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

        onHighlightColorUpdated(): void {
                this.getColorHighlightColorRule().style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
        }

        onSchemeColorUpdated(): void {
                this.getBackgroundSchemeColorRule().style.setProperty('background', DynamicTheme.schemeColor.hex, 'important');
                this.updateBoxShadows();
                this.updateSurface();
        }

        onBaseColorUpdated(): void {
                this.getColorMutedBaseColorRule().style.setProperty('color', DynamicTheme.mutedBaseColor, 'important');
        }

        private updateBoxShadows() {
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

        private updateSurface() {
                const leftSurfaceColor = DynamicTheme.schemeColor.getLighten(this.surfaceCurvature);
                const rightSurfaceColor = DynamicTheme.schemeColor.getDarken(this.surfaceCurvature);
                this.bgSurface = `linear-gradient(145deg, ${leftSurfaceColor}, ${rightSurfaceColor})`
                this.getSurfaceRule().style.setProperty('background', this.bgSurface, 'important');
        }
}