declare module 'tcomb' {

	// runtime type introspection hack
	declare type $Reify<T> = TypeT<T>;

	// refinement hack
	declare type Predicate = (x: any) => boolean;

	declare interface $Refinement<P: Predicate> {}

	declare type IntegerT = number;

	declare type Props = {[key: string]: TypeT<*>};

	declare type MetaIrreducible = {
		kind: 'irreducible',
		name: ?string,
		identity: true,
		predicate: Predicate
	};

	declare type MetaRefinement = {
		kind: 'refinement',
		name: ?string,
		identity: boolean,
		type: TypeT<*>,
		predicate: Predicate
	};

	declare type MetaMaybe = {
		kind: 'maybe',
		name: ?string,
		identity: boolean,
		type: TypeT<*>
	};

	declare type MetaStruct = {
		kind: 'struct',
		name: ?string,
		identity: false,
		props: Props,
		strict: boolean,
		defaultProps: {[keys: string]: any}
	};

	declare type MetaInterface = {
		kind: 'interface',
		name: ?string,
		identity: boolean,
		props: Props,
		strict: boolean
	};

	declare type MetaFunc = {
		kind: 'func',
		name: ?string,
		identity: true,
		domain: Array<TypeT<*>>,
		codomain: TypeT<*>
	};

	declare type MetaTuple = {
		kind: 'tuple',
		name: ?string,
		identity: boolean,
		types: Array<TypeT<*>>
	};

	declare type MetaList = {
		kind: 'list',
		name: ?string,
		identity: boolean,
		type: TypeT<*>
	};

	declare type MetaDict = {
		kind: 'dict',
		name: ?string,
		identity: boolean,
		domain: TypeT<*>,
		codomain: TypeT<*>
	};

	declare type MetaEnums = {
		kind: 'enums',
		name: ?string,
		identity: true,
		map: {[key: string]: any}
	};

	declare type MetaUnion = {
		kind: 'union',
		name: ?string,
		identity: boolean,
		types: Array<TypeT<*>>
	};

	declare type MetaIntersection = {
		kind: 'intersection',
		name: ?string,
		identity: boolean,
		types: Array<TypeT<*>>
	};

	declare type Meta =
		MetaIrreducible
			| MetaRefinement
			| MetaMaybe
			| MetaStruct
			| MetaInterface
			| MetaFunc
			| MetaTuple
			| MetaList
			| MetaDict
			| MetaEnums
			| MetaUnion
			| MetaIntersection;

	declare interface TypeT<T> {
		(x: T): T;
		is(x: any): boolean;
		meta: Meta;
	}

	declare type OptionsStruct =
		string
			| { name?: string, strict?: boolean, defaultProps?: {[keys: string]: any} };

	declare type OptionsInterface =
		string
			| { name?: string, strict?: boolean };

	declare type Mixin = Struct<*> | Interface<*> | Props;

	declare type Command
		= CommandSet
		| CommandApply
		| CommandPush
		| CommandRemove
		| CommandSplice
		| CommandSwap
		| CommandUnshift
		| CommandMerge
		| OptionsUpdate;
	declare type CommandSet = { $set: any };
	declare type CommandApply = { $apply: Function; };
	declare type CommandPush = { $push: Array<any>; };
	declare type CommandRemove = { $remove: Array<string>; };
	declare type CommandSplice = { $splice: Array<Array<any>>; };
	declare type CommandSwap = { $swap: { from: number; to: number; }; };
	declare type CommandUnshift = { $unshift: Array<any>; };
	declare type CommandMerge = { $merge: Object; };
	declare type OptionsUpdate = {[key: string]: Command};

	declare interface Struct<T> extends TypeT<T> {
		new (x: T): T;
		(x: T): T;
		update(instance: T, options: OptionsUpdate): T;
		extend(mixins: Mixin | Array<Mixin>, options?: OptionsStruct): Struct<*>;
	}

	declare interface Interface<T> extends TypeT<T> {
		(x: T): T;
		update(instance: T, options: OptionsUpdate): T;
		extend(mixins: Mixin | Array<Mixin>, options?: OptionsInterface): Interface<*>;
	}

	declare interface Enums {
		(map: {[key: string]: any}, name?: string): TypeT<*>;
		of(enums: string | Array<string>): TypeT<*>;
	}

	declare interface Declare extends TypeT<*> {
		define(type: TypeT<*>): void;
	}

declare module.exports: {

	assert(guard: boolean, message?: string | () => string): void;
	fail(message?: string): void;
	stringify(x: any): string;
	update<T>(instance: T, options: OptionsUpdate): T;
	mixin<A: Object, B: Object>(target: A, source: B, unsafe?: boolean): A & B;
	isType(x: any): boolean;
	is(x: any, type: Function | TypeT<*>): boolean;
	getTypeName(type: Function | TypeT<*>): string;
	match(x: any, ...cases: Array<any>): any;

	// irreducibles
	Nil: TypeT<void | null>;
	String: TypeT<string>;
	Number: TypeT<number>;
	Integer: TypeT<number>;
	Boolean: TypeT<boolean>;
	Array: TypeT<Array<any>>;
	Object: TypeT<Object>;
	Function: TypeT<Function>;
	Error: TypeT<Error>;
	RegExp: TypeT<RegExp>;
	Date: TypeT<Date>;
	Any: TypeT<any>;
	Type: TypeT<TypeT<*>>;

	// combinators
	irreducible(name: string, predicate: Predicate): TypeT<*>;
	refinement<T>(type: TypeT<T>, predicate: Predicate, name?: string): TypeT<T>;
	enums: Enums;
	maybe<T>(type: TypeT<T>, name?: string): TypeT<T>;
	struct<P: {[key: string]: TypeT<*>}>(props: P, options?: OptionsStruct): Struct<{[key: $Keys<P>]: *}>;
	tuple(types: Array<TypeT<*>>, name?: string): TypeT<*>;
	list<T>(type: TypeT<T>, name?: string): TypeT<Array<T>>;
	dict(domain: TypeT<*>, codomain: TypeT<*>, name?: string): TypeT<*>;
	union(types: Array<TypeT<*>>, name?: string): TypeT<*>;
	intersection(types: Array<TypeT<*>>, name?: string): TypeT<*>;
interface<P: {[key: string]: TypeT<*>}>(props: P, options?: OptionsInterface): Interface<{[key: $Keys<P>]: *}>;
    declare(name: string): Declare;

  };
}

declare module 'tcomb/lib/fromJSON' {
declare module.exports: (value: any, type: Function) => any;
}

declare module 'tcomb/lib/isSubsetOf' {
declare module.exports: (a: Function, b: Function) => boolean;
}
