export class Style {
    onEnable() {
        this.init();
        this.setupCustomizeEvents();
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
