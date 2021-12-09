import {OneUnit} from './prep';
import {coordinates} from './transform';
import {getCoordinates} from './transform';

function getDistance(a: coordinates, x0:number, y0: number): number
{
	let distance: number;
	distance = Math.abs(a.x - x0);
	distance += Math.abs(a.y - y0);
	return distance;
}

export function massConvert(Nbleft: number, a: OneUnit): void{
	let temp: number;
	let min: number;
	let i: number;
	let j: number;
	let xj: coordinates;
	for(i = 0; i < a.length; i++)
	{
		if(Nbleft == 0)//check everytime if there is still ones left to be convert
			break;
		if(a.resultArray[i] > 1)
		{
			min = a.rowNumber * a.columnNumber;
			xj = getCoordinates(i, a.columnNumber);
			for(j = 0; j < a.countOnes; j++) //can be improved: check only the most closest on left and right per row
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