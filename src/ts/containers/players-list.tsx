import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { State } from "../data/state";
import * as DataHelpers from "../data/types";
import { actions } from "../data/actions";

interface PlayersListOwnState {
	selected: number
}

function mapStateToProps(state: State) {
	return DataHelpers.wrapStore(state.players);
}
function mapDispatchToProps(dispatch) {
	return DataHelpers.wrapDispatcher(Redux.bindActionCreators(actions.players, dispatch));
}
const a = DataHelpers.getReturnType(mapStateToProps);
const b = DataHelpers.getReturnType(mapDispatchToProps);
type PlayersListProps = typeof a & typeof b;

class PlayersList extends React.Component<PlayersListProps, PlayersListOwnState> {

	constructor(props: PlayersListProps) {
		super(props);
		this.state = {
			selected: -1
		};
	}

	render() {
		return (
			<div>
				<ul>
					{this.props.store.map((player) => {
						return <li key={player.id}>{player.name}</li>
					})}
				</ul>
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayersList);