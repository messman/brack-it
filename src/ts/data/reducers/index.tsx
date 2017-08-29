import { combineReducers } from "redux";

import { State } from "../state";
import { counterReducer } from "./counter";
import { playersReducer } from "./players";

export default combineReducers<State>({
	counter: counterReducer,
	players: playersReducer
});