import actions, { ActionTypes } from "../actions";
import { Player } from "../actions/players";

export type PlayersState = Player[];

let id = 500;
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
].map((name) => { return { name, id: id++ } });

export function playersReducer(state: PlayersState = defaultState, action: ActionTypes): PlayersState {
	if (action.type === actions.players.create.type) {
		return [...state, action.payload];
	}
	else if (action.type === actions.players.delete.type) {
		return state.filter((player) => {
			return player.id !== action.payload;
		});
	}
	else if (action.type === actions.players.updateName.type) {
		state.some((player) => {
			if (player.id === action.payload.id) {
				player.name = action.payload.name
				return true;
			}
			return false;
		});
	}
	return state;
}