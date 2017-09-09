// Import the actions, and export the data types.
import bracketActions from "./bracket";
export * from "./bracket";
import orderActions from "./order";
export * from "./order";
import playerActions from "./players";
export * from "./players";

// Combine all the action types into one easy-to-reference type.
type BracketActionsType = typeof bracketActions[keyof typeof bracketActions];
type OrderActionsType = typeof orderActions[keyof typeof orderActions];
type PlayerActionsType = typeof playerActions[keyof typeof playerActions];

/** All the action types for the application. */
export type ActionTypes = BracketActionsType | OrderActionsType | PlayerActionsType;

// Export all the actions with a namespace.
/** All the actions for the application. */
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