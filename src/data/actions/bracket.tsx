import { CreateAction, CreateActionProcess } from "../types";
import { Player } from "../";
import { BracketCreator, BracketCreationOptions } from "../../services/bracket-maker";

export interface Bracket {
	matchups: Matchup[][]
}

export interface Matchup {
	players: number[],
	preceding: number[],
	winner: number,
	reactId: number
}

export interface MatchupActionCreateArgs {
	players: Player[],
	options?: BracketCreationOptions
}

const createBracket = function (args: MatchupActionCreateArgs): Bracket {
	return BracketCreator.createPlayersBracket(args.players, args.options);
}

export default {
	create: CreateActionProcess<"BRACKET_CREATE", Bracket, MatchupActionCreateArgs>("BRACKET_CREATE", createBracket),
}