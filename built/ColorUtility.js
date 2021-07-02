// TODO: Import this
// import tinycolor from "tinycolor2";
var lightBaseColor = "#EBEBEB";
var darkBaseColor = "#212529";
var ColorUtility = /** @class */ (function () {
    function ColorUtility() {
    }
    ColorUtility.getLighten = function (color, amount) {
        return tinycolor(color).lighten(amount).toString();
    };
    ColorUtility.getDarken = function (color, amount) {
        return tinycolor(color).darken(amount).toString();
    };
    ColorUtility.getInvert = function (hex, isBlackWhite) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        var r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
        if (isBlackWhite) {
            // http://stackoverflow.com/a/3943023/112731
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? darkBaseColor : lightBaseColor;
        }
        // invert color components
        var rString = (255 - r).toString(16);
        var bString = (255 - b).toString(16);
        var gString = (255 - g).toString(16);
        // pad each with zeros and return
        return "#" + this.padZero(rString) + this.padZero(gString) + this.padZero(bString);
    };
    ColorUtility.padZero = function (str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    };
    return ColorUtility;
}());
export default ColorUtility;
