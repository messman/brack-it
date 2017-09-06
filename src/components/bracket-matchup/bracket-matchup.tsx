import * as React from "react";

import { Player, Matchup } from "../../data";

import "./bracket-matchup.scss";

export interface BracketMatchupData {
	overallIndex: number,
	roundIndex: number,
	players: string[],
	winner: string
}

interface BracketMatchupOwnProps {
	data: BracketMatchupData
}

export default class BracketMatchup extends React.Component<BracketMatchupOwnProps> {

	constructor(props: BracketMatchupOwnProps) {
		super(props);
	}

	render() {
		const { overallIndex, players, winner } = this.props.data;

		const matchPlayers = players.map<JSX.Element>((player: string, index: number) => {
			return <p key={index}>{player}</p>;
		});

		return (
			<div className="react-bracket-matchup">
				<h3>Match {overallIndex + 1}: {winner}</h3>
				{matchPlayers}
			</div>
		);
	}
}