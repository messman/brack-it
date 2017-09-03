import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import { State, actions, wrapStore, wrapDispatcher, getReturnType } from "../../data";

import "./bracket.scss";

function mapStateToProps(state: State) {
	return wrapStore(state.players);
}
const combined = getReturnType(mapStateToProps);
type BracketProps = typeof combined;

class Bracket extends React.Component<BracketProps> {

	constructor(props: BracketProps) {
		super(props);
	}

	render() {
		return (
			<p>Bracket Time! We need to make a bracket for {this.props.store.length} players.</p>
		);
	}
}

export default ReactRedux.connect(mapStateToProps)(Bracket);