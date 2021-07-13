import * as DynamicTheme from './DynamicTheme.js';

export abstract class Style {
        localEventsAreSetup: boolean = false;
        private styleSheet?: CSSStyleSheet;
        private cssRules?: CSSRuleList;

        constructor() {
                this.styleSheet = this.getStyleSheet();
                this.cssRules = this.styleSheet.cssRules || this.styleSheet.rules;
        }

        // CONSIDER: Create new style then append to head
        private getStyleSheet(): CSSStyleSheet {
                for (let i = 0; i < document.styleSheets.length; i++) {
                        let cursheet = document.styleSheets[i];
                        if (cursheet.title == 'style') return cursheet;
                }
                throw new Error('Failed to retrieve style sheet with title "style"!');
        }

        protected insertEmptyRule = (selectors: string[]): CSSStyleRule => this.cssRules![this.styleSheet!.insertRule(`${this.formatSelectorsArray(selectors)} {}`)] as CSSStyleRule;

        private formatSelectorsArray(array: string[]): string {
                return array.join(", ");
        }

        onEnable(): void {
                this.init();
                this.setupCustomizeEvents();
                // this.setupLocalEvents(); // include this if not use init css file for dynamic properties
        };
        abstract setupCustomizeEvents(): void; // events for customize the style in the setting panel
        // abstract setupLocalEvents(): void; // events belong to only a style
        abstract init(): void;

        // revert properties & remove events  which may affect other styles such as transparency
        // onDisable(): void {
        //         this.removeLocalEvents();
        //         this.revertStyle();
        // };
        // abstract removeLocalEvents(): void;
        // abstract revertStyle(): void;

        abstract onHighlightColorUpdated(): void;
        abstract onSchemeColorUpdated(): void;
        abstract onBaseColorUpdated(): void;
}

