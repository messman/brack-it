import { actions, ActionTypes, AppOrder } from "../actions";

export type AppOrderState = {
	order: AppOrder;
}

const defaultState: AppOrderState = {
	order: AppOrder.create
}

export function appOrderReducer(state: AppOrderState = defaultState, action: ActionTypes): AppOrderState {
	if (action.type === actions.appOrder.move.type) {
		// When shifting views, just update the index.
		return {
			order: action.payload
		};
	}
	return state;
}