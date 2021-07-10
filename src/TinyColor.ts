// import tinycolor from "/assets/js/import/tinycolor.js";      // Import like this will make tsc compiler to copy source file into outDir as well?!
// import tinycolor from "tinycolor2"  ;        // Import like this, has to run Node.js server
import { Color } from "./Color.js";

class TinyColor extends Color {
        getLighten(amount: number): string {
                return tinycolor(this.hex)!.lighten(amount).toString();
        }
        getDarken(amount: number): string {
                return tinycolor(this.hex)!.darken(amount).toString();
        }
}