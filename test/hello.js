// @flow

const str:number = "hello world!";
console.log(str);

function sum(a: number, b: number): number {
	return a + b;
}

sum(1, "a"); // <= typo
