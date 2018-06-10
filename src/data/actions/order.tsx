import { defineActionFactory } from "../types";

// Likely to change
/** The order of the app (as separate views). */
export enum AppOrder {
	create,
	show
}

export default {
	move: defineActionFactory<"APP_ORDER_MOVE", AppOrder>("APP_ORDER_MOVE"),
}