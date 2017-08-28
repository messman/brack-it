import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import * as Data from "../data";

import "../../sass/example.scss";

interface TestOwnProps {
	name: string;
}

interface TestOwnState {
	amount: number
}

const a = Data.returntypeof(mapStateToProps);
const b = Data.returntypeof(mapDispatchToProps);

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
					<p>The value is {this.props.state.counter.amount}.</p>
					<label>Amount:<input value={this.state.amount} onChange={this.handleChange}></input></label>
					<button onClick={this.onIncrement}>Increment</button>
					<button onClick={this.onDecrement}>Decrement</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: Data.State) {
	return {
		state
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatcher: Redux.bindActionCreators(Data.Actions, dispatch)
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Test);