import * as React from "react";

import { Player, Matchup } from "../../data";

import "./bracket-matchup.scss";

export interface BracketMatchupData {
	player: Player,
	precedingMatchIndex: number
}

interface BracketMatchupOwnProps {
	roundIndex: number,
	overallIndex: number,
	winner: Player,
	data: BracketMatchupData[]
}

export default class BracketMatchup extends React.Component<BracketMatchupOwnProps> {

	static classes = {
		entry: {
			base: "matchup-entry",
			winner: "matchup-winner",
			regular: "matchup-player-regular",
			opener: "matchup-player-opener",
			tbd: "matchup-player-tbd"
		}
	}

	constructor(props: BracketMatchupOwnProps) {
		super(props);
	}

	render() {
		const { overallIndex, winner, data } = this.props;

		const winnerReactId = winner ? winner.reactId : -1;
		if (winnerReactId !== -1) {
			for (var i = 1; i < data.length; i++) {
				const entry = data[i];
				if (entry.player && entry.player.reactId === winnerReactId) {
					const first = data[0];
					data[0] = entry;
					data[i] = first;
					break;
				}
			}
		}

		const matchPlayers = data.map<JSX.Element>((entry: BracketMatchupData, index) => {
			const entryClasses = ["matchup-entry"];
			if (winnerReactId !== -1 && index === 0)
				entryClasses.push("matchup-winner");

			let playerText = "TBD";
			let extraText: string = null;
			if (entry.player) {
				playerText = entry.player.name;
				if (entry.precedingMatchIndex !== -1) {
					entryClasses.push("matchup-player-regular");
					extraText = "from match " + (entry.precedingMatchIndex + 1)
				}
				else {
					entryClasses.push("matchup-player-opener");
					extraText = "opening match";
				}
			}
			else if (entry.precedingMatchIndex !== -1) {
				entryClasses.push("matchup-player-tbd");
				playerText = "Winner of match " + (entry.precedingMatchIndex + 1);
			}

			const className = entryClasses.join(" ");

			return (
				<div key={index} className={className}>
					<span className="text-player">{playerText}</span>
					<span className="text-extra">{extraText}</span>
				</div>
			);
		});

		return (
			<div className="react-bracket-matchup">
				<div className="matchup-header">
					<span>Match {overallIndex + 1}</span>
				</div>
				<div className="matchup-body">
					{matchPlayers}
				</div>
			</div>
		);
	}
}