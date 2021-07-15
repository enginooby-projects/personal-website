export abstract class Style {
        private styleSheet?: CSSStyleSheet;
        private cssRules?: CSSRuleList;
        name: string = '';

        constructor(name: string) {
                this.styleSheet = this.getStyleSheet();
                this.cssRules = this.styleSheet.cssRules || this.styleSheet.rules;
                this.name = name;
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
                return array.map(selector => `.${this.name} ${selector}`).join(", ");
                // return array.join(", ");
        }

        onEnable(): void {
                this.init();
                this.setupCustomizeEvents();
        };
        abstract setupCustomizeEvents(): void; // events for customize the style in the setting panel
        abstract init(): void;

        abstract onHighlightColorUpdated(): void;
        abstract onSchemeColorUpdated(): void;
        abstract onBaseColorUpdated(): void;
}

