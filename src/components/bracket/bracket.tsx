import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import BracketMatchup, { BracketMatchupData } from "../bracket-matchup/bracket-matchup";

import { State, actions, wrapStore, wrapDispatcher, getCompositeType } from "../../data";
import { Player, Matchup, MatchupActionCreateArgs } from "../../data";

import "./bracket.scss";

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

	componentWillMount() {
		if (!this.props.store.bracket.matchups.length) {
			this.props.dispatcher.create({
				players: this.props.store.players
			});
		}
	}

	renderRound(round: Matchup[], lastRound: Matchup[], players: Player[], roundIndex: number, overallIndex: number): JSX.Element {
		const matchups: JSX.Element[] = [];
		for (let i = 0; i < round.length; i++) {

			const matchup = round[i];
			const precedingMatchPlayers = matchup.preceding.map<string>(function (lastRoundIndex) {
				const lastRoundMatchup = lastRound[lastRoundIndex];
				if (lastRoundMatchup.winner !== -1)
					return players[lastRoundMatchup.winner].name;
				return "Winner of match " + ((overallIndex - lastRound.length) + lastRoundIndex + 1);
			});
			const firstTimePlayers = matchup.players.map<string>(function (playerIndex) {
				return players[playerIndex].name;
			});
			const winner = matchup.winner !== -1 ? players[matchup.winner].name : "Not Yet Complete";

			const data: BracketMatchupData = {
				winner,
				players: [...firstTimePlayers, ...precedingMatchPlayers],
				overallIndex: overallIndex + i,
				roundIndex
			};
			const matchupElement: JSX.Element = <BracketMatchup key={matchup.reactId} data={data} />;
			matchups.push(matchupElement);

		}
		return (
			<div key={roundIndex}>
				<h2>Round {roundIndex + 1}</h2>
				{matchups}
			</div>
		);
	}

	renderBracket(): JSX.Element[] {
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
		return elements;
	}

	render() {
		console.log(this.props.store.bracket.matchups)
		const bracket = this.renderBracket();
		return (
			<div className="react-bracket">
				<p>Here's a bracket for {this.props.store.players.length} players:</p>
				{bracket}
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Bracket);