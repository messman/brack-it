import bracketActions from "./bracket";
export * from "./bracket";
import orderActions from "./order";
export * from "./order";
import playerActions from "./players";
export * from "./players";

type BracketActionsType = typeof bracketActions[keyof typeof bracketActions];
type OrderActionsType = typeof orderActions[keyof typeof orderActions];
type PlayerActionsType = typeof playerActions[keyof typeof playerActions];

export type ActionTypes = BracketActionsType | OrderActionsType | PlayerActionsType;

export const actions = {
	bracket: {
		...bracketActions
	},
	appOrder: {
		...orderActions
	},
	players: {
		...playerActions
	}
};