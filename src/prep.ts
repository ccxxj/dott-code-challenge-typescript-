import {getCoordinates} from './transform';

function getRowColumn(line1: string)
{
	const RowColumn = {Row: 0, Column: 0};
	let i: number;
	for(i = 0; i < line1.length; i++)
		if (line1[i] == ' ')
		{
			RowColumn.Row = +line1.substr(0,i);
			break;
		}
	RowColumn.Column = +line1.slice(i+1, line1.length + 1);
	return RowColumn;
}

function getOriginArray(anything: string[], index: number, rows: number){
	let pixelArray = anything[index];
	let startIndex = index;
	for (let i: number = 1; i < rows; i++)
		pixelArray = pixelArray.concat(anything[startIndex + i]);
	return pixelArray;
}

function count_1s(a: string): number
{
	let size: number = a.length;
	let count: number = 0;
	for(let i: number = 0; i < size; i++)
	{
		if(a[i] == '1')
			count++;
	}
	return count;
}

function create_resultArray(pixelArray: string){
	let size = pixelArray.length;
	let resultArray = new Array(size);
	for (let i: number = 0; i < size; i++)
		resultArray[i] = size;
	return resultArray;
}

export class OneUnit{
	rowNumber: number;
	columnNumber: number;
	originArray: string;
	resultArray: number[];
	length: number;
	countOnes: number;
	NbToTransform: number;
	positionOf1s: number[][];

	constructor(a: string[], index: number){
		this.rowNumber = getRowColumn(a[index]).Row;
		this.columnNumber = getRowColumn(a[index]).Column;
		this.originArray = getOriginArray(a, index + 1, this.rowNumber);
		this.length = this.originArray.length;
		this.countOnes = count_1s(this.originArray);
		this.NbToTransform = this.length - this.countOnes;
		this.resultArray = create_resultArray(this.originArray);
		this.positionOf1s = new Array(this.countOnes).fill(0).map(() => new Array(2).fill(0));
	}

	update_postingOf1s(): void{
		let j: number = 0;
		for(let i: number = 0; i < this.length; i++)
		{
			if(this.originArray[i] == '1')
			{
				this.positionOf1s[j][0] = getCoordinates(i,this.columnNumber).x;
				this.positionOf1s[j][1] = getCoordinates(i,this.columnNumber).y;
				j++;
			}
		}
	}

	print_result(): void{
		let i: number;
		let j: number;
		for (i = 0; i < this.rowNumber; i++)
	{
		let line = "";
		for (j = 0; j < this.columnNumber; j++)
		{
			line += this.resultArray[i * this.columnNumber + j];
			if (j != (this.columnNumber - 1))
				line += " ";
		}
		console.log(line);
	}
	}
}

export function getTestCases(line0: string)
{
	return +line0;
}
