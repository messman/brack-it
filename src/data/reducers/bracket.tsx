import { actions, ActionTypes, Bracket } from "../actions";

export type BracketState = Bracket

const defaultState: BracketState = {
	matchups: []
}

export function bracketReducer(state: BracketState = defaultState, action: ActionTypes): BracketState {
	if (action.type === actions.bracket.create.type) {
		return action.payload
	}
	return state;
}
