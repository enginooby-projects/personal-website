import * as DynamicTheme from './DynamicTheme.js';

export abstract class Style {
        onEnable(): void {
                this.init();
                this.setupCustomizeEvents();
                // this.updateRadioUI();
        };
        abstract setupCustomizeEvents(): void; // events for customize the style in the setting panel
        abstract setupLocalEvents(): void; // events belong to only a style
        abstract init(): void;

        // revert properties & remove events  which may affect other styles such as transparency
        onDisable(): void {
                this.removeLocalEvents();
                this.revertStyle();
        };
        abstract removeLocalEvents(): void;
        abstract revertStyle(): void;

        abstract updateRadioUI(): void;
        abstract updateCheckboxUI(): void;
        abstract resetInactiveButtons(currentActiveButton: HTMLElement): void;

        //TODO:  events from DynamicTheme
        abstract onHighlightColorUpdated(): void;
        abstract onSchemeColorUpdated(): void;
}

