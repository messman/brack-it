import * as React from "react";
import { actions, Player } from "../../data";

import "./players-list-item.scss";

interface PlayersListItemState {
	isEditing: boolean,
	playerName: string
}

interface PlayersListItemProps {
	index: number,
	player: Player,
	onUpdateName: (name: string) => void,
	onDelete: () => void
}

export default class PlayersListItem extends React.Component<PlayersListItemProps, PlayersListItemState> {

	constructor(props: PlayersListItemProps) {
		super(props);
		this.state = {
			isEditing: false,
			playerName: this.props.player.name
		};
	}

	private startEditing = () => {
		this.setState({
			isEditing: true
		});
	}

	private onEdit = (e: React.FormEvent<HTMLInputElement>) => {
		if (this.state.isEditing) {
			const text = (e.target as HTMLInputElement).value;
			this.setState({
				playerName: text
			});
		}
	}

	private onBlur = () => {
		if (this.state.isEditing) {
			this.setState({
				isEditing: false
			});
			const text = this.state.playerName.trim();
			if (text !== this.props.player.name) {
				this.props.onUpdateName(text);
			}
		}
	}

	private input: HTMLInputElement = null;
	componentDidUpdate() {
		if (this.state.isEditing && this.input) {
			this.input.focus();
			setTimeout(() => {
				if (this.input && document.activeElement === this.input) {
					// *2 in case "\n" is 2 characters
					const valLength = this.input.value.length * 2;
					this.input.setSelectionRange(valLength, valLength);
				}
			}, 10)
		}
	}

	render() {
		const { index, onDelete } = this.props;
		const { name } = this.props.player;

		let nameEl: JSX.Element = null;

		if (this.state.isEditing) {
			const setRef = (input: HTMLInputElement) => { this.input = input };
			nameEl = <input className="list-name list-input" ref={setRef} onBlur={this.onBlur} onChange={this.onEdit} value={this.state.playerName} />
		}
		else {
			nameEl = <span className="list-name" onClick={this.startEditing}>{name}</span>
		}

		return (
			<li className="list-item">
				<span className="list-index">{index}</span>
				{nameEl}
				<button className="list-delete" onClick={onDelete}>X</button>
			</li>
		);
	}
}