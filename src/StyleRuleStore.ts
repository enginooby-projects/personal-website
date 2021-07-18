/* Reponsibility: lazily initialize style rules */

export class StyleRuleStore {
        // Lazy Singleton
        private static _instance: StyleRuleStore;
        private constructor() {
                this.styleSheet = this.getStyleSheet();
                this.cssRules = this.styleSheet.cssRules || this.styleSheet.rules;
        }
        public static get Instance(): StyleRuleStore {
                StyleRuleStore._instance ??= new StyleRuleStore();
                return StyleRuleStore._instance;
        }

        private styleSheet?: CSSStyleSheet;
        private cssRules?: CSSRuleList;

        // Pseudo rules
        private trackScrollbarRule?: CSSStyleRule;
        private thumbScrollbarRule?: CSSStyleRule;
        private sliderThumbRule?: CSSStyleRule;
        private sliderThumbHoverRule?: CSSStyleRule;
        private sliderTrackFocusRule?: CSSStyleRule;
        private colorSwatchRule?: CSSStyleRule;
        private selectionRule?: CSSStyleRule;
        private selectionOldFirefoxRule?: CSSStyleRule;
        // Stateful rules (hover, active, focus...)
        private buttonActiveRule?: CSSStyleRule;
        private buttonInactiveRule?: CSSStyleRule;
        private radioLabelHoverRule?: CSSStyleRule;
        private radioLabelCheckedRule?: CSSStyleRule;
        private radioLabelUncheckedRule?: CSSStyleRule;
        private checkboxLabelCheckedRule?: CSSStyleRule;
        private checkboxLabelHoverRule?: CSSStyleRule;
        private checkboxNameCheckedRule?: CSSStyleRule;
        private checkboxIconCheckedRule?: CSSStyleRule;
        private checkboxNameUncheckedRule?: CSSStyleRule;
        private checkboxIconUncheckedRule?: CSSStyleRule;
        private pagePillingSpanActiveRule?: CSSStyleRule;
        private pagePillingSpanInactiveRule?: CSSStyleRule;
        private papePillingTooltipRule?: CSSStyleRule;

        private insetBoxShadowRule?: CSSStyleRule;


        // CONSIDER: Create new style then append to head
        private getStyleSheet(): CSSStyleSheet {
                for (let i = 0; i < document.styleSheets.length; i++) {
                        let cursheet = document.styleSheets[i];
                        if (cursheet.title == 'style') return cursheet;
                }
                throw new Error('Failed to retrieve style sheet with title "style"!');
        }

        private insertEmptyRule = (selector: string): CSSStyleRule => this.cssRules![this.styleSheet!.insertRule(`${selector} {}`)] as CSSStyleRule;

        getTrackScrollbarRule = (): CSSStyleRule => this.trackScrollbarRule ?? (this.trackScrollbarRule = this.insertEmptyRule('::-webkit-scrollbar-track'));
        getThumbScrollbarRule = (): CSSStyleRule => this.thumbScrollbarRule ?? (this.thumbScrollbarRule = this.insertEmptyRule('::-webkit-scrollbar-thumb'));
        getSliderThumbRule = (): CSSStyleRule => this.sliderThumbRule ?? (this.sliderThumbRule = this.insertEmptyRule('::-webkit-slider-thumb'));
        getSliderThumbHoverRule = (): CSSStyleRule => this.sliderThumbHoverRule ?? (this.sliderThumbHoverRule = this.insertEmptyRule('::-webkit-slider-thumb:hover'));
        getSliderTrackFocusRule = (): CSSStyleRule => this.sliderTrackFocusRule ?? (this.sliderTrackFocusRule = this.insertEmptyRule('input[type=range]:focus'));
        getColorSwatchRule = (): CSSStyleRule => this.colorSwatchRule ?? (this.colorSwatchRule = this.insertEmptyRule('::-webkit-color-swatch'));
        getRadioLabelHoverRule = (): CSSStyleRule => this.radioLabelHoverRule ?? (this.radioLabelHoverRule = this.insertEmptyRule('.segmented-control>input:hover+label'));
        getRadioLabelCheckedRule = (): CSSStyleRule => this.radioLabelCheckedRule ?? (this.radioLabelCheckedRule = this.insertEmptyRule('.segmented-control>input:checked+label'));
        getRadioLabelUncheckedRule = (): CSSStyleRule => this.radioLabelUncheckedRule ?? (this.radioLabelUncheckedRule = this.insertEmptyRule('.segmented-control>input:not(:checked):not(:hover)+label'));
        getCheckboxLabelCheckedRule = (): CSSStyleRule => this.checkboxLabelCheckedRule ?? (this.checkboxLabelCheckedRule = this.insertEmptyRule('.checkbox input:checked~label'));
        getCheckboxLabelHoverRule = (): CSSStyleRule => this.checkboxLabelHoverRule ?? (this.checkboxLabelHoverRule = this.insertEmptyRule('.checkbox input:hover~label i'));
        getCheckboxNameCheckedRule = (): CSSStyleRule => this.checkboxNameCheckedRule ?? (this.checkboxNameCheckedRule = this.insertEmptyRule('.checkbox input:checked~label+.name'));
        getCheckboxIconCheckedRule = (): CSSStyleRule => this.checkboxIconCheckedRule ?? (this.checkboxIconCheckedRule = this.insertEmptyRule('.checkbox input:checked~label i'));
        getCheckboxNameUncheckedRule = (): CSSStyleRule => this.checkboxNameUncheckedRule ?? (this.checkboxNameUncheckedRule = this.insertEmptyRule('.checkbox input:not(:checked)~label+.name'));
        getCheckboxIconUncheckedRule = (): CSSStyleRule => this.checkboxIconUncheckedRule ?? (this.checkboxIconUncheckedRule = this.insertEmptyRule('.checkbox input:not(:checked):not(:hover)~label i'));
        getPagePillingTooltipRule = (): CSSStyleRule => this.papePillingTooltipRule ?? (this.papePillingTooltipRule = this.insertEmptyRule('#pp-nav li .pp-tooltip'));
        getPagePillingSpanActiveRule = (): CSSStyleRule => this.pagePillingSpanActiveRule ?? (this.pagePillingSpanActiveRule = this.insertEmptyRule('#pp-nav li .active span'));
        getPagePillingSpanInactiveRule = (): CSSStyleRule => this.pagePillingSpanInactiveRule ?? (this.pagePillingSpanInactiveRule = this.insertEmptyRule('#pp-nav li :not(.active) span'));
}