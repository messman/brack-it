import counterActions from "./counter";


type CounterActionsType = typeof counterActions[keyof typeof counterActions];



export type ActionTypes = CounterActionsType;

export const actions = {
	counter: {
		...counterActions
	}
};