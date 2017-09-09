import { CreateAction, CreateActionProcess } from "../types";

/** Represents a single competitor in the bracket. */
export interface Player {
	name: string,
	reactId: number
}

let reactId: number = 0;
const createPlayer = function (name: string): Player {
	return {
		name,
		reactId: reactId++
	}
}

export interface UpdatePlayerNameArgs {
	index: number,
	name: string
}

export default {
	create: CreateActionProcess<"PLAYER_CREATE", Player, string>("PLAYER_CREATE", createPlayer),
	delete: CreateAction<"PLAYER_DELETE", number>("PLAYER_DELETE"),
	updateName: CreateAction<"PLAYER_UPDATE_NAME", UpdatePlayerNameArgs>("PLAYER_UPDATE_NAME"),
}