import { CounterState } from "./reducers/counter";
import { PlayersState } from "./reducers/players";

export default interface State {
	counter: CounterState,
	players: PlayersState
}