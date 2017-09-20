import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import BracketMatchup, { BracketMatchupData } from "../bracket-matchup/bracket-matchup";
import { Zoomable } from "../";

import { State, actions, wrapStore, wrapDispatcher, getCompositeType } from "../../data";
import { Player, Matchup, MatchupActionCreateArgs } from "../../data";

import "./bracket.scss";

// Get the combined type of our state and actions
function mapStateToProps(state: State) {
	return wrapStore({
		players: state.players,
		bracket: state.bracket
	});
}
function mapDispatchToProps(dispatch: ReactRedux.Dispatch<any>) {
	return wrapDispatcher(Redux.bindActionCreators(actions.bracket, dispatch));
}
const combined = getCompositeType(mapStateToProps, mapDispatchToProps);
type BracketProps = typeof combined;

class Bracket extends React.Component<BracketProps> {

	constructor(props: BracketProps) {
		super(props);
	}

	// When mounting, create the matchups if they haven't been created
	componentWillMount() {
		if (!this.props.store.bracket.matchups.length) {
			this.props.dispatcher.create({
				players: this.props.store.players
			});
		}
	}

	// Return the bound function to execute to update the matchup winner.
	createWinnerFunc(roundIndex: number, matchupIndex: number, playerIndex: number) {
		return this.props.dispatcher.markWinner.bind(this, {
			roundIndex,
			matchupIndex,
			playerIndex
		});
	}

	// Create the elements for a single round by using the previous round matchps and the player list.
	renderRound(round: Matchup[], lastRound: Matchup[], players: Player[], roundIndex: number, overallIndex: number): JSX.Element {
		const matchups: JSX.Element[] = [];
		for (let i = 0; i < round.length; i++) {

			const matchup = round[i];
			// Only show the winner buttons if there is no winner and each preceding matchup has a winner
			const canPlay = matchup.winner === -1 && matchup.preceding.every(function (lastRoundIndex) {
				const lastRoundMatchup = lastRound[lastRoundIndex];
				return lastRoundMatchup.winner !== -1;
			});
			// Map the preceding matches to a winner if possible, otherwise track the index
			const precedingMatchPlayers = matchup.preceding.map<BracketMatchupData>((lastRoundIndex) => {
				const lastRoundMatchup = lastRound[lastRoundIndex];
				return {
					player: lastRoundMatchup.winner !== -1 ? players[lastRoundMatchup.winner] : null,
					precedingMatchIndex: ((overallIndex - lastRound.length) + lastRoundIndex),
					onWin: canPlay ? this.createWinnerFunc(roundIndex, i, lastRoundMatchup.winner) : null
				}
			});
			// Map each first time player
			const firstTimePlayers = matchup.players.map<BracketMatchupData>((playerIndex) => {
				return {
					player: players[playerIndex],
					precedingMatchIndex: -1,
					onWin: canPlay ? this.createWinnerFunc(roundIndex, i, playerIndex) : null
				}
			});

			const data: BracketMatchupData[] = [...firstTimePlayers, ...precedingMatchPlayers];
			const winner = matchup.winner !== -1 ? players[matchup.winner] : null;
			const matchupElement: JSX.Element = <BracketMatchup key={matchup.reactId} roundIndex={roundIndex} overallIndex={overallIndex + i} winner={winner} data={data} />;
			matchups.push(matchupElement);
		}
		return (
			<div key={roundIndex} style={{ width: "100%" }}>
				<h2>Round {roundIndex + 1}</h2>
				{matchups}
			</div>
		);
	}

	renderBracket(): JSX.Element {
		const players = this.props.store.players;
		const matchups = this.props.store.bracket.matchups;

		let overallIndex = 0;
		let lastRound: Matchup[] = null;

		const elements: JSX.Element[] = [];
		for (let i = 0; i < matchups.length; i++) {
			const round = matchups[i];
			elements.push(this.renderRound(round, lastRound, players, i, overallIndex));
			overallIndex += round.length;
			lastRound = round;
		}
		return <div className="grid gL-flex-children" style={{ width: (elements.length * 100) + "%" }}>{elements}</div>;
	}

	render() {
		const bracket = this.renderBracket();
		return (
			<div className="react-bracket">
				<p>Here's a bracket for {this.props.store.players.length} players:</p>
				<Zoomable min={.5} max={1.5} zoomChange={.1} >
					{bracket}
				</Zoomable>
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Bracket);