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
]);

const backgroundHighlightColorSelectors = formatString([
        ".flat-demo .button-border",
        ".radio-selection",
        ".flat-demo .portfolio-filter .pill-button.active",
]);

const backgroundLightenSchemeColorSelectors = formatString([
        ".flat-demo .box-border",
        ".flat-demo .image-border",
        ".flat-demo .box-hover-border",
        ".flat-demo .contact .form-item .form-group",
        ".flat-demo .segmented-control",
        ".flat-demo .checkbox label",
        ".flat-demo .pallet-border",
        ".color-pallet"
]);

const backgroundSchemeColorSelectors = formatString([
        // ".flat-demo .portfolio-filter .pill-button.active",
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
        lightenSchemeColor: string = "#680317";
        darkenSchemeColor: string = "#680317";

        onEnable(): void {
                $("body").addClass('flat-demo');
                $('.theme-skin li a').removeClass('active'); // option button
                this.setupHoverEvents();
                this.setupClickEvents();
                this.updateRadioUI();
                $(".customizer").hide();
                $("#flat-customizer").show();
                this.update();
        }

        setupHoverEvents(): void {
                $(" .pill-button").off('mouseenter mouseleave').hover(
                        function () {
                                $(this).css('background', ColorUtility.getDarken(DynamicTheme.highlightColor, 15));
                        }, function () {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(this).css('background', '');
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

                $(".flat-demo :not(.portfolio-filter) .pill-button").css('color', ColorUtility.getInvert(DynamicTheme.highlightColor, true));
                $(backgroundLightenSchemeColorSelectors).css('background', this.lightenSchemeColor);
                $(backgroundHighlightColorSelectors).css('background', DynamicTheme.highlightColor);
                $(backgroundTransparentSelectors).css('background', 'transparent');
                $(colorBaseColorSelectors).css('color', DynamicTheme.baseColor);
                $(noneBoxShadowSelectors).css('box-shadow', 'none');
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
}