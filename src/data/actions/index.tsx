import counterActions from "./counter";
export * from "./counter";
import playerActions from "./players";
export * from "./players";

type CounterActionsType = typeof counterActions[keyof typeof counterActions];
type PlayerActionsType = typeof playerActions[keyof typeof playerActions];

export type ActionTypes = CounterActionsType | PlayerActionsType;

export default {
	counter: {
		...counterActions,
	},
	players: {
		...playerActions
	}
};