import { CreateAction } from "../types";

export enum AppOrder {
	create,
	show
}

export default {
	move: CreateAction<"APP_ORDER_MOVE", AppOrder>("APP_ORDER_MOVE"),
}