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