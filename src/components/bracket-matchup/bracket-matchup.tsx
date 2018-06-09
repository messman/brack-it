import * as React from "react";

import { Player, Matchup, Flags, FlagUtils } from "../../data";

import "./bracket-matchup.scss";

export interface BracketMatchupData {
	playerIndex: number
	player: Player,
	precedingMatchup: Matchup,
	precedingMatchupIndexInRound: number
	precedingMatchupIndexOverall: number
	onWin: () => void;
}

interface BracketMatchupOwnProps {
	roundIndex: number,
	overallIndex: number,
	winner: Player,
	matchup: Matchup,
	data: BracketMatchupData[],
	onHighlight: () => void
}

export default class BracketMatchup extends React.Component<BracketMatchupOwnProps> {

	static classes = {
		state: {
			completed: "matchup-completed",
			highlighted: "matchup-highlighted"
		},
		ui: {
			header: "matchup-header",
			body: "matchup-body",
		},
		entry: {
			base: "matchup-entry grid",
			ui: {
				data: {
					base: "entry-data gL-flexed",
					player: "text-player",
					extra: "text-extra"
				},
				action: {
					base: "entry-action grid gL-stretch",
					win: "action-win"
				}
			},
			state: {
				winner: "matchup-winner",
				regular: "matchup-player-regular",
				opener: "matchup-player-opener",
				tbd: "matchup-player-tbd",
				highlighted: "matchup-player-highlighted",
				eliminatedFuture: "matchup-player-eliminated-future",
				eliminatedNow: "matchup-player-eliminated-now"
			}
		}
	};

	constructor(props: BracketMatchupOwnProps) {
		super(props);
	}

	render() {
		const { overallIndex, winner, data, matchup } = this.props;

		const classes = BracketMatchup.classes;
		const topClasses = ["react-bracket-matchup"];

		if (FlagUtils.has(matchup.flags, Flags.highlight))
			topClasses.push(classes.state.highlighted);

		// Re-arrange the list so the winner is always at the top.
		const winnerReactId = winner ? winner.reactId : -1;
		if (winnerReactId !== -1) {
			topClasses.push(classes.state.completed);
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
				if (FlagUtils.has(entry.player.flags, Flags.highlight))
					entryClasses.push(classes.entry.state.highlighted);

				playerText = entry.player.name;
				if (entry.precedingMatchupIndexOverall !== -1) {
					entryClasses.push(classes.entry.state.regular);
					extraText = "from match " + (entry.precedingMatchupIndexOverall + 1)
				}
				else {
					entryClasses.push(classes.entry.state.opener);
					extraText = "opening match";
				}
			}
			else if (entry.precedingMatchupIndexOverall !== -1) {
				entryClasses.push(classes.entry.state.tbd);
				playerText = "Winner of match " + (entry.precedingMatchupIndexOverall + 1);
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
				</div>
			);
		});

		return (
			<div className={topClasses.join(" ")}>
				<div className={classes.ui.header} onClick={this.props.onHighlight}>
					<span>Match {overallIndex + 1}</span>
				</div>
				<div className={classes.ui.body}>
					{matchPlayers}
				</div>
			</div>
		);
	}
}