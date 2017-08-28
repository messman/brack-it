import { CreateAction } from "../types";

interface IncreaseCounterPayload {
	amount: number
}
interface DecreaseCounterPayload {
	amount: number
}

export default {
	increment: CreateAction<"INCREASE", IncreaseCounterPayload>("INCREASE"),
	decrement: CreateAction<"DECREASE", DecreaseCounterPayload>("DECREASE"),
}