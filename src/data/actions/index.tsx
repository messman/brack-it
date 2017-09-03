import orderActions from "./order";
export * from "./order";
import playerActions from "./players";
export * from "./players";

type OrderActionsType = typeof orderActions[keyof typeof orderActions];
type PlayerActionsType = typeof playerActions[keyof typeof playerActions];

export type ActionTypes = OrderActionsType | PlayerActionsType;

export const actions = {
	appOrder: {
		...orderActions,
	},
	players: {
		...playerActions
	}
};