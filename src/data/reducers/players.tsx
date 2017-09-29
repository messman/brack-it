import { actions, ActionTypes } from "../actions";
import { Player, PlayerManifest, createPlayer } from "../actions/players";
import { Flags, FlagUtils } from "../";

export type PlayersState = PlayerManifest;

// Our default state for now is the players from CBS' Big Brother 19 (big fan).
const defaultState: PlayersState = {
	players: [
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
	].map<Player>((name) => createPlayer(name)),
};

/** Makes sure the flag is applied only at the provided indices. */
function updateFlags(allPlayers: Player[], flags: Flags, indices: number[]): Player[] {
	for (var i = 0; i < allPlayers.length; i++) {
		allPlayers[i].flags = FlagUtils.toggle(allPlayers[i].flags, flags, false);
	}
	for (var i = 0; i < indices.length; i++) {
		allPlayers[indices[i]].flags = FlagUtils.toggle(allPlayers[indices[i]].flags, flags, true);
	}
	return [...allPlayers];
}

export function playersReducer(state: PlayersState = defaultState, action: ActionTypes): PlayersState {
	if (action.type === actions.players.create.type) {
		// Add the player to the end of the players array.
		return {
			players: [...state.players, action.payload],
		};
	}
	else if (action.type === actions.players.delete.type) {
		// Remove the player, then return a new array.
		state.players.splice(action.payload, 1);
		return {
			players: [...state.players],
		}
	}
	else if (action.type === actions.players.updateName.type) {
		// Just update the name property.
		state.players[action.payload.index].name = action.payload.name;
	}
	else if (action.type === actions.players.updateMatch.type) {
		state.players[action.payload.player].matchup = action.payload.nextMatchup;
	}
	else if (action.type === actions.players.updateFlags.type) {
		return {
			players: updateFlags(state.players, action.payload.flags, action.payload.players),
		}
	}
	return state;
}