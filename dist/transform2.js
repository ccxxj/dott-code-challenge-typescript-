"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.massConvert = void 0;
const transform_1 = require("./transform");
function getDistance(a, x0, y0) {
    let distance;
    distance = Math.abs(a.x - x0);
    distance += Math.abs(a.y - y0);
    return distance;
}
function massConvert(Nbleft, a) {
    let temp;
    let min;
    let i;
    let j;
    let xj;
    for (i = 0; i < a.length; i++) {
        if (Nbleft == 0) //check everytime if there is still ones left to be convert
            break;
        if (a.resultArray[i] > 1) {
            min = a.rowNumber * a.columnNumber;
            xj = (0, transform_1.getCoordinates)(i, a.columnNumber);
            for (j = 0; j < a.countOnes; j++) //can be improved: check only the most closest on left and right per row
             {
                temp = getDistance(xj, a.positionOf1s[j][0], a.positionOf1s[j][1]);
                if (temp < min)
                    min = temp;
            }
            a.resultArray[i] = min;
            Nbleft--;
        }
    }
}
exports.massConvert = massConvert;
