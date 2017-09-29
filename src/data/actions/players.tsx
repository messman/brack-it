import { CreateAction, CreateActionProcess } from "../types";
import { Flags } from "../";

export interface PlayerManifest {
	players: Player[],
}

/** Represents a single competitor in the bracket. */
export interface Player {
	name: string,
	matchup: number,
	flags: Flags
	reactId: number
}

let reactId: number = 0;
export const createPlayer = function (name: string): Player {
	return {
		name,
		matchup: -1,
		flags: 0,
		reactId: reactId++
	}
}

export interface UpdatePlayerNameArgs {
	index: number,
	name: string
}

export interface UpdateMatchArgs {
	player: number,
	nextMatchup: number
}

export interface UpdatePlayersFlagsArgs {
	players: number[],
	flags: Flags
}

export default {
	create: CreateActionProcess<"PLAYER_CREATE", Player, string>("PLAYER_CREATE", createPlayer),
	delete: CreateAction<"PLAYER_DELETE", number>("PLAYER_DELETE"),
	updateName: CreateAction<"PLAYER_UPDATE_NAME", UpdatePlayerNameArgs>("PLAYER_UPDATE_NAME"),
	updateMatch: CreateAction<"PLAYER_UPDATE_MATCH", UpdateMatchArgs>("PLAYER_UPDATE_MATCH"),
	updateFlags: CreateAction<"PLAYER_UPDATE_FLAGS", UpdatePlayersFlagsArgs>("PLAYER_UPDATE_FLAGS"),
}