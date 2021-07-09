import ColorUtility from './ColorUtility.js'
import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';

const lightenIntensity = 5;
const darkenIntensity = 5;
const noneBoxShadowSelectors = formatString([
        ".flat-demo .image-border",
        ".flat-demo .button-border",
        ".hero-03 .personal-image img",
        ".flat-demo .box-border",
        ".flat-demo .box-hover-border",
        ".flat-demo .contact .form-item .form-group",
        ".checkbox label",//
        ".segmented-control", //
        ".radio-selection",
        ".flat-demo .portfolio-filter .pill-button.active",
        ".flat-demo .blog-intro",
        ".flat-demo .blog .blog-image .after",
        ".flat-demo .skill-box .skillbar",
        ".flat-demo .pallet-border",
        ".flat-demo .pallet-button",
        ".color-pallet",
        "table",
        "table thead ",
        ".theme-skin .pill-button",
        ".badge-border",
]);

const backgroundHighlightColorSelectors = formatString([
        // ".flat-demo .button-border",
        ".radio-selection",
        ".flat-demo .portfolio-filter .pill-button.active",
        ".pill-button",
        " .theme-skin .pill-button.active"
]);

const backgroundLightenSchemeColorSelectors = formatString([
        ".flat-demo .box-border",
        ".flat-demo .image-border",
        ".flat-demo .contact .form-item .form-group",
        ".flat-demo .segmented-control",
        ".flat-demo .checkbox label",
        ".flat-demo .pallet-border",
        ".color-pallet",
]);

const backgroundSchemeColorSelectors = formatString([
        // ".flat-demo .portfolio-filter .pill-button.active",
        // ".theme-skin .pill-button"
]);

const colorBaseColorSelectors = formatString([
        ".flat-demo .portfolio-filter .pill-button ",
]);

const backgroundTransparentSelectors = formatString([
        ".flat-demo .portfolio-filter .pill-button:not(.active)",
        ".flat-demo .portfolio-filter .button-border",
        ".flat-demo .testimonial .owl-carousel .testimonial-image",
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
                $("body").addClass('flat-demo');
                $("#flat-customizer").show();
                this.setupHoverEvents();
                this.setupClickEvents();
                this.updateRadioUI();
                this.update();
        }

        setupHoverEvents(): void {
                $(".segmented-control label").off('mouseenter').on('mouseenter', function () {
                        let id = $(this).attr("for");
                        if (!$("#" + id).prop("checked")) $(this).css('color', DynamicTheme.highlightColor);
                });

                $(" .pill-button").off('mouseenter mouseleave').hover(
                        function () {
                                // TODO: variablize
                                $(this).css('background', ColorUtility.getDarken(DynamicTheme.highlightColor, 15));
                        }, function () {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(this).css('background', DynamicTheme.highlightColor);
                        }
                );

                $(" .theme-skin .pill-button").off('mouseenter mouseleave').hover(
                        function () {
                                $(this).css('background', ColorUtility.getDarken(DynamicTheme.highlightColor, 15));
                        }, function () {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(this).css('background', DynamicTheme.highlightColor);
                        }
                );

                $(" .pallet-button").off('mouseenter mouseleave');

                $(" .portfolio-filter .pill-button").off('mouseenter mouseleave').hover(
                        function () {
                                $(this).css('background', DynamicTheme.highlightColor);
                        }, function () {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(this).css('background', '');
                        }
                );

                $("table>tbody>tr").off('mouseenter mouseleave').hover(
                        function () {
                                $(this).css('background', DynamicTheme.highlightColor);
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
                                $(this).siblings(".name").css('color', DynamicTheme.highlightColor);
                        }
                });
        }

        update(): void {
                this.lightenSchemeColor = ColorUtility.getLighten(DynamicTheme.schemeColor, lightenIntensity);
                this.darkenSchemeColor = ColorUtility.getDarken(DynamicTheme.schemeColor, darkenIntensity);

                $(backgroundLightenSchemeColorSelectors).css('background', this.lightenSchemeColor);
                $(backgroundSchemeColorSelectors).css('background', DynamicTheme.schemeColor);
                $(backgroundHighlightColorSelectors).css('background', DynamicTheme.highlightColor);
                $(backgroundTransparentSelectors).css('background', 'transparent');
                $(colorBaseColorSelectors).css('color', DynamicTheme.baseColor);
                $(noneBoxShadowSelectors).css('box-shadow', 'none');
                $(".flat-demo :not(.portfolio-filter) .pill-button").css('color', ColorUtility.getInvert(DynamicTheme.highlightColor, true));
                $("#flat-skin-button .pill-button").css('background', ColorUtility.getDarken(DynamicTheme.highlightColor, 15));
                DynamicTheme.trackScrollbarRule.style.background = this.lightenSchemeColor;
                DynamicTheme.thumbScrollbarRule.style.background = this.darkenSchemeColor;
        }

        updateRadioUI(): void {
                $("input[type='radio']:checked").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', ColorUtility.getInvert(DynamicTheme.highlightColor, true));
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
                                $("label[for='" + this.id + "'] i").css('color', DynamicTheme.highlightColor);
                                $("label[for='" + this.id + "']").next().css('color', DynamicTheme.highlightColor);
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