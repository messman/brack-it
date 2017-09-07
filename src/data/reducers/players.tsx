import { actions, ActionTypes } from "../actions";
import { Player } from "../actions/players";

export type PlayersState = Player[];

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
		return [...state, action.payload];
	}
	else if (action.type === actions.players.delete.type) {
		state.splice(action.payload, 1);
		return [...state];
	}
	else if (action.type === actions.players.updateName.type) {
		state[action.payload.index].name = action.payload.name;
	}
	return state;
}