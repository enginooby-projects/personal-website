import { Color } from './Color.js';
import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
import { StyleRuleStore } from './StyleRuleStore.js';
import { TinyColor } from './TinyColor.js';


const backgroundGlassHighlightColorSelectors = formatString([
        ".pill-button:not(.pill-button.active)",
        " .contact .form-item .form-group",
        ".checkbox label",
        ".radio-selection",
        ".segmented-control",
]);

const backgroundGlassSchemeColorSelectors = formatString([
        // ".section",
        ".display-content>.container",
        ".color-switcher .color-pallet.show",
        ".color-switcher .color-pallet",
        ".pallet-button",
        ".skillbar",
        ".modal-content"
]);

const backgroundGlassLightenSchemeColorSelectors = formatString([
        ".box-border",
        "#self-education .image-border",
        ".contact .form-item .form-group",
        ".checkbox label",
        ".segmented-control",
        ".range-slider__range", // TODO: max-3
        ".range-slider__value", // TODO: max-3
        // ".pallet-border",
]);

const backgroundGlassActiveButtonSelectors = formatString([
        ".pill-button.active"
]);

const backgroundGlassColorfull1Selectors = formatString([
        ".background-colorfull1:not(#self-education .background-colorfull1)",
]);

const backgroundGlassColorfull2Selectors = formatString([
        ".background-colorfull2:not(#self-education .background-colorfull2)",
]);

const backgroundGlassColorfull3Selectors = formatString([
        ".background-colorfull3:not(#self-education .background-colorfull3)",
]);

const borderSizeBlurDependentSelectors = `${backgroundGlassHighlightColorSelectors}, ${backgroundGlassSchemeColorSelectors}, ${backgroundGlassLightenSchemeColorSelectors}, ${backgroundGlassColorfull1Selectors}, ${backgroundGlassColorfull2Selectors}, ${backgroundGlassColorfull3Selectors}, ${backgroundGlassActiveButtonSelectors}`;

function formatString(selectorsArray: string[]): string {
        return selectorsArray.join(", ");
}

export class GlassStyle extends Style {
        // Singleton Pattern
        private static _instance: GlassStyle;
        private constructor() { super() }
        public static get Instance(): GlassStyle {
                GlassStyle._instance ??= new GlassStyle();
                return GlassStyle._instance;
        }

        blur = '2';
        transparency = '0.6';
        borderSize = '1';
        lightenIntensity = 15;
        lightenSchemeColor: Color = new TinyColor('#000000');
        darkenSchemeColor: string = "#680317";

        init() {
                $("body").addClass('glass-style');
                this.initRangeSliders();
                $('section').each((index, element) => {
                        element.classList.add('background-2');
                })
                console.log('<<<<<<<<<<<')
                console.log(backgroundGlassLightenSchemeColorSelectors)
                // this.lightenSchemeColor.setHex(DynamicTheme.schemeColor.getLighten(this.lightenIntensity));
                // console.log(this.lightenSchemeColor.hex);
        }

        revertStyle() {
                $(backgroundGlassSchemeColorSelectors).css('background-color', DynamicTheme.schemeColor.hex);
                $(backgroundGlassHighlightColorSelectors).css('background-color', DynamicTheme.highlightColor.hex);
                $(backgroundGlassColorfull1Selectors).css('background-color', DynamicTheme.colorfull1.hex);
                $(backgroundGlassColorfull2Selectors).css('background-color', DynamicTheme.colorfull2.hex);
                $(backgroundGlassColorfull3Selectors).css('background-color', DynamicTheme.colorfull3.hex);
                $(borderSizeBlurDependentSelectors).css({
                        'border': `none`, // alternative: use CSS file
                });
        }

        setupCustomizeEvents(): void {
                $("#glass-transparency, #glass-blur, #glass-border-size").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
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
        }

        setupLocalEvents(): void {
                // lazily setup
                if (this.localEventsAreSetup) return;
                this.localEventsAreSetup = true;

                $('.background-item').on('click', (event) => {
                        const background: string = event.currentTarget.id;
                        $('section').each((index, element) => {
                                this.removeClassesByPrefix(element, 'background');
                                element.classList.add(background);
                        })
                });

                $(".pill-button ").hover(
                        (event) => {
                                // TODO: variablize
                                $(event.currentTarget).css({
                                        'background-color': `rgba(255, 255, 255, ${this.transparency})`,
                                        'color': DynamicTheme.highlightColor.hex
                                });
                        }, (event) => {
                                if ($(event.currentTarget).hasClass('active')) return;
                                $(event.currentTarget).css({
                                        'background-color': `rgba(${DynamicTheme.highlightColor.rValue}, ${DynamicTheme.highlightColor.gValue}, ${DynamicTheme.highlightColor.bValue}, ${this.transparency})`,
                                        'color': DynamicTheme.highlightColor.getInvertBlackWhite()
                                });
                        }
                );

                $("table>tbody>tr").hover(
                        (event) => {
                                event.currentTarget.style.backgroundColor = this.formatRgba(DynamicTheme.highlightColor);
                                event.currentTarget.style.color = DynamicTheme.highlightColor.getInvertBlackWhite();
                        }, function () {
                                $(this).css('background', '').css('color', '');
                        }
                );
        }

        removeLocalEvents() {
                $('.pill-button, table>tbody>tr').off('mouseenter mouseleave');
        }

        //HELPER
        removeClassesByPrefix(element: HTMLElement, prefix: string) {
                for (let i = element.classList.length - 1; i >= 0; i--) {
                        const className = element.classList[i];
                        if (className.startsWith(prefix)) {
                                element.classList.remove(className);
                        }
                }
        }

        initRangeSliders() {
                $('#glass-transparency').attr('value', this.transparency);
                $("#glass-transparency").next('.range-slider__value').html(this.transparency.toString());
                $('#glass-blur').attr('value', this.blur);
                $("#glass-blur").next('.range-slider__value').html(this.blur.toString());
                $('#glass-border-size').attr('value', this.borderSize);
                $("#glass-border-size").next('.range-slider__value').html(this.borderSize.toString());
        }

        updateBlur() {
                $(borderSizeBlurDependentSelectors).css({
                        'backdrop-filter': `blur(${this.blur}px)`,
                        '-webkit-backdrop-filter': `blur(${this.blur}px)`,
                });
        }

        updateBorderSize() {
                $(borderSizeBlurDependentSelectors).css({
                        'border': `${this.borderSize}px solid rgba(209, 213, 219, 0.3)`,
                });
        }

        updateTransparency() {
                this.updateTransparencySchemeColor();
                this.updateTransparencyHighlightColor();
                $(backgroundGlassColorfull1Selectors).css('background-color', this.formatRgba(DynamicTheme.colorfull1));
                $(backgroundGlassColorfull2Selectors).css('background-color', this.formatRgba(DynamicTheme.colorfull2));
                $(backgroundGlassColorfull3Selectors).css('background-color', this.formatRgba(DynamicTheme.colorfull3));
        }

        private updateTransparencyHighlightColor() {
                $(backgroundGlassActiveButtonSelectors).css({
                        'background-color': `rgba(255, 255, 255, ${this.transparency})`,
                        'color': DynamicTheme.highlightColor.hex
                });
                StyleRuleStore.Instance.getThumbScrollbarRule().style.backgroundColor = this.formatRgba(DynamicTheme.highlightColor);
                StyleRuleStore.Instance.getSliderThumbRule().style.backgroundColor = this.formatRgba(DynamicTheme.highlightColor); //TODO: set min
                $(backgroundGlassHighlightColorSelectors).css('background-color', this.formatRgba(DynamicTheme.highlightColor));
                this.setupLocalEvents();
        }

        private updateTransparencySchemeColor() {
                $(backgroundGlassSchemeColorSelectors).css('background-color', this.formatRgba(DynamicTheme.schemeColor));
                $(backgroundGlassLightenSchemeColorSelectors).css('background-color', this.formatRgba(this.lightenSchemeColor));
                StyleRuleStore.Instance.getTrackScrollbarRule().style.backgroundColor = this.formatRgba(DynamicTheme.schemeColor);
        }

        formatRgba(color: Color) {
                return `rgba(${color.rValue}, ${color.gValue}, ${color.bValue}, ${this.transparency})`;
        }

        onHighlightColorUpdated(): void {
                this.updateTransparencyHighlightColor();
                $(":not(.portfolio-filter) .pill-button:not(.active)").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
        }

        onSchemeColorUpdated(): void {
                this.lightenSchemeColor.setHex(DynamicTheme.schemeColor.getLighten(this.lightenIntensity));
                this.updateTransparencySchemeColor();
        }

        onBaseColorUpdated(): void {
        }

        resetInactiveButtons(currentActiveButton: HTMLElement): void {
                $('#portfolio .pill-button').not(currentActiveButton).css({
                        'background-color': this.formatRgba(DynamicTheme.highlightColor),
                        'color': DynamicTheme.highlightColor.getInvertBlackWhite()
                });
        }
}