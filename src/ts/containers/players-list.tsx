import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { State } from "../data/state";
import * as DataHelpers from "../data/types";
import { actions } from "../data/actions";
import { Player } from "../data/actions/players";

interface PlayersListOwnState {
	selected: number,
	newPlayerText: string
}

function mapStateToProps(state: State) {
	return DataHelpers.wrapStore(state.players);
}
function mapDispatchToProps(dispatch) {
	return DataHelpers.wrapDispatcher(Redux.bindActionCreators(actions.players, dispatch));
}
const combined = DataHelpers.getCompositeType(mapStateToProps, mapDispatchToProps);
type PlayersListProps = typeof combined;

class PlayersList extends React.Component<PlayersListProps, PlayersListOwnState> {

	constructor(props: PlayersListProps) {
		super(props);
		this.state = {
			selected: -1,
			newPlayerText: ""
		};
	}

	private input: JSX.Element = null;

	private addPlayer = () => {
		const value = this.state.newPlayerText;
		this.props.dispatcher.create(value);
	}

	private handleChange = (e) => {
		this.setState({
			newPlayerText: e.target.value
		});
	}

	private deletePlayer(playerId: number) {
		this.props.dispatcher.delete(playerId);
	}

	render() {
		return (
			<div>
				<div>
					<label>Add a player<input value={this.state.newPlayerText} onChange={this.handleChange} /></label>
					<button onClick={this.addPlayer} >Add</button>
				</div>
				<ul>
					{this.props.store.map((player) => {
						return <li key={player.id} onClick={this.deletePlayer.bind(this, player.id)} >{player.name}</li>
					})}
				</ul>
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayersList);