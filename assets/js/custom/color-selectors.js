// color related selectors (property + corresponding style)
export const backgroundBaseColorSelectors = formatString([
        "#pp-nav li :not(.active) span",
]);

export const backgroundHighlightColorSelectors = formatString([
        ".bg-base-color",
        ".border-style",
        ".timeline-icon",
        "#pp-nav li .active span",

        // ".flat-demo .pill-button.active",
        // ".flat-demo .button-border"
]);

export const backgroundSchemeColorSelectors = formatString([
        ".section",
        ".button-border",
        ".box-border",
        ".segmented-control",
        ".image-border",
        ".form-group",
        ".skill-box .skillbar",
        ".pallet-button",
        ".blog .blog-image",
        ".blog .blog-item .before",

        ".flat-demo .section",
]);

export const colorHighlightColorSelectors = formatString([
        ".highlight-color",
        ".pill-button",
        ".overlay-menu a.active",
        ".timeline-year",
        ".portfolio .portfolio-filter li a",
        ".portfolio .portfolio-icon a i",
        ".contact .form-item .form-control",
]);

export const colorBaseColorSelectors = formatString([
        "body",
        ".logo",
        ".color-switcher .pallet-button i",
        ".follow-label",
        ".social a i",
        ".blog-content h6 a",
        ".form-group input",
        ".form-group textarea",
        ".overlay-menu-toggler",
]);

export const colorMutedBaseColorSelectors = formatString([
        ".blog-content .list-inline-item span",
        ".contact-info-text small",
        ".hero-content p",
        ".title-wrapper span",
        ".form-control"
]);

// FLAT STYLE
export const noneBoxShadowSelectors = formatString([
        ".flat-demo .image-border",
        ".flat-demo .button-border"
]);

function formatString(selectorsArray) {
        return selectorsArray.join(", ");
}