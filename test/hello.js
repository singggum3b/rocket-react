// @flow

interface Dumb {
	x : number;
}

function sum(a: Dumb, b: number): number {
	return "sdfsdf";
}

sum({ x: "Fbfg" }, 2); // <= typo
