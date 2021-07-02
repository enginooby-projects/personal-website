// import tinycolor from 'tinycolor2';
import * as ColorModule from './DynamicTheme.js';
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
                                $(this).css('background', tinycolor(ColorModule.highlightColor).darken(15).toString());
                        }, function () {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(this).css('background', '');
                        }
                );

                $(" .pallet-button").off('mouseenter mouseleave');

                $(" .portfolio-filter .pill-button").off('mouseenter mouseleave').hover(
                        function () {
                                $(this).css('background', ColorModule.highlightColor);
                        }, function () {
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                if (!$(this).hasClass('active')) $(this).css('background', '');
                        }
                );

                $("table>tbody>tr").off('mouseenter mouseleave').hover(
                        function () {
                                $(this).css('background', ColorModule.highlightColor);
                        }, function () {
                                $(this).css('background', '');
                        }
                );

                $(" .badge-border").off('mouseenter mouseleave');
        }

        setupClickEvents(): void {
                $(".segmented-control input").off('click').click(function () {
                        $(".segmented-control label[for='" + this.id + "']").css('color', ColorModule.baseColor);
                        $(".segmented-control input[type='radio']:not(:checked)").each(
                                function () {
                                        $(".segmented-control label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
                                }
                        );
                });

                $(".checkbox input").off('click').click(function () {
                        if (!$(this).prop("checked")) {
                                $(this).siblings(".name").css('color', ColorModule.mutedBaseColor);
                        }
                        else {
                                $(this).siblings(".name").css('color', ColorModule.highlightColor);
                        }
                });
        }

        update(): void {
                this.lightenSchemeColor = tinycolor(ColorModule.schemeColor).lighten(lightenIntensity).toString();
                this.darkenSchemeColor = tinycolor(ColorModule.schemeColor).darken(darkenIntensity).toString();

                $(".flat-demo :not(.portfolio-filter) .pill-button").css('color', ColorModule.invertColor(ColorModule.highlightColor, true));
                $(backgroundLightenSchemeColorSelectors).css('background', this.lightenSchemeColor);
                $(backgroundHighlightColorSelectors).css('background', ColorModule.highlightColor);
                $(backgroundTransparentSelectors).css('background', 'transparent');
                $(colorBaseColorSelectors).css('color', ColorModule.baseColor);
                $(noneBoxShadowSelectors).css('box-shadow', 'none');
                ColorModule.trackScrollbarRule.style.background = this.lightenSchemeColor;
                ColorModule.thumbScrollbarRule.style.background = this.darkenSchemeColor;
        }

        updateRadioUI(): void {
                $("input[type='radio']:checked").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', ColorModule.invertColor(ColorModule.highlightColor, true));
                        }
                );
                $("input[type='radio']:not(:checked)").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', ColorModule.mutedBaseColor);
                        }
                );
        }

        updateCheckboxUI(): void {
                $("input[type='checkbox']:checked").each(
                        function () {
                                $("label[for='" + this.id + "'] i").css('color', ColorModule.highlightColor);
                                $("label[for='" + this.id + "']").next().css('color', ColorModule.highlightColor);
                        }
                );
                $("input[type='checkbox']:not(:checked)").each(
                        function () {
                                $("label[for='" + this.id + "'] i").css('color', ColorModule.mutedBaseColor);
                                $("label[for='" + this.id + "']").next().css('color', ColorModule.mutedBaseColor);
                        }
                );
        }
}