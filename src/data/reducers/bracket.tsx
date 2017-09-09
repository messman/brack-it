import { actions, ActionTypes, Bracket } from "../actions";

export type BracketState = Bracket

const defaultState: BracketState = {
	matchups: []
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
			matchups: [...state.matchups]
		}
	}
	return state;
}
