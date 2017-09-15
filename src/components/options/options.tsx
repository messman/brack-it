import * as React from "react";

import { Player } from "../../data";

import "./options.scss";

interface OptionsOwnProps {
	players: Player[];
}

interface OptionsOwnState {

}

export default class Options extends React.Component<OptionsOwnProps, OptionsOwnState> {

	constructor(props: OptionsOwnProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="react-options">
				<h3>Options</h3>
			</div>
		);
	}
}