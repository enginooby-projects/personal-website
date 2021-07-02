// color related selectors (property + corresponding style)
export var backgroundBaseColorSelectors = formatString([
    "#pp-nav li :not(.active) span",
]);
export var backgroundHighlightColorSelectors = formatString([
    ".bg-base-color",
    ".border-style",
    ".timeline-icon",
    "#pp-nav li .active span",
    ".pp-slidesNav .active span"
]);
export var backgroundSchemeColorSelectors = formatString([
    ".section",
    ".box-border",
    ".segmented-control",
    ".image-border",
    ".form-group",
    ".skill-box .skillbar",
    ".blog .blog-image",
    ".blog .blog-item .before",
    ".flat-demo .section",
]);
export var colorHighlightColorSelectors = formatString([
    ".highlight-color",
    ".pill-button",
    ".overlay-menu a.active",
    ".timeline-year",
    ".portfolio .portfolio-filter li a",
    ".portfolio .portfolio-icon a i",
    ".contact .form-item .form-control",
]);
export var colorBaseColorSelectors = formatString([
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
    ".portfolio-single .close"
]);
export var colorMutedBaseColorSelectors = formatString([
    ".blog-content .list-inline-item span",
    ".contact-info-text small",
    ".hero-content p",
    ".title-wrapper span",
    ".form-control"
]);
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}