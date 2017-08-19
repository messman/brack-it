import * as React from "react";
import "../../sass/example.scss";

export interface TestProps {
	name: string;
}

export interface TestState {
	index: number;
}

export class Test extends React.Component<TestProps, TestState> {

	constructor(props: TestProps) {
		super(props);

		this.state = {
			index: 0
		};

	}

	private onClickButton = () => {
		console.log("clicked!");
		this.setState((prev) => {
			console.log(prev.index);
			return {
				index: prev.index + 1
			}
		});
	}

	render() {

		const message = `Hello, ${this.props.name}!`;

		return (
			<div>
				<p>{message}</p>
				<div>
					<button onClick={this.onClickButton}>{`> ${this.state.index} <`}</button>
				</div>
			</div>
		);
	}
}