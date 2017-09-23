import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { State, AppOrder, actions, wrapStore, wrapDispatcher, getCompositeType } from "../../data";
import { Tabs, Tab, Options, PlayersList, Bracket } from "../";

import "./app.scss"
// Import the overall stylesheet
import "../../style/index.scss";

// Get the combined type of our state and action types
function mapStateToProps(state: State) {
	return wrapStore({
		order: state.appOrder,
		players: state.players
	});
}
function mapDispatchToProps(dispatch: ReactRedux.Dispatch<any>) {
	return wrapDispatcher({
		order: Redux.bindActionCreators(actions.appOrder, dispatch),
		players: Redux.bindActionCreators(actions.players, dispatch)
	});
}
const combined = getCompositeType(mapStateToProps, mapDispatchToProps);
type AppProps = typeof combined;

class App extends React.Component<AppProps> {
	constructor(props: AppProps) {
		super(props);
	}

	// Move to the "show" view
	moveToBracket = () => {
		this.props.dispatcher.order.move(AppOrder.show);
	}

	render() {

		const order = this.props.store.order.order;
		let view: JSX.Element = null;
		let goButton: JSX.Element = null;
		if (order === AppOrder.create) {
			// If we have enough players, allow us to begin
			if (this.props.store.players.length > 1) {
				goButton = <div><button onClick={this.moveToBracket.bind(this)} className="list-go-button">Start with <strong>{this.props.store.players.length}</strong> players</button></div>
			}
			view =
				<div className="gL-flexed">
					<Tabs>
						<Tab title="Players" >
							<PlayersList players={this.props.store.players} />
						</Tab>
						<Tab title="Options" >
							<Options players={this.props.store.players}></Options>
						</Tab>
					</Tabs>
				</div>;
		}
		else {
			view = <Bracket />;
		}
		return (
			<div className="full grid gL-column">
				<header>
					<h1>brack-it</h1>
				</header>
				<main className="gL-flexed grid grid-pad gL-column">
					{view}
					{goButton}
				</main>
			</div>
		)
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)