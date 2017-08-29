import { actions, ActionTypes } from "../actions";
import { Player } from "../actions/players";

export type PlayersState = Player[];

const defaultState: PlayersState = [
	{
		name: "John",
		id: 500
	},
	{
		name: "Ellie",
		id: 501
	}
]

export function playersReducer(state: PlayersState = defaultState, action: ActionTypes): PlayersState {
	if (action.type === actions.players.create.type) {
		return [...state, action.payload];
	}
	else if (action.type === actions.players.delete.type) {
		return state.filter((player) => {
			return player.id !== action.payload;
		});
	}
	return state;
}