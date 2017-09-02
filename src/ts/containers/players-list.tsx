import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { State } from "../data/state";
import * as DataHelpers from "../data/types";
import { actions } from "../data/actions";
import { Player } from "../data/actions/players";
import { PlayersListItem } from "../components/players-list-item";

import "sass/containers/players-list.scss";

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

	private addPlayer() {
		const value = this.state.newPlayerText;
		if (value) {
			this.props.dispatcher.create(value);
			this.setState({
				newPlayerText: ""
			});
		}
	}

	private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		let text = (e.target as HTMLInputElement).value;
		let addedAny = false;
		if (text) {
			const split = text.split(/\n|\t/);
			if (split.length > 2) {
				split
					.map((str) => { return str.trim(); })
					.filter((str) => { return !!str && str.length > 1 })
					.forEach((str) => {
						addedAny = true;
						this.props.dispatcher.create(str);
					});
			}
		}
		text = addedAny ? "" : text;
		this.setState({
			newPlayerText: text
		});
	}

	private handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			this.addPlayer();
		}
	}

	private updateName(id: number, name: string): void {
		this.props.dispatcher.updateName({
			id,
			name
		});
	}

	render() {
		return (
			<div className="react-players-list">
				<div>
					<p>Hit enter after each entry, or paste in multiple names (one on each line).</p>
					<input placeholder="Type a new player name" value={this.state.newPlayerText} onChange={this.handleChange} onKeyDown={this.handleKey} />
				</div>
				<ul>
					{this.props.store.map((player, index) => {
						const updateName: (name: string) => void = this.updateName.bind(this, player.id);
						const deletePlayer: () => void = this.props.dispatcher.delete.bind(this, player.id);
						return (
							<PlayersListItem key={player.id} index={index} player={player} onUpdateName={updateName} onDelete={deletePlayer} />
						)
					})}
				</ul>
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayersList);