import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';

const backgroundSchemeColorSelectors = [
        ".display-content>.container",
        "  .form-item .form-group",
        ".segmented-control",
        ".checkbox label",
        ".color-pallet",
        ".portfolio-single .modal-content",
        ".range-slider__range",
        ".range-slider__value",
        ".box-border",
        ".pill-button",
        ".pallet-button",
        "::-webkit-scrollbar-track",
        "::-webkit-scrollbar-thumb",
        "::-webkit-slider-thumb"
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
        ".theme-skin .pill-button",
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
        "::-webkit-slider-thumb",
];

const insetBoxShadowSelectors = [
        ".custom-scrollbar",
        ".blog .blog-image .after",
        ".skill-boxes .box-border",
        ".color-pallet",
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
        ".pallet-button:hover"
];

const concaveBoxShadowSelectors = [
        ".skill-box .skillbar",
        ".form-group",
        ".radio-selection",
        "input[type=range]:focus",
        "::-webkit-slider-thumb:hover"
];

// REFACTOR: generic singleton
export class NeuStyle extends Style {
        //  Singleton Pattern
        private static _instance: NeuStyle = new NeuStyle();
        private constructor() { super() }
        public static get Instance(): NeuStyle {
                NeuStyle._instance ??= new NeuStyle();
                return NeuStyle._instance;
        }

        distance: number = 3;
        blur: number = 8;
        lightenIntensity: number = 7;
        darkenIntensity: number = 7;
        lightenSchemeColor: string = "#e6e6e6";
        darkenSchemeColor: string = "#c2c2c2";

        dropBoxShadow: string = '';
        insetBoxShadow: string = '';
        concaveBoxShadow: string = '';
        thumbScrollbarBoxShadow: string = '';

        private backgroundSchemeColorRule?: CSSStyleRule;
        private colorHighlightColorRule?: CSSStyleRule;
        private colorMutedBaseColorRule?: CSSStyleRule;
        private dropBoxShadowRule?: CSSStyleRule;
        private insetBoxShadowRule?: CSSStyleRule;
        private concaveBoxShadowRule?: CSSStyleRule;
        private thumbScrollbarBoxShadowRule?: CSSStyleRule;

        // lazy initializations
        getBackgroundSchemeColorRule = () => this.backgroundSchemeColorRule ?? (this.backgroundSchemeColorRule = this.insertEmptyRule(backgroundSchemeColorSelectors));
        getColorHighlightColorRule = () => this.colorHighlightColorRule ?? (this.colorHighlightColorRule = this.insertEmptyRule(colorHighlightColorSelectors));
        getColorMutedBaseColorRule = () => this.colorMutedBaseColorRule ?? (this.colorMutedBaseColorRule = this.insertEmptyRule(colorMutedBaseColorSelectors));
        getDropBoxShadowRule = () => this.dropBoxShadowRule ?? (this.dropBoxShadowRule = this.insertEmptyRule(dropBoxShadowSelectors));
        getInsetBoxShadowRule = () => this.insetBoxShadowRule ?? (this.insetBoxShadowRule = this.insertEmptyRule(insetBoxShadowSelectors));
        getConcaveBoxShadowRule = () => this.concaveBoxShadowRule ?? (this.concaveBoxShadowRule = this.insertEmptyRule(concaveBoxShadowSelectors));
        getThumbScrollbarBoxShadowRule = () => this.thumbScrollbarBoxShadowRule ?? (this.thumbScrollbarBoxShadowRule = this.insertEmptyRule(['::-webkit-scrollbar-thumb']));

        init() {
                $("body").addClass("neu-style");
                this.initRangeSliders();
                console.log('<<<<<<<<<<<')
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
        }

        setupCustomizeEvents(): void {
                $("#distance, #blur, #light-intensity, #dark-intensity").on('input', (event) => {
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
        }

        onBaseColorUpdated(): void {
                this.getColorMutedBaseColorRule().style.setProperty('color', DynamicTheme.mutedBaseColor, 'important');
        }

        private updateBoxShadows() {
                this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(this.lightenIntensity);
                this.darkenSchemeColor = DynamicTheme.schemeColor.getDarken(this.darkenIntensity);
                this.dropBoxShadow = `${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
                this.insetBoxShadow = `inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
                this.concaveBoxShadow = `${this.dropBoxShadow}, ${this.insetBoxShadow}`; // TODO: Does not look good!
                this.thumbScrollbarBoxShadow = `inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;

                this.getDropBoxShadowRule().style.setProperty('box-shadow', this.dropBoxShadow, 'important');
                this.getInsetBoxShadowRule().style.setProperty('box-shadow', this.insetBoxShadow, 'important');
                this.getConcaveBoxShadowRule().style.setProperty('box-shadow', this.concaveBoxShadow, 'important');
                this.getThumbScrollbarBoxShadowRule().style.setProperty('box-shadow', this.thumbScrollbarBoxShadow, 'important');
        }
}