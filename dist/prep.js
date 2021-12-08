"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestCases = exports.OneUnit = void 0;
const transform_1 = require("./transform");
function getRowColumn(line1) {
    const RowColumn = { Row: 0, Column: 0 };
    let i;
    for (i = 0; i < line1.length; i++)
        if (line1[i] == ' ') {
            RowColumn.Row = +line1.substr(0, i);
            break;
        }
    RowColumn.Column = +line1.slice(i + 1, line1.length + 1);
    return RowColumn;
}
function getOriginArray(anything, index, rows) {
    let pixelArray = anything[index];
    let startIndex = index;
    for (let i = 1; i < rows; i++)
        pixelArray = pixelArray.concat(anything[startIndex + i]);
    return pixelArray;
}
function count_1s(a) {
    let size = a.length;
    let count = 0;
    for (let i = 0; i < size; i++) {
        if (a[i] == '1')
            count++;
    }
    return count;
}
function create_resultArray(pixelArray) {
    let size = pixelArray.length;
    let resultArray = new Array(size);
    for (let i = 0; i < size; i++)
        resultArray[i] = size;
    return resultArray;
}
class OneUnit {
    constructor(a, index) {
        this.rowNumber = getRowColumn(a[index]).Row;
        this.columnNumber = getRowColumn(a[index]).Column;
        this.originArray = getOriginArray(a, index + 1, this.rowNumber);
        this.length = this.originArray.length;
        this.countOnes = count_1s(this.originArray);
        this.NbToTransform = this.length - this.countOnes;
        this.resultArray = create_resultArray(this.originArray);
        this.positionOf1s = new Array(this.countOnes).fill(0).map(() => new Array(2).fill(0));
    }
    update_postingOf1s() {
        let j = 0;
        for (let i = 0; i < this.length; i++) {
            if (this.originArray[i] == '1') {
                this.positionOf1s[j][0] = (0, transform_1.getCoordinates)(i, this.columnNumber).x;
                this.positionOf1s[j][1] = (0, transform_1.getCoordinates)(i, this.columnNumber).y;
                j++;
            }
        }
    }
    print_result() {
        let i;
        let j;
        for (i = 0; i < this.rowNumber; i++) {
            let line = "";
            for (j = 0; j < this.columnNumber; j++) {
                line += this.resultArray[i * this.columnNumber + j];
                if (j != (this.columnNumber - 1))
                    line += " ";
            }
            console.log(line);
        }
    }
}
exports.OneUnit = OneUnit;
function getTestCases(line0) {
    return +line0;
}
exports.getTestCases = getTestCases;
// let array = ['3', '3 4', '0001', '0011', '0110', '\n', '2 2', '11', '00', '\n', '5 5', '00000', '00100', '01000', '00001', '00100'];
// let test_cases: number = getTestCases(array[0]);
// let i: number;
// let start: number = 1;
// for (i = 0; i < test_cases; i++)
// {
// 	let a = new OneUnit(array, start);
// 	let transformed: number = 0;
// 	update_distance0(a.resultArray, a.originArray);
// 	transformed = update_distance1(a.resultArray, a.originArray, a.rowNumber, a.columnNumber);
// 	a.update_postingOf1s();
// 	massConvert(a.NbToTransform - transformed, a);
// 	console.log('');
// 	a.print_result();
// 	start += a.rowNumber + 2;
// }
