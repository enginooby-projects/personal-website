// $(document).ready(function () {
//         "use strict";
//         $('.theme-skin li .flat-skin').click(function () {
//                 DynamicTheme.changeStyle(this, FlatStyle.Instance);
//         });
//         $('.theme-skin li .neo-skin').click(function () {
//                 DynamicTheme.changeStyle(this, NeuStyle.Instance);
//         });
// });
var Style = /** @class */ (function () {
    function Style() {
    }
    Style.prototype.setupEvents = function () {
        this.setupHoverEvents();
        this.setupClickEvents();
    };
    return Style;
}());
export { Style };
