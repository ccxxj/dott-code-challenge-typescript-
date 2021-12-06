//check error (e.g. all should only be numbers)
//change size as pass in arguments? no need to calculate size repetatively

let array = ['2', '3 4', '0001', '0011', '0110', '\n', '2 2', '11', '00'];

function getTestCases(line0)
{
	return +line0;
}

function getRowColumn(line1)
{
	const RowColumn = {Row: 0, Column: 0};
	for(i = 0; i < line1.length; i++)
		if (line1[i] == ' ')
		{
			RowColumn.Row = +line1.substr(0,i);
			break;
		}
	RowColumn.Column = +line1.slice(i+1, line1.length + 1);
	return RowColumn;
}

function capture(anything, index, rows){
	let line1 = anything[1];
	
	var pixelArray = anything[2];
	if (index == 0)
	{
		var startIndex = 2;
	}
	else
	{
		pixelArray = anything[index];
		startIndex = index;
	}
	for (i = 1; i < rows; i++)
		pixelArray = pixelArray.concat(array[startIndex + i]);
	return pixelArray;
}

function create_resultArray(pixelArray){
	let size = pixelArray.length;
	let resultArray = new Array(size);
	for (i = 0; i < size; i++)
		resultArray[i] = size;
	return resultArray;
}

function print_resultArray(resultArray,RowColumn){
	let size = resultArray.length;
	for (i = 0; i < RowColumn.Row; i++)
	{
		let line = "";
		for (j = 0; j < RowColumn.Column; j++)
		{
			line += resultArray[i * RowColumn.Column + j];
			if (j != (RowColumn.Column - 1))
				line += " ";
		}
		console.log(line);
	}
}

function distance0(resultArray, pixelArray){
	let size = pixelArray.length;
	for (i = 0; i < size; i++)
	{
		if (pixelArray[i] == '1')
			resultArray[i] = 0;
	}
}

function getCoordinates(index, columns){
	let coordinates = {x:0, y:0};
	coordinates.x = index % columns;
	coordinates.y = index / columns;
	return coordinates;
}

function checkCoordValidity(coordinates, RowColumn){
	if (coordinates.x >=0 && coordinates.x < RowColumn.columns && coordinates.y >= 0 && coordinates.y < RowColumn.rows)
		return true;
	else
		return false;
}

function distance1(resultArray, pixelArray, RowColumn){
	let size = resultArray.length;
	for (i = 0; i < size; i++)
	{
		let coordinates = getCoordinates(i, RowColumn.columns);
		let coordinatesLeft = coordinates;
		coordinatesLeft.x = coordinates.x - 1;
		coordinatesLeft.y = coordinates.y;
		let index = coordinatesLeft.x + coordinatesLeft.y * RowColumn.columns;
		if ((checkCoordValidity(coordinatesLeft, RowColumn)) && resultArray[index] > 1)
			resultArray[index] = 1;
		let coordinatesRight = coordinates;
		coordinatesRight.x = coordinates.x + 1;
		coordinatesRight.y = coordinates.y;
		index = coordinatesRight.x + coordinatesRight.y * RowColumn.columns;
		if ((checkCoordValidity(coordinatesRight, RowColumn)) && resultArray[index] > 1)
			resultArray[index] = 1;
		let coordinatesUp = coordinates;
		coordinatesUp.x = coordinates.x;
		coordinatesUp.y = coordinates.y - 1;
		index = coordinatesUp.x + coordinatesUp.y * RowColumn.columns;
		if ((checkCoordValidity(coordinatesUp, RowColumn)) && resultArray[index] > 1)
			resultArray[index] = 1;
		let coordinatesDown = coordinates;
		coordinatesDown.x = coordinates.x;
		coordinatesDown.y = coordinates.y + 1;
		if ((checkCoordValidity(coordinatesDown, RowColumn)) && resultArray[index] > 1)
		resultArray[index] = 1;
	}
	return resultArray;
}

let test_cases = getTestCases(array[0]);
let RowColumn = getRowColumn(array[1]);
let pixelCal = capture(array, 0, RowColumn.Row);
let resultArray = create_resultArray(pixelCal);
distance0(resultArray, pixelCal);
distance1(resultArray, pixelCal, RowColumn);

console.log(test_cases);
console.log(RowColumn);
console.log(pixelCal);
print_resultArray(resultArray,RowColumn);