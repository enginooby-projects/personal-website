export const bgHighlightSelectors = formatString([
        ".bg-highlight-color",
        ".border-style",
        "#pp-nav li .active span",
]);

export const bgSchemeSelectors = formatString([
        ".section",
        // ".hero-03",
        ".segmented-control",
        ".image-border",
        ".form-group",
        ".skill-box .skillbar",
        ".blog .blog-image",
        ".blog .blog-item .before",
        "#overlayer",
        ".toggle .indicator"
]);

export const bgBaseSelectors = formatString([
        "#pp-nav li :not(.active) span"
]);

export const colorHighlightSelectors = formatString([
        ".highlight-color",
        ".overlay-menu a.active",
        ".timeline-year",
        ".portfolio .portfolio-filter li a",
        ".contact .form-item .form-control",
        ".highlight-portfolio-item.fa-star",
        //hover
        ".portfolio-icon a:hover",
        ".social a i:hover",
        ".list-inline.socials li a i:hover",
        ".overlay-menu-toggler:hover",
        " #myMenu li a:hover"
]);

export const colorBaseSelectors = formatString([
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
        ".blog-label a",
        // "#pp-nav li .pp-tooltip"
]);

export const colorMutedBaseSelectors = formatString([
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

export const borderRadiusSelectors = formatString([
        // BLOG
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

        // CONTACT
        ".contact .form-item .form-group",
        ".contact #message.toast",
        ".form-group input",
        ".form-group textarea",

        //COMMON
        ".pill-button",
        ".button-border",
        ".image-border",
        ".box-border",
        ".badge-border",
        ".duties .image-border .box-hover-border",
        ".image-border img:not(.personal-image img)",
        ".range-slider__range",
        ".range-slider__value",

        " .pallet-button",
        ".badge",
        "table",
        ".segmented-control",
        ".radio-selection",
        ".checkbox label",
        ".toggle",
        ".toggle .indicator",

        // SETTING
        ".color-switcher .color-pallet",
        ".color-switcher .pallet-border",
        ".color-scheme li a",

        // SELF-EDUCATION
        ".course-item img",
        ".book-item>img",
        ".skill-box .skillbar",
        ".skill-box .fill-skillbar",

        // PORTFOLIO
        ".portfolio-item-content",
        ".portfolio-icon a",
        ".portfolio-single img",

        ".modal-content",
        ".portfolio-item-content::before",
        ".display-content>.container",
        ".testimonial .owl-carousel .owl-dot span",
        ".skill-item",
        "::-webkit-scrollbar-track",
        "::-webkit-scrollbar-thumb",
]);

//HELPER
function formatString(selectorsArray: string[]): string {
        return selectorsArray.join(", ");
}