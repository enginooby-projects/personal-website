import { Color } from './Color.js';
import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
import { TinyColor } from './TinyColor.js';

const lightenIntensity = 15;
const darkenIntensity = 10;

const backgroundGlassHighlightColorSelectors = formatString([
        ".glass-style .pill-button",
        " .contact .form-item .form-group",
        ".pill-button.active",
        ".segmented-control",
        ".checkbox label",
        ".glass-style .radio-selection"
]);

const backgroundGlassSchemeColorSelectors = formatString([
        // ".glass-style .section",
        ".glass-style .display-content>.container",
        ".glass-style .color-switcher .color-pallet.show",
        ".glass-style .color-switcher .color-pallet",
        ".glass-style .pallet-button",
        ".glass-style .skillbar"
]);

const backgroundGlassLightenSchemeColorSelectors = formatString([
        ".glass-style .box-border",
        ".glass-style #self-education .image-border",
        ".glass-style .contact .form-item .form-group",
        ".glass-style .segmented-control",
        ".glass-style .checkbox label",
        // ".glass-style .pallet-border",
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

const borderSizeBlurDependentSelectors = `${backgroundGlassHighlightColorSelectors}, ${backgroundGlassSchemeColorSelectors}, ${backgroundGlassLightenSchemeColorSelectors}, ${backgroundGlassColorfull1Selectors}, ${backgroundGlassColorfull2Selectors}, ${backgroundGlassColorfull3Selectors}`;

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

        blur = '3.5';
        transparency = '0.6';
        borderSize = '1';
        lightenSchemeColor: Color = new TinyColor('#000000');
        darkenSchemeColor: string = "#680317";

        onEnable(): void {
                $("body").addClass('glass-style');
                $("#glass-customizer").show();
                this.setupHoverEvents();
                this.setupClickEvents();
                this.updateRadioUI();
                this.initRangeSliders();
                this.setupRangeSliderEvents();
                this.update();
        }

        onDisable(): void {
                $(backgroundGlassColorfull1Selectors).css('background-color', DynamicTheme.colorfull1.hex);
                $(backgroundGlassColorfull2Selectors).css('background-color', DynamicTheme.colorfull2.hex);
                $(backgroundGlassColorfull3Selectors).css('background-color', DynamicTheme.colorfull3.hex);
                $(borderSizeBlurDependentSelectors).css({
                        'border': `none`, // alternative: use CSS file
                });
        }

        updateLightenSchemeColor() {
                this.lightenSchemeColor.setHex(DynamicTheme.schemeColor.getLighten(lightenIntensity));
        }

        initRangeSliders() {
                $('#glass-transparency').attr('value', this.transparency);
                $("#glass-transparency").next('.range-slider__value').html(this.transparency.toString());
                $('#glass-blur').attr('value', this.blur);
                $("#glass-blur").next('.range-slider__value').html(this.blur.toString());
                $('#glass-border-size').attr('value', this.borderSize);
                $("#glass-border-size").next('.range-slider__value').html(this.borderSize.toString());
        }

        setupRangeSliderEvents() {
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

        updateTransparency() {
                $(backgroundGlassHighlightColorSelectors).css('background-color', `rgba(${DynamicTheme.highlightColor.rValue}, ${DynamicTheme.highlightColor.gValue}, ${DynamicTheme.highlightColor.bValue}, ${this.transparency})`);
                $(backgroundGlassSchemeColorSelectors).css('background-color', `rgba(${DynamicTheme.schemeColor.rValue}, ${DynamicTheme.schemeColor.gValue}, ${DynamicTheme.schemeColor.bValue}, ${this.transparency})`);
                $(backgroundGlassLightenSchemeColorSelectors).css('background-color', `rgba(${this.lightenSchemeColor.rValue}, ${this.lightenSchemeColor.gValue}, ${this.lightenSchemeColor.bValue}, ${this.transparency})`);
                $(backgroundGlassColorfull1Selectors).css('background-color', `rgba(${DynamicTheme.colorfull1.rValue}, ${DynamicTheme.colorfull1.gValue}, ${DynamicTheme.colorfull1.bValue}, ${this.transparency})`);
                $(backgroundGlassColorfull2Selectors).css('background-color', `rgba(${DynamicTheme.colorfull2.rValue}, ${DynamicTheme.colorfull2.gValue}, ${DynamicTheme.colorfull2.bValue}, ${this.transparency})`);
                $(backgroundGlassColorfull3Selectors).css('background-color', `rgba(${DynamicTheme.colorfull3.rValue}, ${DynamicTheme.colorfull3.gValue}, ${DynamicTheme.colorfull3.bValue}, ${this.transparency})`);
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

        setupHoverEvents(): void {
                $(".glass-style .pill-button ").off('mouseenter mouseleave').hover(
                        (event) => {
                                // TODO: variablize
                                $(event.currentTarget).css({
                                        'background-color': `rgba(255, 255, 255, ${this.transparency})`,
                                        'color': DynamicTheme.highlightColor.hex
                                });
                        }, (event) => {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(event.currentTarget).css({
                                        'background-color': `rgba(${DynamicTheme.highlightColor.rValue}, ${DynamicTheme.highlightColor.gValue}, ${DynamicTheme.highlightColor.bValue}, ${this.transparency})`,
                                        'color': DynamicTheme.highlightColor.getInvertBlackWhite()
                                });
                        }
                );
        }

        setupClickEvents(): void {

        }

        update(): void {
                this.updateLightenSchemeColor();
                this.updateTransparency();
                this.updateBlur();
                this.updateBorderSize();
                $(".glass-style :not(.portfolio-filter) .pill-button").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
                DynamicTheme.sliderThumbRule.style.boxShadow = 'none';
                DynamicTheme.sliderThumbFocusRule.style.boxShadow = 'none';
        }

        updateRadioUI(): void {

        }

        updateCheckboxUI(): void {
        }

        resetUncheckedButtons(currentCheckedButton: HTMLElement): void {
        }
}