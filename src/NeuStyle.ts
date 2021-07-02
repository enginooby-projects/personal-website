import * as ColorModule from './DynamicTheme.js';
import { Style } from './Style.js';

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
        lightenSchemeColor: string = "#ffffff";
        darkenSchemeColor: string = "#dcdee2";
        insetBoxShadow: string = '';
        dropBoxShadow: string = '';
        concaveBoxShadow: string = '';
        thumbScrollbarBoxShadow: string = '';
        neuDistance: string = '3px';
        neuBlur: string = '8px';
        neuLightIntensity: number = 7;
        neuDarkIntensity: number = 7;


        onEnable(): void {
                $("body").removeClass('flat-demo');
                $('.theme-skin li a').removeClass('active');
                this.setupClickEvents();
                this.setupHoverEvents();
                this.initRangeSliders();
                // this.setupRangeSliderEvents();
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
                        $(".segmented-control label[for='" + event.currentTarget.id + "']").css('color', ColorModule.highlightColor);
                        $(".segmented-control input[type='radio']:not(:checked)").each(
                                function () {
                                        $(".segmented-control label[for='" + event.currentTarget.id + "']").css('color', ColorModule.mutedBaseColor);
                                }
                        );
                });

                $(".checkbox input").off('click').on('click', (event) => {
                        if (!$(event.currentTarget).prop("checked")) {
                                $(event.currentTarget).siblings(".name").css('color', ColorModule.mutedBaseColor);
                                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', this.dropBoxShadow);
                        }
                        else {
                                $(event.currentTarget).siblings(".name").css('color', ColorModule.highlightColor);
                                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', this.concaveBoxShadow);
                        }
                });
        }

        update(): void {
                this.lightenSchemeColor = tinycolor(ColorModule.schemeColor).lighten(this.neuLightIntensity).toString();
                this.darkenSchemeColor = tinycolor(ColorModule.schemeColor).darken(this.neuDarkIntensity).toString();
                this.dropBoxShadow = `${this.neuDistance} ${this.neuDistance} ${this.neuBlur} ${this.darkenSchemeColor}, -${this.neuDistance} -${this.neuDistance} ${this.neuBlur} ${this.lightenSchemeColor}`;
                this.insetBoxShadow = `inset ${this.neuDistance} ${this.neuDistance} ${this.neuBlur} ${this.darkenSchemeColor}, inset -${this.neuDistance} -${this.neuDistance} ${this.neuBlur} ${this.lightenSchemeColor}`;
                this.concaveBoxShadow = `${this.dropBoxShadow}, ${this.insetBoxShadow}`;         // TODO: Does not look good!
                this.thumbScrollbarBoxShadow = `inset -${this.neuDistance} -${this.neuDistance} ${this.neuBlur} ${this.darkenSchemeColor}, inset ${this.neuDistance} ${this.neuDistance} ${this.neuBlur} ${this.lightenSchemeColor}`;

                $(backgroundSchemeColorSelectors).css("background-color", ColorModule.schemeColor);
                $(backgroundTransparentSelectors).css("background", 'transparent');
                $(colorHighlightColorSelectors).css("color", ColorModule.highlightColor);
                $(dropBoxShadowSelectors).css("box-shadow", this.dropBoxShadow);
                $(insetBoxShadowSelectors).css("box-shadow", this.insetBoxShadow);
                $(concaveBoxShadowSelectors).css("box-shadow", this.concaveBoxShadow);
                ColorModule.trackScrollbarRule.style.boxShadow = this.insetBoxShadow;
                ColorModule.thumbScrollbarRule.style.boxShadow = this.thumbScrollbarBoxShadow;
                ColorModule.trackScrollbarRule.style.background = ColorModule.schemeColor;
                ColorModule.thumbScrollbarRule.style.background = ColorModule.schemeColor;
        }

        updateRadioUI(): void {
                $("input[type='radio']:checked").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', ColorModule.highlightColor);
                        }
                );
                $("input[type='radio']:not(:checked)").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
                                // $(" label[for='" + this.id + "']").css('box-shadow', dropBoxShadow);
                        }
                );
        }

        updateCheckboxUI(): void {
                $("input[type='checkbox']:checked").each(
                        (i, currentElement) => {
                                $("label[for='" + currentElement.id + "'] i").css('color', ColorModule.highlightColor);
                                $("label[for='" + currentElement.id + "']").next().css('color', ColorModule.highlightColor);
                                $("label[for='" + currentElement.id + "']").css('box-shadow', this.concaveBoxShadow);
                        }
                );
                $("input[type='checkbox']:not(:checked)").each(
                        (i, currentElement) => {
                                $("label[for='" + currentElement.id + "'] i").css('color', ColorModule.mutedBaseColor);
                                $("label[for='" + currentElement.id + "']").next().css('color', ColorModule.mutedBaseColor);
                                $("label[for='" + currentElement.id + "']").css('box-shadow', this.dropBoxShadow);
                        }
                );
        }

        initRangeSliders() {
                $('#distance').attr('value', this.neuDistance.replace('px', ''));
                $("#distance").next('.range-slider__value').html(this.neuDistance.replace('px', ''));
                $('#blur').attr('value', this.neuBlur.replace('px', ''));
                $("#blur").next('.range-slider__value').html(this.neuBlur.replace('px', ''));
                $('#light-intensity').attr('value', this.neuLightIntensity);
                $("#light-intensity").next('.range-slider__value').html(this.neuLightIntensity.toString());
                $('#dark-intensity').attr('value', this.neuDarkIntensity);
                $("#dark-intensity").next('.range-slider__value').html(this.neuDarkIntensity.toString());
        }

        setupRangeSliderEvents() {
                $("#distance").on('input', (event) => {
                        $(this).next('.range-slider__value').html(this.value);
                        this.neuDistance = this.value + "px";
                        this.update();
                });

                $("#blur").on('input', (event) => {
                        $(this).next('.range-slider__value').html(this.value);
                        this.neuBlur = this.value + "px";
                        this.update();
                });

                $("#light-intensity").on('input', (event) => {
                        $(this).next('.range-slider__value').html(this.value);
                        this.neuLightIntensity = this.value;
                        this.update();
                });

                $("#dark-intensity").on('input', (event) => {
                        $(this).next('.range-slider__value').html(this.value);
                        this.neuDarkIntensity = this.value;
                        this.update();
                });
        };
}