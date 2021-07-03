// $(document).ready(function () {
//         "use strict";
//         $('.theme-skin li .flat-skin').click(function () {
//                 DynamicTheme.changeStyle(this, FlatStyle.Instance);
//         });
//         $('.theme-skin li .neo-skin').click(function () {
//                 DynamicTheme.changeStyle(this, NeuStyle.Instance);
//         });
// });

export abstract class Style {
        setupEvents(): void {
                this.setupHoverEvents();
                this.setupClickEvents();
        }

        abstract onEnable(): void;
        abstract setupHoverEvents(): void;
        abstract setupClickEvents(): void;
        abstract update(): void;
        abstract updateRadioUI(): void;
        abstract updateCheckboxUI(): void;
}

