import { CreateAction, CreateActionProcess } from "../types";

export interface Player {
	name: string,
	id: number
}

let playerId: number = 0;
const createPlayer = function (name: string): Player {
	return {
		name,
		id: playerId++
	}
}

export default {
	create: CreateActionProcess<"CREATE", Player, string>("CREATE", createPlayer),
	delete: CreateAction<"DELETE", number>("DELETE"),
	updateName: CreateAction<"UPDATE_NAME", Player>("UPDATE_NAME"),
}