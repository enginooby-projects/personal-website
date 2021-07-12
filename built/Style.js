export class Style {
    constructor() {
        this.localEventsAreSetup = false;
    }
    onEnable() {
        this.init();
        this.setupCustomizeEvents();
        // this.setupLocalEvents(); // include this if not use init css file for dynamic properties
        // this.updateRadioUI();
    }
    ;
    // revert properties & remove events  which may affect other styles such as transparency
    onDisable() {
        this.removeLocalEvents();
        this.revertStyle();
    }
    ;
}
