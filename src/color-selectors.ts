export const backgroundBaseColorSelectors = formatString([
]);

export const backgroundHighlightColorSelectors = formatString([
        ".bg-highlight-color",
        ".border-style",
]);

export const backgroundSchemeColorSelectors = formatString([
        ".section",
        // ".hero-03",
        ".segmented-control",
        ".image-border",
        ".form-group",
        ".skill-box .skillbar",
        ".blog .blog-image",
        ".blog .blog-item .before",
]);

export const colorHighlightColorSelectors = formatString([
        ".highlight-color",
        ".overlay-menu a.active",
        ".timeline-year",
        ".portfolio .portfolio-filter li a",
        ".contact .form-item .form-control",
        ".highlight-portfolio-item.fa-star"
]);

export const colorBaseColorSelectors = formatString([
        "body",
        ".logo",
        ".color-switcher .pallet-border i",
        ".follow-label",
        ".social a i",
        ".blog-content h6 a",
        ".form-group input",
        ".form-group textarea",
        ".overlay-menu-toggler",
        ".modal-title",
        ".portfolio-single .close",
        ".pp-tooltip",
        ".blog-label a"
]);

export const colorMutedBaseColorSelectors = formatString([
        ".blog-content .list-inline-item span",
        ".contact-info-text small",
        ".hero-content p",
        ".title-wrapper span",
        ".form-control",
        ".range-slider label",
        ".range-slider__value",
        "#colour-panel label ",
        ".color-pallet-content p",
        "::placeholder",
        // ".form-control::placeholder",         /* Chrome, Firefox, Opera, Safari 10.1+ */
        // ".form-control:-ms-input-placeholder",         /* Internet Explorer 10-11 */
        // ".form-control::-ms-input-placeholder"         /* Microsoft Edge */
]);

export const colorColorfull1Selectors = formatString([
]);


export const borderRadiusSelectors = formatString([
        ".blog .blog-image",
        ".blog .blog-image .after",
        ".blog .blog-intro ",
        ".blog .blog-intro img",
        ".post-sidebar",
        ".post-sidebar-toggle ",
        ".aside-contents",
        ".search .form-group",
        ".breadcrumb",
        ".blog-single img",
        ".comments img", //50%
        ".comments .commnet-image-border img", // 50%
        ".comments-devider",
        ".contact .form-item .form-group",
        ".contact #message.toast",
        ".pill-button",
        ".button-border",
        ".image-border img",
        ".image-border",
        ".color-switcher .color-pallet",
        ".color-switcher .pallet-border",
        " .pallet-button",
        ".duties .image-border .box-hover-border",
        ".box-border",
        ".badge",
        ".badge-border",
        ".course-item img",
        ".book-item>img",
        ".skill-box .skillbar",
        ".skill-box .fill-skillbar",
        ".segmented-control",
        ".radio-selection",
        ".checkbox label",
        ".range-slider__range",
        ".modal-content",
        "table",
        ".display-content>.container",
        ".range-slider__value",
        ".portfolio-item-content",
        ".portfolio-icon a",
        ".portfolio-single img",
        ".checkbox label",
        ".testimonial .owl-carousel .owl-dot span",
        ".skill-item",
        ".color-scheme li a"
]);

//HELPER
function formatString(selectorsArray: string[]): string {
        return selectorsArray.join(", ");
}