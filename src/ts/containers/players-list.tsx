import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { State } from "../data/state";
import * as DataHelpers from "../data/types";
import { actions } from "../data/actions";
import { Player } from "../data/actions/players";

import "../../sass/containers/players-list.scss";

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
		if (value)
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
			<div className="react-players-list">
				<div>
					<input placeholder="Type a new player name" value={this.state.newPlayerText} onChange={this.handleChange} />
					<button onClick={this.addPlayer} disabled={!this.state.newPlayerText}>Add New Player</button>
				</div>
				<ul>
					{this.props.store.map((player, index) => {
						return (
							<li key={player.id} >
								<span className="list-index">{index}</span>
								<span>{player.name}</span>
								<button onClick={this.deletePlayer.bind(this, player.id)}>Remove</button>
							</li>
						)
					})}
				</ul>
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayersList);