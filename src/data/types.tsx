/** Represents an action with a type and a payload, meant to be consumed by a reducer. */
type Action<T, P> = {
	type: T;
	payload: P;
	(payload: P): Action<T, P>
}

/** Represents an action that takes a separate input and returns a regular Action. */
type ActionProcess<T, P, M> = {
	type: T;
	payload: P;
	(input: M): Action<T, P>
}

/** Creates an action of the given type that receives and returns a payload. */
export function CreateAction<T, P>(type: T): Action<T, P> {
	const f: any = function (payload: P) { return { type, payload } };
	f.type = type;
	const g: Action<T, P> = f;
	return g;
}

/** Creates an action that takes a special input that does not match its payload. */
export function CreateActionProcess<T, P, M>(type: T, processor: (input: M) => P): ActionProcess<T, P, M> {
	const f: any = function (input: M) { return { type, payload: processor(input) } };
	f.type = type;
	const g: ActionProcess<T, P, M> = f;
	return g;
}

/** Gets the return type of a function without exectuting it. */
export function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
	return {} as RT;
}

/** Gets the combination of the state and dispatcher return types without executing either function. */
export function getCompositeType<A, B, C>(mapState: (...args: any[]) => A, mapDispatch: (...args: any[]) => B, props?: C) {
	const a = getReturnType(mapState);
	const b = getReturnType(mapDispatch);
	type composite = typeof a & typeof b & typeof props;
	return {} as composite;
}

/** Wraps the dispatcher methods with a namespace. */
export function wrapDispatcher<T>(arg: T) {
	return {
		dispatcher: arg
	}
}

/** Wraps the store state with a namespace. */
export function wrapStore<T>(arg: T) {
	return {
		store: arg
	}
}