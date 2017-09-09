import { combineReducers } from "redux";

import { AppOrderState, appOrderReducer } from "./order";
import { PlayersState, playersReducer } from "./players";
import { BracketState, bracketReducer } from "./bracket";

/** The entire state of the application. */
export interface State {
	appOrder: AppOrderState,
	players: PlayersState,
	bracket: BracketState
}

/** All the reducers of the application. */
export const reducers = combineReducers<State>({
	appOrder: appOrderReducer,
	players: playersReducer,
	bracket: bracketReducer
});