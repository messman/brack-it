import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { State } from "../data/state";
import * as DataHelpers from "../data/types";
import { actions } from "../data/actions";

import "../../sass/example.scss";

interface TestOwnProps {
	name: string;
}

interface TestOwnState {
	amount: number
}

function mapStateToProps(state: State) {
	return DataHelpers.wrapStore(state.counter);
}
function mapDispatchToProps(dispatch) {
	return DataHelpers.wrapDispatcher(Redux.bindActionCreators(actions.counter, dispatch));
}
const a = DataHelpers.getReturnType(mapStateToProps);
const b = DataHelpers.getReturnType(mapDispatchToProps);
type TestProps = TestOwnProps & typeof a & typeof b;

class Test extends React.Component<TestProps, TestOwnState> {

	constructor(props: TestProps) {
		super(props);
		this.state = {
			amount: 5
		};
	}

	private onIncrement = () => {
		this.props.dispatcher.increment({ amount: this.state.amount });
	}

	private onDecrement = () => {
		this.props.dispatcher.decrement({ amount: this.state.amount });
	}

	private handleChange = (event) => {
		this.setState({ amount: parseInt(event.target.value, 10) });
	}

	render() {

		const message = `Hello, ${this.props.name}!`;

		return (
			<div>
				<p>{message}</p>
				<div>
					<p>The value is {this.props.store.value}.</p>
					<label>Amount:<input value={this.state.amount} onChange={this.handleChange}></input></label>
					<button onClick={this.onIncrement}>Increment</button>
					<button onClick={this.onDecrement}>Decrement</button>
				</div>
			</div>
		);
	}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Test);