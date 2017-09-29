import { actions, ActionTypes, Bracket, UpdateBracketFlagsArgs, Matchup, MatchupLocation } from "../actions";
import { Flags, FlagUtils } from "../";

export type BracketState = Bracket;

const defaultState: BracketState = {
	matchups: [],
}

/** Unsets the flags from all matchups and applies only to the provided matchups. */
function updateFlags(matchups: Matchup[][], flag: Flags, locations: MatchupLocation[]): Matchup[][] {
	for (var i = 0; i < matchups.length; i++) {
		const round = matchups[i];
		for (var j = 0; j < round.length; j++) {
			round[j].flags = FlagUtils.toggle(round[j].flags, flag, false);
		}
	}
	for (var i = 0; i < locations.length; i++) {
		const location = locations[i];
		const matchup = matchups[location.roundIndex][location.matchupIndex];
		matchup.flags = FlagUtils.toggle(matchup.flags, flag, true);
	}

	return [...matchups];
}

export function bracketReducer(state: BracketState = defaultState, action: ActionTypes): BracketState {
	if (action.type === actions.bracket.create.type) {
		// On create, the bracket becomes the entire bracket payload.
		return action.payload;
	}
	else if (action.type === actions.bracket.markWinner.type) {
		// When marking a winner, just update the winner index for that matchup.
		const matchupRound = state.matchups[action.payload.roundIndex];
		const matchup = matchupRound[action.payload.matchupIndex];
		matchup.winner = action.payload.playerIndex;
		return {
			matchups: [...state.matchups],
		}
	}
	else if (action.type === actions.bracket.updateFlags.type) {
		return {
			matchups: updateFlags(state.matchups, action.payload.flags, action.payload.locations),
		}
	}
	return state;
}
