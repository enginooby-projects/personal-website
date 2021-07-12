export class Style {
    onEnable() {
        this.init();
        this.setupEvents();
        // this.updateRadioUI();
    }
    ;
    onDisable() {
        this.removeEvents();
        this.revertStyle();
    }
    ;
}
