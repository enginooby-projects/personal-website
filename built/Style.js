export class Style {
    constructor() {
        this.localEventsAreSetup = false;
        this.insertEmptyRule = (selectors) => this.cssRules[this.styleSheet.insertRule(`${this.formatSelectorsArray(selectors)} {}`)];
        this.styleSheet = this.getStyleSheet();
        this.cssRules = this.styleSheet.cssRules || this.styleSheet.rules;
    }
    // CONSIDER: Create new style then append to head
    getStyleSheet() {
        for (let i = 0; i < document.styleSheets.length; i++) {
            let cursheet = document.styleSheets[i];
            if (cursheet.title == 'style')
                return cursheet;
        }
        throw new Error('Failed to retrieve style sheet with title "style"!');
    }
    formatSelectorsArray(array) {
        return array.join(", ");
    }
    onEnable() {
        this.init();
        this.setupCustomizeEvents();
        // this.setupLocalEvents(); // include this if not use init css file for dynamic properties
    }
    ;
}
