/* Reponsibility: lazily initialize style rules */
export class StyleRuleStore {
    constructor() {
        this.insertEmptyRule = (selector) => this.cssRules[this.styleSheet.insertRule(`${selector} {}`)];
        this.getButtonActiveRule = () => { var _a; return (_a = this.buttonActiveRule) !== null && _a !== void 0 ? _a : (this.buttonActiveRule = this.insertEmptyRule('.pill-button.active, .pallet-button.active, .pill-button:hover')); };
        this.getButtonInactiveRule = () => { var _a; return (_a = this.buttonInactiveRule) !== null && _a !== void 0 ? _a : (this.buttonInactiveRule = this.insertEmptyRule('.pill-button:not(.active), .pallet-button:not(.active)')); };
        this.getTrackScrollbarRule = () => { var _a; return (_a = this.trackScrollbarRule) !== null && _a !== void 0 ? _a : (this.trackScrollbarRule = this.insertEmptyRule('::-webkit-scrollbar-track')); };
        this.getThumbScrollbarRule = () => { var _a; return (_a = this.thumbScrollbarRule) !== null && _a !== void 0 ? _a : (this.thumbScrollbarRule = this.insertEmptyRule('::-webkit-scrollbar-thumb')); };
        this.getPlaceholderRule = () => { var _a; return (_a = this.placeholderRule) !== null && _a !== void 0 ? _a : (this.placeholderRule = this.insertEmptyRule('::placeholder')); };
        this.getSliderThumbRule = () => { var _a; return (_a = this.sliderThumbRule) !== null && _a !== void 0 ? _a : (this.sliderThumbRule = this.insertEmptyRule('::-webkit-slider-thumb')); };
        this.getSliderThumbHoverRule = () => { var _a; return (_a = this.sliderThumbHoverRule) !== null && _a !== void 0 ? _a : (this.sliderThumbHoverRule = this.insertEmptyRule('::-webkit-slider-thumb:hover')); };
        this.getSliderTrackFocusRule = () => { var _a; return (_a = this.sliderTrackFocusRule) !== null && _a !== void 0 ? _a : (this.sliderTrackFocusRule = this.insertEmptyRule('input[type=range]:focus')); };
        this.getColorSwatchRule = () => { var _a; return (_a = this.colorSwatchRule) !== null && _a !== void 0 ? _a : (this.colorSwatchRule = this.insertEmptyRule('::-webkit-color-swatch')); };
        this.getRadioLabelHoverRule = () => { var _a; return (_a = this.radioLabelHoverRule) !== null && _a !== void 0 ? _a : (this.radioLabelHoverRule = this.insertEmptyRule('.segmented-control>input:hover+label')); };
        this.getRadioLabelCheckedRule = () => { var _a; return (_a = this.radioLabelCheckedRule) !== null && _a !== void 0 ? _a : (this.radioLabelCheckedRule = this.insertEmptyRule('.segmented-control>input:checked+label')); };
        this.getRadioLabelUncheckedRule = () => { var _a; return (_a = this.radioLabelUncheckedRule) !== null && _a !== void 0 ? _a : (this.radioLabelUncheckedRule = this.insertEmptyRule('.segmented-control>input:not(:checked):not(:hover)+label')); };
        this.getCheckboxLabelCheckedRule = () => { var _a; return (_a = this.checkboxLabelCheckedRule) !== null && _a !== void 0 ? _a : (this.checkboxLabelCheckedRule = this.insertEmptyRule('.checkbox input:checked~label')); };
        this.getCheckboxLabelHoverRule = () => { var _a; return (_a = this.checkboxLabelHoverRule) !== null && _a !== void 0 ? _a : (this.checkboxLabelHoverRule = this.insertEmptyRule('.checkbox input:hover~label i')); };
        this.getCheckboxNameCheckedRule = () => { var _a; return (_a = this.checkboxNameCheckedRule) !== null && _a !== void 0 ? _a : (this.checkboxNameCheckedRule = this.insertEmptyRule('.checkbox input:checked~label+.name')); };
        this.getCheckboxIconCheckedRule = () => { var _a; return (_a = this.checkboxIconCheckedRule) !== null && _a !== void 0 ? _a : (this.checkboxIconCheckedRule = this.insertEmptyRule('.checkbox input:checked~label i')); };
        this.getCheckboxNameUncheckedRule = () => { var _a; return (_a = this.checkboxNameUncheckedRule) !== null && _a !== void 0 ? _a : (this.checkboxNameUncheckedRule = this.insertEmptyRule('.checkbox input:not(:checked)~label+.name')); };
        this.getCheckboxIconUncheckedRule = () => { var _a; return (_a = this.checkboxIconUncheckedRule) !== null && _a !== void 0 ? _a : (this.checkboxIconUncheckedRule = this.insertEmptyRule('.checkbox input:not(:checked):not(:hover)~label i')); };
        this.getPagePillingTooltipRule = () => { var _a; return (_a = this.papePillingTooltipRule) !== null && _a !== void 0 ? _a : (this.papePillingTooltipRule = this.insertEmptyRule('#pp-nav li .pp-tooltip')); };
        this.getPagePillingSpanActiveRule = () => { var _a; return (_a = this.pagePillingSpanActiveRule) !== null && _a !== void 0 ? _a : (this.pagePillingSpanActiveRule = this.insertEmptyRule('#pp-nav li .active span')); };
        this.getPagePillingSpanInactiveRule = () => { var _a; return (_a = this.pagePillingSpanInactiveRule) !== null && _a !== void 0 ? _a : (this.pagePillingSpanInactiveRule = this.insertEmptyRule('#pp-nav li :not(.active) span')); };
        this.styleSheet = this.getStyleSheet();
        this.cssRules = this.styleSheet.cssRules || this.styleSheet.rules;
    }
    static get Instance() {
        var _a;
        (_a = StyleRuleStore._instance) !== null && _a !== void 0 ? _a : (StyleRuleStore._instance = new StyleRuleStore());
        return StyleRuleStore._instance;
    }
    getStyleSheet() {
        for (let i = 0; i < document.styleSheets.length; i++) {
            let cursheet = document.styleSheets[i];
            if (cursheet.title == 'style')
                return cursheet;
        }
        throw new Error('Failed to retrieve style sheet with title "style"!');
    }
}
