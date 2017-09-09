import { actions, ActionTypes } from "../actions";
import { Player } from "../actions/players";

export type PlayersState = Player[];

// Our default state for now is the players from CBS' Big Brother 19 (big fan).
let reactId = 500;
const defaultState: PlayersState = [
	"Alex",
	"Cameron",
	"Christmas",
	"Cody",
	"Dominique",
	"Elena",
	"Jason",
	"Jessica",
	"Jillian",
	"Josh",
	"Kevin",
	"Mark",
	"Matt",
	"Megan",
	"Paul",
	"Ramses",
	"Raven"
].map((name) => { return { name, reactId: reactId++ } });

export function playersReducer(state: PlayersState = defaultState, action: ActionTypes): PlayersState {
	if (action.type === actions.players.create.type) {
		// Add the player to the end of the players array.
		return [...state, action.payload];
	}
	else if (action.type === actions.players.delete.type) {
		// Remove the player, then return a new array.
		state.splice(action.payload, 1);
		return [...state];
	}
	else if (action.type === actions.players.updateName.type) {
		// Just update the name property.
		state[action.payload.index].name = action.payload.name;
	}
	return state;
}