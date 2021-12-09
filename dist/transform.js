"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = exports.update_distance1 = exports.update_distance0 = void 0;
function update_distance0(resultArray, pixelArray) {
    let size = pixelArray.length;
    let i;
    let count = 0;
    for (i = 0; i < size; i++) {
        if (pixelArray[i] == '1') {
            resultArray[i] = 0;
            count++;
        }
    }
}
exports.update_distance0 = update_distance0;
function update_distance1(resultArray, pixelArray, row, column) {
    let size = resultArray.length;
    let coordinatesLeft, coordinatesRight, coordinatesUp, coordinatesDown;
    let i;
    let count = 0;
    for (i = 0; i < size; i++) {
        if (pixelArray[i] == '1') {
            let coordinates = getCoordinates(i, column);
            coordinatesLeft = { x: coordinates.x - 1, y: coordinates.y };
            if (checkCoordValidity(coordinatesLeft, row, column) == true) {
                let index = getIndex(coordinatesLeft, column);
                if (resultArray[index] > 1) {
                    resultArray[index] = 1;
                    count++;
                }
            }
            coordinatesRight = { x: coordinates.x + 1, y: coordinates.y };
            let index;
            if (checkCoordValidity(coordinatesRight, row, column) == true) {
                index = getIndex(coordinatesRight, column);
                if (resultArray[index] > 1) {
                    resultArray[index] = 1;
                    count++;
                }
            }
            coordinatesUp = { x: coordinates.x, y: coordinates.y - 1 };
            if (checkCoordValidity(coordinatesUp, row, column) == true) {
                index = getIndex(coordinatesUp, column);
                if (resultArray[index] > 1) {
                    resultArray[index] = 1;
                    count++;
                }
            }
            coordinatesDown = { x: coordinates.x, y: coordinates.y + 1 };
            if (checkCoordValidity(coordinatesDown, row, column) == true) {
                index = getIndex(coordinatesDown, column);
                if (resultArray[index] > 1) {
                    resultArray[index] = 1;
                    count++;
                }
            }
        }
    }
    return count;
}
exports.update_distance1 = update_distance1;
function getIndex(coordinates, columns) {
    return coordinates.x + coordinates.y * columns;
}
function checkCoordValidity(coordinates, row, column) {
    if (coordinates.x >= 0 && coordinates.x < column && coordinates.y >= 0 && coordinates.y < row)
        return true;
    else
        return false;
}
function getCoordinates(index, columns) {
    let coordinates = { x: 0, y: 0 };
    coordinates.x = index % columns;
    coordinates.y = Math.trunc(index / columns);
    return coordinates;
}
exports.getCoordinates = getCoordinates;
