
interface Action<T, P> {
	type: T;
	payload: P;
	(payload: P): Action<T, P>
}

function CreateAction<T, P>(type: T): Action<T, P> {
	const f: any = function (payload) { return { type, payload } };
	f.type = type;
	const g: Action<T, P> = f;
	return g;
}

export function returntypeof<RT>(expression: (...params: any[]) => RT): RT {
	return {} as RT;
}

interface IncreaseCounterPayload {
	amount: number
}
interface DecreaseCounterPayload {
	amount: number
}

export const Actions = {
	increment: CreateAction<"INCREASE", IncreaseCounterPayload>("INCREASE"),
	decrement: CreateAction<"DECREASE", DecreaseCounterPayload>("DECREASE"),
}

type ActionType = (typeof Actions[keyof typeof Actions]);


export interface State {
	counter: IncreaseCounterPayload,
}

const defaultState = {
	counter: { amount: 5 },
}

export function reducer(state: State = defaultState, action: ActionType): State {
	console.log("reduce");
	if (action.type === Actions.increment.type) {
		return {
			...state, counter: {
				amount: state.counter.amount + action.payload.amount
			}
		}
	}
	else if (action.type === Actions.decrement.type) {
		return {
			...state, counter: {
				amount: state.counter.amount - action.payload.amount
			}
		}
	}
	return state;
}