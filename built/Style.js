export class Style {
    onEnable() {
        this.init();
        this.setupEvents();
        this.applyStyle();
        this.updateRadioUI();
    }
    ;
    onDisable() {
        this.removeEvents();
        this.revertStyle();
    }
    ;
}
