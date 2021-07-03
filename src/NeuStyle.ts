import * as DynamicTheme from './DynamicTheme.js';
import ColorUtility from './ColorUtility.js'
import { Style } from './Style.js';

$(document).ready(function () {
        "use strict";
        $('.theme-skin li .neo-skin').click(function () {
                DynamicTheme.changeStyle(this, NeuStyle.Instance);
        });
});

const backgroundSchemeColorSelectors = formatString([
        ".section",
        " .button-border",
        " .box-border",
        ".image-border",
        ".box-hover-border",
        " .contact .form-item .form-group",
        ".pill-button.active",
        ".segmented-control",
        ".checkbox label",
        ".neo-skin",
        ".color-pallet",
        ".portfolio-single .modal-content",
        ".range-slider__range",
        ".pallet-border",
]);

const backgroundTransparentSelectors = formatString([
        ".radio-selection",
]);

const colorHighlightColorSelectors = formatString([
        ".pill-button",
]);

const dropBoxShadowSelectors = formatString([
        ".button-border",
        ".box-border",
        ".image-border",
        ".segmented-control",
        ".hero-03 .personal-image img",
        ".checkbox label",
        ".blog-intro",
        " .pal-border",
        ".badge-border",
        ".neo-skin",
        "table",
        "table thead ",
        ".pallet-border",
        // ".badge-pill"
]);

const insetBoxShadowSelectors = formatString([
        ".pill-button.active",
        ".custom-scrollbar",
        ".blog .blog-image .after",
        " .pal-button.active",
        ".skill-boxes ,box-border",
        ".color-pallet",
        ".timeline-items.box-border",
        ".range-slider__range"
]);

const concaveBoxShadowSelectors = formatString([
        ".skill-box .skillbar",
        ".form-group",
        ".radio-selection",
]);

function formatString(selectorsArray: string[]): string {
        return selectorsArray.join(", ");
}

export class NeuStyle extends Style {
        // Singleton Pattern
        private static _instance: NeuStyle;
        private constructor() { super() }
        public static get Instance(): NeuStyle {
                NeuStyle._instance ??= new NeuStyle();
                return NeuStyle._instance;
        }

        lightenSchemeColor: string = "#ffffff";
        darkenSchemeColor: string = "#dcdee2";

        insetBoxShadow: string = '';
        dropBoxShadow: string = '';
        concaveBoxShadow: string = '';
        thumbScrollbarBoxShadow: string = '';

        distance: number = 3;
        blur: number = 8;
        lightenIntensity: number = 7;
        darkenIntensity: number = 7;

        onEnable(): void {
                $("body").removeClass('flat-demo');
                $('.theme-skin li a').removeClass('active');
                this.setupClickEvents();
                this.setupHoverEvents();
                this.initRangeSliders();
                this.setupRangeSliderEvents();
                this.updateRadioUI();
                $(".customizer").hide();
                $("#neo-customizer").show();
                this.update();
        }

        setupHoverEvents(): void {
                $(".pill-button").off('mouseenter mouseleave').hover(
                        (event) => {
                                event.currentTarget.style.boxShadow = this.insetBoxShadow;
                        }, (event) => {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!(event.currentTarget).classList.contains('active')) event.currentTarget.style.boxShadow = '';
                        }
                );

                $(" .pallet-button").off('mouseenter mouseleave').hover(
                        (event) => {
                                event.currentTarget.style.boxShadow = this.insetBoxShadow;
                        }, (event) => {
                                event.currentTarget.style.boxShadow = 'none';
                        }
                );

                $("table>tbody>tr").off('mouseenter mouseleave').hover(
                        (event) => {
                                event.currentTarget.style.boxShadow = this.insetBoxShadow;
                        }, (event) => {
                                event.currentTarget.style.boxShadow = '';
                        }
                );

                $(" .badge-border").off('mouseenter mouseleave').hover(
                        (event) => {
                                event.currentTarget.style.boxShadow = this.insetBoxShadow;
                        }, (event) => {
                                event.currentTarget.style.boxShadow = this.dropBoxShadow;
                        }
                );
        }

        setupClickEvents(): void {
                $(".segmented-control input").off('click').on('click', (event) => {
                        $(".segmented-control label[for='" + event.currentTarget.id + "']").css('color', DynamicTheme.highlightColor);
                        $(".segmented-control input[type='radio']:not(:checked)").each(
                                (i, currentElement) => {
                                        $(".segmented-control label[for='" + currentElement.id + "']").css('color', DynamicTheme.mutedBaseColor);
                                }
                        );
                });

                $(".checkbox input").off('click').on('click', (event) => {
                        if (!$(event.currentTarget).prop("checked")) {
                                $(event.currentTarget).siblings(".name").css('color', DynamicTheme.mutedBaseColor);
                                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', this.dropBoxShadow);
                        }
                        else {
                                $(event.currentTarget).siblings(".name").css('color', DynamicTheme.highlightColor);
                                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', this.concaveBoxShadow);
                        }
                });
        }

        update(): void {
                this.lightenSchemeColor = ColorUtility.getLighten(DynamicTheme.schemeColor, this.lightenIntensity);
                this.darkenSchemeColor = ColorUtility.getDarken(DynamicTheme.schemeColor, this.darkenIntensity);
                this.dropBoxShadow = `${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
                this.insetBoxShadow = `inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
                this.concaveBoxShadow = `${this.dropBoxShadow}, ${this.insetBoxShadow}`;         // TODO: Does not look good!
                this.thumbScrollbarBoxShadow = `inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;

                $(backgroundSchemeColorSelectors).css("background-color", DynamicTheme.schemeColor);
                $(backgroundTransparentSelectors).css("background", 'transparent');
                $(colorHighlightColorSelectors).css("color", DynamicTheme.highlightColor);
                $(dropBoxShadowSelectors).css("box-shadow", this.dropBoxShadow);
                $(insetBoxShadowSelectors).css("box-shadow", this.insetBoxShadow);
                $(concaveBoxShadowSelectors).css("box-shadow", this.concaveBoxShadow);
                DynamicTheme.trackScrollbarRule.style.boxShadow = this.insetBoxShadow;
                DynamicTheme.thumbScrollbarRule.style.boxShadow = this.thumbScrollbarBoxShadow;
                DynamicTheme.trackScrollbarRule.style.background = DynamicTheme.schemeColor;
                DynamicTheme.thumbScrollbarRule.style.background = DynamicTheme.schemeColor;
        }

        updateRadioUI(): void {
                $("input[type='radio']:checked").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', DynamicTheme.highlightColor);
                        }
                );
                $("input[type='radio']:not(:checked)").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
                                // $(" label[for='" + this.id + "']").css('box-shadow', dropBoxShadow);
                        }
                );
        }

        updateCheckboxUI(): void {
                $("input[type='checkbox']:checked").each(
                        (i, currentElement) => {
                                $("label[for='" + currentElement.id + "'] i").css('color', DynamicTheme.highlightColor);
                                $("label[for='" + currentElement.id + "']").next().css('color', DynamicTheme.highlightColor);
                                $("label[for='" + currentElement.id + "']").css('box-shadow', this.concaveBoxShadow);
                        }
                );
                $("input[type='checkbox']:not(:checked)").each(
                        (i, currentElement) => {
                                $("label[for='" + currentElement.id + "'] i").css('color', DynamicTheme.mutedBaseColor);
                                $("label[for='" + currentElement.id + "']").next().css('color', DynamicTheme.mutedBaseColor);
                                $("label[for='" + currentElement.id + "']").css('box-shadow', this.dropBoxShadow);
                        }
                );
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

        setupRangeSliderEvents() {
                $("#distance, #blur, #light-intensity, #dark-intensity").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
                        console.log(newValue);
                        $(event.target.id).next('.range-slider__value').html(newValue);
                        console.log(event.target.id);
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
                        this.update();
                });
        };
}