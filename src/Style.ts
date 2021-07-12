import * as DynamicTheme from './DynamicTheme.js';

export abstract class Style {
        localEventsAreSetup: boolean = false;

        onEnable(): void {
                this.init();
                this.setupCustomizeEvents();
                // this.setupLocalEvents(); // include this if not use init css file for dynamic properties
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

        abstract resetInactiveButtons(currentActiveButton: HTMLElement): void;

        abstract onHighlightColorUpdated(): void;
        abstract onSchemeColorUpdated(): void;
        abstract onBaseColorUpdated(): void;
}

