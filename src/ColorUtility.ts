// import tinycolor from "/assets/js/import/tinycolor.js";      // Import like this will make tsc compiler to copy source file into outDir as well?!
// import tinycolor from "tinycolor2"  ;        // Import like this, has to run Node.js server

const lightBaseColor: string = "#EBEBEB";
const darkBaseColor: string = "#212529";

export default class ColorUtility {
        static getLighten(color: string, amount: number): string {
                return tinycolor(color)!.lighten(amount).toString();
        }
        static getDarken(color: string, amount: number): string {
                return tinycolor(color)!.darken(amount).toString();
        }

        static getInvert(hex: string, isBlackWhite: boolean) {
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
                let r = parseInt(hex.slice(0, 2), 16),
                        g = parseInt(hex.slice(2, 4), 16),
                        b = parseInt(hex.slice(4, 6), 16);
                if (isBlackWhite) {
                        // http://stackoverflow.com/a/3943023/112731
                        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? darkBaseColor : lightBaseColor;
                }
                // invert color components
                const rString: string = (255 - r).toString(16);
                const bString: string = (255 - b).toString(16);
                const gString: string = (255 - g).toString(16);

                // pad each with zeros and return
                return "#" + this.padZero(rString) + this.padZero(gString) + this.padZero(bString);
        }

        static padZero(str: string, len?: number) {
                len = len || 2;
                let zeros = new Array(len).join('0');
                return (zeros + str).slice(-len);
        }
}