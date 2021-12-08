import {update_distance0} from './transform';
import {update_distance1} from './transform';
import {massConvert} from './transform2'
import {OneUnit} from './prep'
import {getTestCases} from './prep'

let answers: string[] = [];
let i: number = 0;
let count: number;
let rows: number;	

process.stdin.on('data', function(data){
	answers.push(data.toString().trim());
	if (i == 0 && isNumber(answers[i]) == false)
		errorMessage();
	if (i == 0)
		count = +(answers[0]);
	else if (i == 1 || answers[i - 1] == '')
	{
		rows = getRowNB(answers[i]);
		if (rows == -1)
			errorMessage();
		else
			count--;
	}
	else
	{
		if(checkOneZero(answers[i]) == false)
			errorMessage();
		rows--;
	}
	if (rows == 0 && count == 0)
	{
		let test_cases: number = getTestCases(answers[0]);
		if (test_cases > 1000)
			errorMessage();
		let i: number;
		let start: number = 1;
		/* this is to create class [OneUnit] to store the value of the input and form a initial result */
		for (i = 0; i < test_cases; i++)
		{
			let a = new OneUnit(answers, start);
			if (!checkInputQuality(a))
				errorMessage();
			let transformed: number = 0;
			update_distance0(a.resultArray, a.originArray);
			transformed = update_distance1(a.resultArray, a.originArray, a.rowNumber, a.columnNumber);
			a.update_postingOf1s();
			massConvert(a.NbToTransform - transformed, a);
			console.log('');
			a.print_result();
			start += a.rowNumber + 2;
		}
		process.exit();
	}
	i++;
})

function getRowNB(a: string): number
{
	let size: number = a.length;
	let temp = a;
	if (isNumber(temp.replace(' ','')))
	{
		for(let i = 0; i < size; i++)
		{
			if (a[i] == ' ')
				return +a.substr(0,i);
		}
		return -1;
	}
	else
		return -1;
}

function isNumber(a: string): boolean{
	let size: number = a.length;
	for (let i = 0; i < size; i++)
	{
		if (a[i] > '9' || a[i] < '0')
			return false;
	}
	return true;
}

function checkOneZero(a: string): boolean{
	let size: number = a.length;
	for (let i=0; i < size; i++)
	{
		if (a[i] != '1' && a[i] != '0')
			return false;
	}
	return true;
}

function errorMessage(): void{
	console.log('Error: input format error');
	process.exit();
}

//still need to check all the input lines following the given index for row and column
function checkInputQuality(a: OneUnit): boolean{
	if((a.rowNumber >= 1 && a.rowNumber <= 182)
	&&(a.columnNumber >= 1 && a.columnNumber <= 182)
	&&(a.countOnes > 0)
	&&(a.rowNumber * a.columnNumber == a.length))
		return true;
	else
		return false;
}