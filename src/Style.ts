import * as DynamicTheme from './DynamicTheme.js';

export abstract class Style {
        setupEvents(): void {
                this.setupHoverEvents();
                this.setupClickEvents();
        }

        abstract onEnable(): void;
        abstract onDisable(): void; // remove consequenceswhich may affect other style (e.g transparency)
        abstract setupHoverEvents(): void;
        abstract setupClickEvents(): void;
        abstract update(): void;
        abstract updateRadioUI(): void;
        abstract updateCheckboxUI(): void;
        abstract resetUncheckedButtons(currentCheckedButton: HTMLElement): void;
        // events from DynamicTheme
}

