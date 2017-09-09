import * as React from "react";

import { Player, Matchup } from "../../data";

import "./bracket-matchup.scss";

export interface BracketMatchupData {
	player: Player,
	precedingMatchIndex: number
	onWin: () => void;
}

interface BracketMatchupOwnProps {
	roundIndex: number,
	overallIndex: number,
	winner: Player,
	data: BracketMatchupData[]
}

export default class BracketMatchup extends React.Component<BracketMatchupOwnProps> {

	static classes = {
		ui: {
			header: "matchup-header",
			body: "matchup-body"
		},
		entry: {
			base: "matchup-entry grid",
			ui: {
				data: {
					base: "entry-data L-filled",
					player: "text-player",
					extra: "text-extra"
				},
				action: {
					base: "entry-action grid L-stretch",
					win: "action-win"
				}
			},
			state: {
				winner: "matchup-winner",
				regular: "matchup-player-regular",
				opener: "matchup-player-opener",
				tbd: "matchup-player-tbd",
			}
		}
	};

	constructor(props: BracketMatchupOwnProps) {
		super(props);
	}

	render() {
		const { overallIndex, winner, data } = this.props;

		// Re-arrange the list so the winner is always at the top.
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

		const classes = BracketMatchup.classes;
		// Map each player to an entry element
		const matchPlayers = data.map<JSX.Element>((entry: BracketMatchupData, index) => {
			const entryClasses = [classes.entry.base];
			// Add the class for a winner
			if (winnerReactId !== -1 && index === 0)
				entryClasses.push(classes.entry.state.winner);

			let playerText = "TBD";
			let extraText: string = null;
			// Get the appropriate text based on the state
			if (entry.player) {
				playerText = entry.player.name;
				if (entry.precedingMatchIndex !== -1) {
					entryClasses.push(classes.entry.state.regular);
					extraText = "from match " + (entry.precedingMatchIndex + 1)
				}
				else {
					entryClasses.push(classes.entry.state.opener);
					extraText = "opening match";
				}
			}
			else if (entry.precedingMatchIndex !== -1) {
				entryClasses.push(classes.entry.state.tbd);
				playerText = "Winner of match " + (entry.precedingMatchIndex + 1);
			}

			const className = entryClasses.join(" ");
			// Add the button for selecting a winner if the function was provided
			let winnerButton = entry.onWin ? <button className={classes.entry.ui.action.win} onClick={entry.onWin}>Winner</button> : null;
			if (winnerButton) {
				winnerButton = <div className={classes.entry.ui.action.base}>{winnerButton}</div>
			}
			return (
				<div key={index} className={className}>
					<div className={classes.entry.ui.data.base}>
						<span className={classes.entry.ui.data.player}>{playerText}</span>
						<span className={classes.entry.ui.data.extra}>{extraText}</span>
					</div>
					{winnerButton}
				</div >
			);
		});

		return (
			<div className="react-bracket-matchup">
				<div className={classes.ui.header}>
					<span>Match {overallIndex + 1}</span>
				</div>
				<div className={classes.ui.body}>
					{matchPlayers}
				</div>
			</div>
		);
	}
}