"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transform_1 = require("./transform");
const transform_2 = require("./transform");
const transform2_1 = require("./transform2");
const prep_1 = require("./prep");
const prep_2 = require("./prep");
let answers = [];
let i = 0;
let count;
let rows;
process.stdin.on('data', function (data) {
    answers.push(data.toString().trim());
    if (i == 0 && isNumber(answers[i]) == false)
        errorMessage();
    if (i == 0)
        count = +(answers[0]);
    else if (i == 1 || answers[i - 1] == '') {
        rows = getRowNB(answers[i]);
        if (rows == -1)
            errorMessage();
        else
            count--;
    }
    else {
        if (checkOneZero(answers[i]) == false)
            errorMessage();
        rows--;
    }
    if (rows == 0 && count == 0) {
        let test_cases = (0, prep_2.getTestCases)(answers[0]);
        if (test_cases > 1000)
            errorMessage();
        let i;
        let start = 1;
        for (i = 0; i < test_cases; i++) {
            let a = new prep_1.OneUnit(answers, start);
            if (!checkInputQuality(a))
                errorMessage();
            let transformed = 0;
            (0, transform_1.update_distance0)(a.resultArray, a.originArray);
            transformed = (0, transform_2.update_distance1)(a.resultArray, a.originArray, a.rowNumber, a.columnNumber);
            a.update_postingOf1s();
            (0, transform2_1.massConvert)(a.NbToTransform - transformed, a);
            console.log('');
            a.print_result();
            start += a.rowNumber + 2;
        }
        process.exit();
    }
    i++;
});
function getRowNB(a) {
    let size = a.length;
    let temp = a;
    if (isNumber(temp.replace(' ', ''))) {
        for (let i = 0; i < size; i++) {
            if (a[i] == ' ')
                return +a.substr(0, i);
        }
        return -1;
    }
    else
        return -1;
}
function isNumber(a) {
    let size = a.length;
    for (let i = 0; i < size; i++) {
        if (a[i] > '9' || a[i] < '0')
            return false;
    }
    return true;
}
function checkOneZero(a) {
    let size = a.length;
    for (let i = 0; i < size; i++) {
        if (a[i] != '1' && a[i] != '0')
            return false;
    }
    return true;
}
function errorMessage() {
    console.log('Error: input format error');
    process.exit();
}
//still need to check all the input lines following the given index for row and column
function checkInputQuality(a) {
    if ((a.rowNumber >= 1 && a.rowNumber <= 182)
        && (a.columnNumber >= 1 && a.columnNumber <= 182)
        && (a.countOnes > 0)
        && (a.rowNumber * a.columnNumber == a.length))
        return true;
    else
        return false;
}
