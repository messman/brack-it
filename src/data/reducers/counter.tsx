import actions, { ActionTypes } from "../actions";

export type CounterState = {
	value: number;
}

const defaultState: CounterState = {
	value: 0
}

export function counterReducer(state: CounterState = defaultState, action: ActionTypes): CounterState {
	if (action.type === actions.counter.increment.type) {
		return {
			value: state.value + action.payload.amount
		};
	}
	else if (action.type === actions.counter.decrement.type) {
		return {
			value: state.value - action.payload.amount
		};
	}
	return state;
}