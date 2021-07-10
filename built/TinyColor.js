var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import tinycolor from "/assets/js/import/tinycolor.js";      // Import like this will make tsc compiler to copy source file into outDir as well?!
// import tinycolor from "tinycolor2"  ;        // Import like this, has to run Node.js server
import { Color } from "./Color.js";
var TinyColor = /** @class */ (function (_super) {
    __extends(TinyColor, _super);
    function TinyColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TinyColor.prototype.getLighten = function (amount) {
        return tinycolor(this.hex).lighten(amount).toString();
    };
    TinyColor.prototype.getDarken = function (amount) {
        return tinycolor(this.hex).darken(amount).toString();
    };
    return TinyColor;
}(Color));
export { TinyColor };
