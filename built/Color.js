var lightBaseValue = "#EBEBEB";
var darkBaseValue = "#212529";
var Color = /** @class */ (function () {
    function Color(hex) {
        this.hex = hex;
        this.rValue = this.extractR(hex);
        this.bValue = this.extractB(hex);
        this.gValue = this.extractG(hex);
    }
    Color.prototype.extractR = function (hex) { return parseInt((this.cutHex(hex)).substring(0, 2), 16); };
    Color.prototype.extractG = function (hex) { return parseInt((this.cutHex(hex)).substring(2, 4), 16); };
    Color.prototype.extractB = function (hex) { return parseInt((this.cutHex(hex)).substring(4, 6), 16); };
    Color.prototype.cutHex = function (hex) { return (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex; };
    Color.prototype.getInvertBlackWhite = function () {
        // http://stackoverflow.com/a/3943023/112731
        return (this.rValue * 0.299 + this.gValue * 0.587 + this.bValue * 0.114) > 186 ? darkBaseValue : lightBaseValue;
    };
    Color.prototype.getInvert = function () {
        // invert color components
        var rString = (255 - this.rValue).toString(16);
        var bString = (255 - this.bValue).toString(16);
        var gString = (255 - this.gValue).toString(16);
        // pad each with zeros and return hex
        return "#" + this.padZero(rString) + this.padZero(gString) + this.padZero(bString);
    };
    Color.prototype.padZero = function (str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    };
    return Color;
}());
export { Color };
