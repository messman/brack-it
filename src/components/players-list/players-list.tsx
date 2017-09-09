import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import { State, actions, wrapStore, wrapDispatcher, getCompositeType } from "../../data";
import { PlayersListItem } from "../";

import "./players-list.scss";

interface PlayersListOwnProps {
	onGo: () => void;
}

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
type PlayersListProps = typeof combined & PlayersListOwnProps;

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
			// Reset the input
			this.setState({
				newPlayerText: ""
			});
		}
	}

	private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		let text = (e.target as HTMLInputElement).value;
		let addedAny = false;
		if (text) {
			// Check that lots of text wasn't just pasted in with newlines and tabs.
			const split = text.split(/\n|\t/);
			if (split.length > 2) {
				// If so, add a player for each separate string.
				split
					.map((str) => { return str.trim(); })
					.filter((str) => { return !!str && str.length > 1 })
					.forEach((str) => {
						addedAny = true;
						this.props.dispatcher.create(str);
					});
			}
		}
		// At the end, reset if we added anything.
		text = addedAny ? "" : text;
		this.setState({
			newPlayerText: text
		});
	}

	private handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// On enter, create.
		if (e.key === "Enter") {
			this.addPlayer();
		}
	}

	private updateName(index: number, name: string): void {
		this.props.dispatcher.updateName({ index, name });
	}

	render() {

		// If we have enough players, allow us to begin
		let goButton: JSX.Element = null;
		if (this.props.store.length > 1) {
			goButton = <button onClick={this.props.onGo} className="list-go-button">Start with <strong>{this.props.store.length}</strong> players</button>
		}

		return (
			<div className="react-players-list">
				<div>
					<p>Hit enter after each entry, or paste in multiple names (one on each line).</p>
					<input placeholder="Type a new player name" value={this.state.newPlayerText} onChange={this.handleChange} onKeyDown={this.handleKey} />
				</div>
				<ul>
					{this.props.store.map((player, index) => {
						const updateName: (name: string) => void = this.updateName.bind(this, index);
						const deletePlayer: () => void = this.props.dispatcher.delete.bind(this, index);
						return (
							<PlayersListItem key={player.reactId} index={index} player={player} onUpdateName={updateName} onDelete={deletePlayer} />
						)
					})}
				</ul>
				{goButton}
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PlayersList);