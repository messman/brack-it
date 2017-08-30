type Action<T, P> = {
	type: T;
	payload: P;
	(payload: P): Action<T, P>
}

type ActionProcess<T, P, M> = {
	type: T;
	payload: P;
	(input: M): Action<T, P>
}

export function CreateAction<T, P>(type: T): Action<T, P> {
	const f: any = function (payload) { return { type, payload } };
	f.type = type;
	const g: Action<T, P> = f;
	return g;
}

export function CreateActionProcess<T, P, M>(type: T, processor: (input: M) => P): ActionProcess<T, P, M> {
	const f: any = function (input) { return { type, payload: processor(input) } };
	f.type = type;
	const g: ActionProcess<T, P, M> = f;
	return g;
}

export function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
	return {} as RT;
}

export function wrapDispatcher<T>(arg: T) {
	return {
		dispatcher: arg
	}
}

export function wrapStore<T>(arg: T) {
	return {
		store: arg
	}
}