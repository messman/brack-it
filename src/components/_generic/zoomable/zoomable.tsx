import * as React from "react";

import "./zoomable.scss";

export interface ZoomableProps {
	min: number,
	max: number,
	zoomChange: number
}

interface ZoomableState {
	zoom: number
}

export class Zoomable extends React.Component<ZoomableProps, ZoomableState> {

	constructor(props: ZoomableProps) {
		super(props);

		this.state = {
			zoom: 1
		};
	}

	zoomOut = () => {
		this.setState((prev) => {
			return {
				zoom: Zoomable.close(Math.max(prev.zoom - this.props.zoomChange, this.props.min))
			}
		});
	}

	zoomIn = () => {
		this.setState((prev) => {
			return {
				zoom: Zoomable.close(Math.min(prev.zoom + this.props.zoomChange, this.props.max))
			}
		});
	}

	private static close(num: number): number {
		return parseFloat(num.toFixed(1));
	}

	render() {

		const zoom = this.state.zoom;
		const style = {
			fontSize: zoom + "em",
			width: (zoom * 100) + "%",
			height: (zoom * 100) + "%",
		};
		const container = <div style={style}>{this.props.children}</div>;

		return (
			<div className="react-zoomable">
				<button onClick={this.zoomOut}>Zoom Out</button>
				<span>{this.state.zoom}</span>
				<button onClick={this.zoomIn}>Zoom In</button>
				{container}
			</div>
		);
	}
}