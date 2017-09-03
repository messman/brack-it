import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { State, AppOrder, actions, wrapStore, wrapDispatcher, getCompositeType } from "../../data";
import { PlayersList, Bracket } from "../";

import "./app.scss"
import "../../style/index.scss";

function mapStateToProps(state: State) {
	return wrapStore(state.appOrder);
}
function mapDispatchToProps(dispatch: ReactRedux.Dispatch<any>) {
	return wrapDispatcher(Redux.bindActionCreators(actions.appOrder, dispatch));
}
const combined = getCompositeType(mapStateToProps, mapDispatchToProps);
type AppProps = typeof combined;

class App extends React.Component<AppProps> {
	constructor(props: AppProps) {
		super(props);
	}

	moveToBracket = () => {
		this.props.dispatcher.move(AppOrder.show);
	}

	render() {

		const order = this.props.store.order;
		let view: JSX.Element = null;
		if (order === AppOrder.create) {
			view = <PlayersList onGo={this.moveToBracket} />
		}
		else {
			view = <Bracket />;
		}

		return (
			<div className="full grid L-column">
				<header>
					<h1>brack-it</h1>
				</header>
				<main className="L-filled">
					{view}
				</main>
			</div>
		)
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)