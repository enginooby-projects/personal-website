import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';

const lightenIntensity = 5;
const darkenIntensity = 5;
// TODO: move this to CSS file
const noneBoxShadowSelectors = formatString([
        ".flat-style .image-border",
        ".flat-style .button-border",
        ".hero-03 .personal-image img",
        ".flat-style .box-border",
        ".flat-style .box-hover-border",
        ".flat-style .contact .form-item .form-group",
        ".checkbox label",//
        ".segmented-control", //
        ".radio-selection",
        ".flat-style .portfolio-filter .pill-button.active",
        ".flat-style .blog-intro",
        ".flat-style .blog .blog-image .after",
        ".flat-style .skill-box .skillbar",
        ".flat-style .pallet-border",
        ".flat-style .pallet-button",
        ".color-pallet",
        "table",
        "table thead ",
        ".theme-skin .pill-button",
        ".badge-border",
]);

const backgroundHighlightColorSelectors = formatString([
        // ".flat-style .button-border",
        ".radio-selection",
        ".flat-style .portfolio-filter .pill-button.active",
        ".pill-button",
        " .theme-skin .pill-button.active"
]);

const backgroundLightenSchemeColorSelectors = formatString([
        ".flat-style .box-border",
        ".flat-style .image-border",
        ".flat-style .contact .form-item .form-group",
        ".flat-style .segmented-control",
        ".flat-style .checkbox label",
        ".flat-style .pallet-border",
        ".color-pallet",
        ".flat-style .pallet-button"
]);

const backgroundSchemeColorSelectors = formatString([
        // ".flat-style .portfolio-filter .pill-button.active",
        // ".theme-skin .pill-button"
]);

// TODO: move this to CSS file
const backgroundTransparentSelectors = formatString([
        ".flat-style .portfolio-filter .pill-button:not(.active)",
        ".flat-style .portfolio-filter .button-border",
        ".flat-style .testimonial .owl-carousel .testimonial-image",
]);

const colorBaseColorSelectors = formatString([
        ".flat-style .portfolio-filter .pill-button ",
]);

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

        lightenSchemeColor: string = "#680317";
        darkenSchemeColor: string = "#680317";

        onEnable(): void {
                $("body").addClass('flat-style');
                $("#flat-customizer").show();
                this.setupHoverEvents();
                this.setupClickEvents();
                this.updateRadioUI();
                this.update();
        }

        onDisable(): void {
        }

        setupHoverEvents(): void {
                $(".segmented-control label").off('mouseenter').on('mouseenter', function () {
                        let id = $(this).attr("for");
                        if (!$("#" + id).prop("checked")) $(this).css('color', DynamicTheme.highlightColor.hex);
                });

                $(" .pill-button").off('mouseenter mouseleave').hover(
                        function () {
                                // TODO: variablize
                                $(this).css('background', DynamicTheme.highlightColor.getDarken(15));
                        }, function () {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(this).css('background', DynamicTheme.highlightColor.hex);
                        }
                );

                $(" .theme-skin .pill-button").off('mouseenter mouseleave').hover(
                        function () {
                                $(this).css('background', DynamicTheme.highlightColor.getDarken(15));
                        }, function () {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(this).css('background', DynamicTheme.highlightColor.hex);
                        }
                );

                $(" .pallet-button").off('mouseenter mouseleave');

                $(" .portfolio-filter .pill-button").off('mouseenter mouseleave').hover(
                        function () {
                                $(this).css('background', DynamicTheme.highlightColor.hex);
                        }, function () {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(this).css('background', '');
                        }
                );

                $("table>tbody>tr").off('mouseenter mouseleave').hover(
                        function () {
                                $(this).css('background', DynamicTheme.highlightColor.hex);
                        }, function () {
                                $(this).css('background', '');
                        }
                );

                $(" .badge-border").off('mouseenter mouseleave');
        }

        setupClickEvents(): void {
                $(".segmented-control input").off('click').click(function () {
                        $(".segmented-control label[for='" + this.id + "']").css('color', DynamicTheme.baseColor);
                        $(".segmented-control input[type='radio']:not(:checked)").each(
                                function () {
                                        $(".segmented-control label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
                                }
                        );
                });

                $(".checkbox input").off('click').click(function () {
                        if (!$(this).prop("checked")) {
                                $(this).siblings(".name").css('color', DynamicTheme.mutedBaseColor);
                        }
                        else {
                                $(this).siblings(".name").css('color', DynamicTheme.highlightColor.hex);
                        }
                });
        }

        update(): void {
                this.updateColor();
                $(noneBoxShadowSelectors).css('box-shadow', 'none');
                DynamicTheme.trackScrollbarRule.style.background = this.lightenSchemeColor;
                DynamicTheme.thumbScrollbarRule.style.background = this.darkenSchemeColor;
                DynamicTheme.sliderThumbRule.style.boxShadow = 'none';
                DynamicTheme.sliderThumbFocusRule.style.boxShadow = 'none';
        }

        //TODO: Separate update functions for highlight, scheme, colorfull elements
        public updateColor() {
                this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(lightenIntensity);
                this.darkenSchemeColor = DynamicTheme.schemeColor.getDarken(darkenIntensity);
                $(backgroundLightenSchemeColorSelectors).css('background-color', this.lightenSchemeColor);
                $(backgroundSchemeColorSelectors).css('background-color', DynamicTheme.schemeColor.hex);
                $(backgroundHighlightColorSelectors).css('background-color', DynamicTheme.highlightColor.hex);
                $(backgroundTransparentSelectors).css('background', 'transparent');
                $(".flat-style :not(.portfolio-filter) .pill-button").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
                $("#flat-skin-button .pill-button").css('background-color', DynamicTheme.highlightColor.getDarken(15));
                $(colorBaseColorSelectors).css('color', DynamicTheme.baseColor);
        }

        updateRadioUI(): void {
                $("input[type='radio']:checked").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
                        }
                );
                $("input[type='radio']:not(:checked)").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
                        }
                );
        }

        updateCheckboxUI(): void {
                $("input[type='checkbox']:checked").each(
                        function () {
                                $("label[for='" + this.id + "'] i").css('color', DynamicTheme.highlightColor.hex);
                                $("label[for='" + this.id + "']").next().css('color', DynamicTheme.highlightColor.hex);
                        }
                );
                $("input[type='checkbox']:not(:checked)").each(
                        function () {
                                $("label[for='" + this.id + "'] i").css('color', DynamicTheme.mutedBaseColor);
                                $("label[for='" + this.id + "']").next().css('color', DynamicTheme.mutedBaseColor);
                        }
                );
        }
        resetUncheckedButtons(currentCheckedButton: HTMLElement): void {
                $('#portfolio .pill-button').not(currentCheckedButton).css('background', 'transparent');
        }
}