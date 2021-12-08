export type coordinates = {
	x: number;
	y: number;
}

export function update_distance0(resultArray: number[], pixelArray: string){
	let size = pixelArray.length;
	let i: number;
	let count: number = 0;
	for (i = 0; i < size; i++)
	{
		if (pixelArray[i] == '1')
		{
			resultArray[i] = 0;
			count++;
		}
	}
}

export function update_distance1(resultArray: number[], pixelArray: string, row: number, column: number): number{
	let size = resultArray.length;
	let coordinatesLeft, coordinatesRight, coordinatesUp, coordinatesDown;
	let i: number;
	let count: number = 0;
	for (i = 0; i < size; i++)
	{
		if (pixelArray[i] == '1')
		{
			let coordinates = getCoordinates(i, column);
			coordinatesLeft = {x:coordinates.x - 1, y:coordinates.y};
			if(checkCoordValidity(coordinatesLeft, row, column) == true)
			{
				let index = getIndex(coordinatesLeft, column);
				if (resultArray[index] > 1){
					resultArray[index] = 1;
					count++;
				}
			}
			coordinatesRight = {x:coordinates.x + 1, y:coordinates.y};
			let index: number;
			if(checkCoordValidity(coordinatesRight, row, column) == true)
			{
				index = getIndex(coordinatesRight, column);
				if (resultArray[index] > 1){
					resultArray[index] = 1;
					count++;
				}
			}
			coordinatesUp = {x:coordinates.x, y:coordinates.y - 1};
			if(checkCoordValidity(coordinatesUp, row, column) == true)
			{
				index = getIndex(coordinatesUp, column);
				if (resultArray[index] > 1){
					resultArray[index] = 1;
					count++;
				}
			}
			coordinatesDown = {x:coordinates.x, y:coordinates.y + 1};
			if(checkCoordValidity(coordinatesDown, row, column) == true)
			{
				index = getIndex(coordinatesDown, column);
				if (resultArray[index] > 1){
					resultArray[index] = 1;
					count++;
				}
			}
		}
	}
	return count;
}

function getIndex(coordinates: coordinates, columns: number){
	return coordinates.x + coordinates.y * columns;
}

function checkCoordValidity(coordinates: coordinates, row: number, column: number){
	if (coordinates.x >=0 && coordinates.x < column && coordinates.y >= 0 && coordinates.y < row)
		return true;
	else
		return false;
}

export function getCoordinates(index: number, columns: number){
	let coordinates = {x:0, y:0};
	coordinates.x = index % columns;
	coordinates.y = Math.trunc(index / columns);
	return coordinates;
}