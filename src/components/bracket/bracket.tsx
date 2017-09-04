import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import { State, actions, wrapStore, wrapDispatcher, getReturnType } from "../../data";

import { Matchup, BracketCreator } from "../../services/bracket-maker";

import "./bracket.scss";

function mapStateToProps(state: State) {
	return wrapStore(state.players);
}
const combined = getReturnType(mapStateToProps);
type BracketProps = typeof combined;

class Bracket extends React.Component<BracketProps> {

	constructor(props: BracketProps) {
		super(props);

		this.matchups = BracketCreator.createPlayersBracket(this.props.store);
		this.bracket = this.matchups[this.matchups.length - 1];
	}

	private matchups: Matchup[] = [];
	private bracket: Matchup = null;

	render() {

		let count = 0;
		const make = (matchup: Matchup) => {
			let inner: JSX.Element = null;
			if (matchup.players && matchup.players.length) {
				const innerList = matchup.players.map<JSX.Element>((m) => {
					return make(m);
				})
				inner = <ul>{innerList}</ul>
			}

			return (
				<li key={count++}>
					<span>{matchup.winner ? matchup.winner.name : "TBD"}</span>
					{inner}
				</li>
			)
		}

		const tree = <ul>{make(this.bracket)}</ul>;

		return (
			<div className="react-bracket">
				<p>Bracket Time! We need to make a bracket for {this.props.store.length} players.</p>
				{tree}
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps)(Bracket);