import { combineReducers } from "redux";

import { AppOrderState, appOrderReducer } from "./order";
import { PlayersState, playersReducer } from "./players";
import { BracketState, bracketReducer } from "./bracket";

export interface State {
	appOrder: AppOrderState,
	players: PlayersState,
	bracket: BracketState
}

export const reducers = combineReducers<State>({
	appOrder: appOrderReducer,
	players: playersReducer,
	bracket: bracketReducer
});