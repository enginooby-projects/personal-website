abstract class Style {

        constructor() {
                this.onDocumentReady();
        }

        formatString(selectorsArray: string[]): string {
                return selectorsArray.join(", ");
        }

        setupEvents(): void {
                this.setupHoverEvents();
                this.setupClickEvents();
        }

        abstract onDocumentReady(): void;
        abstract init(): void;
        abstract setupHoverEvents(): void;
        abstract setupClickEvents(): void;
        abstract update(): void;
        abstract updateRadioUI(): void;
        abstract updateCheckboxUI(): void;
}