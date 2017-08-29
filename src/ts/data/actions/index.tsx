import counterActions from "./counter";
import playerActions from "./players";

type CounterActionsType = typeof counterActions[keyof typeof counterActions];
type PlayerActionsType = typeof playerActions[keyof typeof playerActions];

export type ActionTypes = CounterActionsType | PlayerActionsType;

export const actions = {
	counter: {
		...counterActions,
	},
	players: {
		...playerActions
	}
};