import * as DynamicTheme from './DynamicTheme.js';

export abstract class Style {
        onEnable(): void {
                this.init();
                this.setupEvents();
                // this.updateRadioUI();
        };
        abstract setupEvents(): void;
        abstract init(): void;

        onDisable(): void {
                this.removeEvents();
                this.revertStyle();
        };
        abstract removeEvents(): void;
        abstract revertStyle(): void;  // revert properties which may affect other styles such as transparency

        abstract updateRadioUI(): void;
        abstract updateCheckboxUI(): void;
        abstract resetInactiveButtons(currentActiveButton: HTMLElement): void;

        //TODO:  events from DynamicTheme
        abstract onHighlightColorUpdated(): void;
        abstract onSchemeColorUpdated(): void;
}

