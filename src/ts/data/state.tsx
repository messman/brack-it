import { CounterState } from "./reducers/counter";
import { PlayersState } from "./reducers/players";

export interface State {
	counter: CounterState,
	players: PlayersState
}