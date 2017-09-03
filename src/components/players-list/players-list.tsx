import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import { State, actions, wrapStore, wrapDispatcher, getCompositeType } from "../../data";
import { PlayersListItem } from "../";

import "./players-list.scss";

interface PlayersListOwnState {
	selected: number,
	newPlayerText: string
}

function mapStateToProps(state: State) {
	return wrapStore(state.players);
}
function mapDispatchToProps(dispatch: ReactRedux.Dispatch<any>) {
	return wrapDispatcher(Redux.bindActionCreators(actions.players, dispatch));
}
const combined = getCompositeType(mapStateToProps, mapDispatchToProps);
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

		let goButton: JSX.Element = null;
		if (this.props.store.length > 1) {
			goButton = <button className="list-go-button">Start with <strong>{this.props.store.length}</strong> players</button>
		}

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
				{goButton}
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayersList);