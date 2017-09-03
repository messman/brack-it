import { combineReducers } from "redux";

import { AppOrderState, appOrderReducer } from "./order";
import { PlayersState, playersReducer } from "./players";

export interface State {
	order: AppOrderState,
	players: PlayersState
}

export const reducers = combineReducers<State>({
	appOrder: appOrderReducer,
	players: playersReducer
});