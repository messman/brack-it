import { combineReducers } from "redux";

import { State } from "../state";
import { counterReducer } from "./counter";

export default combineReducers<State>({
	counter: counterReducer
});