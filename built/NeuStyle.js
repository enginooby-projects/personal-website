import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
const backgroundSchemeColorSelectors = formatString([
    ".section",
    " .button-border",
    " .box-border",
    ".image-border",
    " .contact .form-item .form-group",
    ".segmented-control",
    ".checkbox label",
    ".color-pallet",
    ".portfolio-single .modal-content",
    ".range-slider__range",
    ".pallet-border",
    ".range-slider__value",
    ".theme-skin .pill-button",
    ".pill-button.active",
    ".pill-button",
    ".neu-style .display-content>.container",
    ".neu-style .pallet-button"
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
    ".badge-border",
    "table",
    "table thead ",
    ".pallet-border",
    ".range-slider__value",
    ".theme-skin .pill-button"
]);
const insetBoxShadowSelectors = formatString([
    ".pill-button.active",
    ".custom-scrollbar",
    ".blog .blog-image .after",
    " .pal-button.active",
    ".skill-boxes ,box-border",
    ".color-pallet",
    ".timeline-items.box-border",
    ".range-slider__range",
    ".pallet-button.active",
    ".theme-skin .pill-button.active",
]);
const concaveBoxShadowSelectors = formatString([
    ".skill-box .skillbar",
    ".form-group",
    ".radio-selection",
]);
// EFFECTS
const hoverInsetBoxShadowSelectors = formatString([
    " .badge-border",
    "table>tbody>tr",
    ".pill-button",
    ".pallet-button"
]);
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}
// REFACTOR: Implement singleton pattern for base class instead/generic singleton
export class NeuStyle extends Style {
    constructor() {
        super();
        this.lightenSchemeColor = "#ffffff";
        this.darkenSchemeColor = "#dcdee2";
        this.insetBoxShadow = '';
        this.dropBoxShadow = '';
        this.concaveBoxShadow = '';
        this.thumbScrollbarBoxShadow = '';
        this.distance = 3;
        this.blur = 8;
        this.lightenIntensity = 7;
        this.darkenIntensity = 7;
        this.lastHoverClass = 'lastHover';
        this.originalProperty = '';
        this.originalPropertyValue = '';
    }
    static get Instance() {
        var _a;
        (_a = NeuStyle._instance) !== null && _a !== void 0 ? _a : (NeuStyle._instance = new NeuStyle());
        return NeuStyle._instance;
    }
    init() {
        $("body").addClass("neu-style");
        this.initRangeSliders();
    }
    removeEvents() {
        $(`${hoverInsetBoxShadowSelectors}, .segmented-control label, .range-slider__range`).off('mouseenter mouseleave');
        $('.segmented-control input, .checkbox input').off('click');
    }
    revertStyle() { }
    setupEvents() {
        this.setupRangeSliderEvents(); // does not need to remove those events whose elements  belonging to only this style
        $(".segmented-control label").on('mouseenter', function () {
            $(this).css('color', DynamicTheme.highlightColor.hex);
        });
        $(".segmented-control label").on('mouseleave', function () {
            const radioId = $(this).attr('for');
            if ($(`#${radioId}`).is(':checked'))
                return;
            $(this).css('color', '');
        });
        $(".range-slider__range ").hover((event) => {
            event.currentTarget.classList.add('focus');
        }, (event) => {
            event.currentTarget.classList.remove('focus');
        });
        $(hoverInsetBoxShadowSelectors).hover((event) => {
            const target = event.currentTarget;
            this.updateLastHoverElement(target, 'box-shadow', target.style.boxShadow);
            target.style.boxShadow = this.insetBoxShadow;
        }, (event) => {
            this.resetLastHoverElement(event.currentTarget);
        });
        $(".segmented-control input").on('click', (event) => {
            $(".segmented-control label[for='" + event.currentTarget.id + "']").css('color', DynamicTheme.highlightColor.hex);
            $(".segmented-control input[type='radio']:not(:checked)").each((i, currentElement) => {
                $(".segmented-control label[for='" + currentElement.id + "']").css('color', DynamicTheme.mutedBaseColor);
            });
        });
        $(".checkbox input").on('click', (event) => {
            if (!$(event.currentTarget).prop("checked")) {
                $(event.currentTarget).siblings(".name").css('color', DynamicTheme.mutedBaseColor);
                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', this.dropBoxShadow);
            }
            else {
                $(event.currentTarget).siblings(".name").css('color', DynamicTheme.highlightColor.hex);
                $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', this.concaveBoxShadow);
            }
        });
    }
    updateLastHoverElement(element, originalProperty, originalPropertyValue) {
        element.classList.add(this.lastHoverClass);
        this.originalProperty = originalProperty;
        this.originalPropertyValue = originalPropertyValue;
    }
    resetLastHoverElement(element) {
        element.classList.remove(this.lastHoverClass);
        if ($(element).hasClass('active'))
            return;
        $(element).css(this.originalProperty, this.originalPropertyValue);
    }
    applyStyle() {
        this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(this.lightenIntensity);
        this.darkenSchemeColor = DynamicTheme.schemeColor.getDarken(this.darkenIntensity);
        this.dropBoxShadow = `${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
        this.insetBoxShadow = `inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
        this.concaveBoxShadow = `${this.dropBoxShadow}, ${this.insetBoxShadow}`; // TODO: Does not look good!
        this.thumbScrollbarBoxShadow = `inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
        $(backgroundSchemeColorSelectors).css("background-color", DynamicTheme.schemeColor.hex);
        $(colorHighlightColorSelectors).css("color", DynamicTheme.highlightColor.hex);
        $(dropBoxShadowSelectors).css("box-shadow", this.dropBoxShadow);
        $(insetBoxShadowSelectors).css("box-shadow", this.insetBoxShadow);
        $(concaveBoxShadowSelectors).css("box-shadow", this.concaveBoxShadow);
        DynamicTheme.trackScrollbarRule.style.boxShadow = this.insetBoxShadow;
        DynamicTheme.thumbScrollbarRule.style.boxShadow = this.thumbScrollbarBoxShadow;
        DynamicTheme.trackScrollbarRule.style.background = DynamicTheme.schemeColor.hex;
        DynamicTheme.thumbScrollbarRule.style.background = DynamicTheme.schemeColor.hex;
        DynamicTheme.sliderThumbRule.style.boxShadow = this.dropBoxShadow;
        DynamicTheme.sliderThumbRule.style.backgroundColor = DynamicTheme.schemeColor.hex;
        DynamicTheme.sliderThumbFocusRule.style.boxShadow = this.concaveBoxShadow;
        DynamicTheme.sliderThumbFocusRule.style.backgroundColor = DynamicTheme.schemeColor.hex;
        // DynamicTheme.colorSwatchRule.style.boxShadow = this.dropBoxShadow;
    }
    updateRadioUI() {
        $("input[type='radio']:checked").each(function () {
            $("label[for='" + this.id + "']").css('color', DynamicTheme.highlightColor.hex);
        });
        $("input[type='radio']:not(:checked)").each(function () {
            $("label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
            // $(" label[for='" + this.id + "']").css('box-shadow', dropBoxShadow);
        });
    }
    updateCheckboxUI() {
        $("input[type='checkbox']:checked").each((i, currentElement) => {
            $("label[for='" + currentElement.id + "'] i").css('color', DynamicTheme.highlightColor.hex);
            $("label[for='" + currentElement.id + "']").next().css('color', DynamicTheme.highlightColor.hex);
            $("label[for='" + currentElement.id + "']").css('box-shadow', this.concaveBoxShadow);
        });
        $("input[type='checkbox']:not(:checked)").each((i, currentElement) => {
            $("label[for='" + currentElement.id + "'] i").css('color', DynamicTheme.mutedBaseColor);
            $("label[for='" + currentElement.id + "']").next().css('color', DynamicTheme.mutedBaseColor);
            $("label[for='" + currentElement.id + "']").css('box-shadow', this.dropBoxShadow);
        });
    }
    resetInactiveButtons(currentActiveButton) {
        $('#portfolio .pill-button').not(currentActiveButton).css('box-shadow', '');
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
            const newValue = event.target.value;
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
            //TODO: Seperate update functions
            this.applyStyle();
        });
    }
    ;
}
//  Singleton Pattern
NeuStyle._instance = new NeuStyle();
