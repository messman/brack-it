import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import BracketMatchup, { BracketMatchupData } from "../bracket-matchup/bracket-matchup";
import { Zoomable } from "../";

import { State, actions, wrapStore, wrapDispatcher, getCompositeType } from "../../data";
import { Player, PlayerManifest, Matchup, MatchupActionCreateArgs, MatchupLocation, Flags } from "../../data";

import "./bracket.scss";

// Get the combined type of our state and actions
function mapStateToProps(state: State) {
	return wrapStore({
		players: state.players,
		bracket: state.bracket
	});
}
function mapDispatchToProps(dispatch: ReactRedux.Dispatch<any>) {
	return wrapDispatcher({
		players: Redux.bindActionCreators(actions.players, dispatch),
		bracket: Redux.bindActionCreators(actions.bracket, dispatch)
	});
}
const combined = getCompositeType(mapStateToProps, mapDispatchToProps);
type BracketProps = typeof combined;

interface BracketState {
	useZoomable: boolean;
}

class Bracket extends React.Component<BracketProps, BracketState> {

	constructor(props: BracketProps) {
		super(props);

		this.state = {
			useZoomable: true
		};
	}

	// When mounting, create the matchups if they haven't been created
	componentWillMount() {
		if (!this.props.store.bracket.matchups.length) {
			this.props.dispatcher.bracket.create({
				players: this.props.store.players.players
			});
		}
	}

	switchZoomable = () => {
		this.setState((prev) => {
			return {
				useZoomable: !prev.useZoomable
			}
		});
	}

	// Return the bound function to execute to update the matchup winner.
	createWinnerFunc(roundIndex: number, matchupIndex: number, winner: number, nextMatchup: number) {
		return () => {
			this.props.dispatcher.bracket.markWinner({
				roundIndex,
				matchupIndex,
				playerIndex: winner
			});
			this.props.dispatcher.players.updateMatch({
				player: winner,
				nextMatchup
			});
		};
	}

	// Return the bound function to execute to update the matchup winner.
	createHighlightFunc(locations: MatchupLocation[], players: number[]) {
		return () => {
			this.props.dispatcher.bracket.updateFlags({
				locations,
				flags: Flags.highlight
			});
			this.props.dispatcher.players.updateFlags({
				players,
				flags: Flags.highlight
			});
		};
	}

	updateMarked(players: number[]): void {
		this.props.dispatcher.players.updateMatch
	}

	// Create the elements for a single round by using the previous round matchps and the player list.
	renderRound(round: Matchup[], lastRound: Matchup[], playerManifest: PlayerManifest, roundIndex: number, overallIndex: number): JSX.Element {
		const matchups: JSX.Element[] = [];
		for (let i = 0; i < round.length; i++) {

			const matchup = round[i];
			// Only show the winner buttons if there is no winner and each preceding matchup has a winner
			const canPlay = matchup.winner === -1 && matchup.preceding.every(function (lastRoundMatchupIndex) {
				const lastRoundMatchup = lastRound[lastRoundMatchupIndex];
				return lastRoundMatchup.winner !== -1;
			});
			// Map the preceding matches to a winner if possible, otherwise track the index
			const precedingMatchPlayers = matchup.preceding.map<BracketMatchupData>((lastRoundMatchupIndex) => {
				const lastRoundMatchup = lastRound[lastRoundMatchupIndex];
				return {
					player: lastRoundMatchup.winner !== -1 ? playerManifest.players[lastRoundMatchup.winner] : null,
					precedingMatchIndex: ((overallIndex - lastRound.length) + lastRoundMatchupIndex),
					onWin: canPlay ? this.createWinnerFunc(roundIndex, i, lastRoundMatchup.winner, matchup.proceding) : null
				}
			});
			// Map each first time player
			const firstTimePlayers = matchup.players.map<BracketMatchupData>((playerIndex) => {
				return {
					player: playerManifest.players[playerIndex],
					precedingMatchIndex: -1,
					onWin: canPlay ? this.createWinnerFunc(roundIndex, i, playerIndex, matchup.proceding) : null
				}
			});

			const precedingLocations = matchup.preceding.map<MatchupLocation>(function (lastRoundMatchupIndex) {
				return {
					roundIndex: roundIndex - 1,
					matchupIndex: lastRoundMatchupIndex
				};
			})
			const onHighlight = this.createHighlightFunc(precedingLocations, matchup.players);

			const data: BracketMatchupData[] = [...firstTimePlayers, ...precedingMatchPlayers];
			const winner = matchup.winner !== -1 ? playerManifest.players[matchup.winner] : null;
			const matchupElement: JSX.Element = <BracketMatchup key={matchup.reactId} roundIndex={roundIndex} overallIndex={overallIndex + i} matchup={matchup} winner={winner} data={data} onHighlight={onHighlight} />;
			matchups.push(matchupElement);
		}
		return (
			<div key={roundIndex} style={{ width: "100%" }}>
				<h2>Round {roundIndex + 1}</h2>
				{matchups}
			</div>
		);
	}

	renderBracket(): JSX.Element[] {
		const playersState = this.props.store.players;
		const matchups = this.props.store.bracket.matchups;

		let overallIndex = 0;
		let lastRound: Matchup[] = null;

		const elements: JSX.Element[] = [];
		for (let i = 0; i < matchups.length; i++) {
			const round = matchups[i];
			elements.push(this.renderRound(round, lastRound, playersState, i, overallIndex));
			overallIndex += round.length;
			lastRound = round;
		}
		return elements;
	}

	render() {
		const bracket = this.renderBracket();

		const useZoomable = this.state.useZoomable;
		let zoomable: JSX.Element = null;
		let zoomableMessage = useZoomable ? "Switch to Vertical" : "Switch to Horizontal"
		if (useZoomable) {
			zoomable =
				(
					<Zoomable min={.5} max={1.5} zoomChange={.1}>
						{bracket}
					</Zoomable>
				)
		}

		return (
			<div className="react-bracket gL-flexed grid gL-column">
				<div>
					<p>Here's a bracket for {this.props.store.players.players.length} players.</p>
					<button onClick={this.switchZoomable}>{zoomableMessage}</button>
				</div>
				<div className="gL-flexed grid gL-column">
					{zoomable || bracket}
				</div>
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Bracket);