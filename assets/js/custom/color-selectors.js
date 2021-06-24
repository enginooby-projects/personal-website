// color related selectors (property + corresponding style)

export const colorHighlightColorSelectors = formatString([
        ".highlight-color",
        ".pill-button",
        ".overlay-menu a.active",
        ".timeline-year",
        ".portfolio .portfolio-filter li a",
        ".portfolio .portfolio-icon a i",
        ".contact .form-item .form-control",
]);

export const backgroundHighlightColorSelectors = formatString([
        ".bg-base-color",
        ".border-style",
        ".timeline-icon",
        ".flat-demo .button-border",
        ".dark - scheme.flat - demo.button - border",
        ".flat-demo .pill-button.active",
        ".dark-scheme #pp-nav li .active span",
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
]);

export const flatBoxShadowSelectors = formatString([
        ".button-border",
        ".box-border",
        ".image-border",
        ".segmented-control",
        ".hero-03 .personal-image img",
        ".checkbox label",
        ".blog-intro"
]);

export const pressedBoxShadowSelectors = formatString([
        ".pill-button.active",
        ".custom-scrollbar",
        ".blog .blog-image .after",
]);

export const concaveBoxShadowSelectors = formatString([
        ".skill-box .skillbar",
        ".form-group",
        ".radio-selection"
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

export const backgroundBaseColorSelectors = formatString([
        "#pp-nav li span",
]);

export const colorMutedBaseColorSelectors = formatString([
        ".blog-content .list-inline-item span",
        ".contact-info-text small",
        ".hero-content p",
        ".title-wrapper span",
        ".form-control"
]);

function formatString(selectorsArray) {
        return selectorsArray.join(", ");
}