import { CreateAction, CreateActionProcess } from "../types";
import { Player } from "../";
import { BracketCreator, BracketCreationOptions } from "../../services/bracket-maker";

/** Represents an entire bracket. */
export interface Bracket {
	matchups: Matchup[][]
}

/** Represents a single matchup of players, potentially preceded by other matchups. */
export interface Matchup {
	/** Players, by index, from the overall set of players. */
	players: number[],
	/** Preceding matchups, by index, from the set of the previous round matchups. */
	preceding: number[],
	/** The index of the winner player (or -1). */
	winner: number,
	/** A unique ID. */
	reactId: number
}

/** Used for creating a bracket from players with the specified or default options. */
export interface MatchupActionCreateArgs {
	/** The players to use for the bracket (may be shuffled) */
	players: Player[],
	/** Any options to layer over the defaults. */
	options?: BracketCreationOptions
}

/** Used to mark a matchup as complete. */
export interface MatchupActionMarkArgs {
	/** The index of the round of the matchup (first index of the 2D array). */
	roundIndex: number,
	/** The index of the matchup in the round (second index of the 2D array). */
	matchupIndex: number,
	/** The index of the winner relative to the overall player list. */
	playerIndex: number
}

const createBracket = function (args: MatchupActionCreateArgs): Bracket {
	return BracketCreator.createPlayersBracket(args.players, args.options);
}

export default {
	create: CreateActionProcess<"BRACKET_CREATE", Bracket, MatchupActionCreateArgs>("BRACKET_CREATE", createBracket),
	markWinner: CreateAction<"BRACKET_MARK_WINNER", MatchupActionMarkArgs>("BRACKET_MARK_WINNER")
}