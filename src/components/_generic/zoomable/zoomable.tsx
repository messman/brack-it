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
		const children = React.Children.map(this.props.children, function (child: React.ReactElement<any>, index) {
			if (child)
				return <div className="zoomable-child">{child}</div>;
			return null;
		}).filter(function (child) {
			return !!child;
		});

		// Holds all children.
		const parent = <div className="grid gL-flex-children" style={{ width: (children.length * 50) + "%" }}>{children}</div>;

		const zoom = this.state.zoom;
		const style = {
			fontSize: zoom + "em",
			width: (zoom * 100) + "%",
			overflow: "visible" as any
			//height: (zoom * 100) + "%",
		};

		return (
			<div className="react-zoomable gL-flexed grid gL-column">
				<div>
					<button onClick={this.zoomOut} disabled={zoom === this.props.min}>Out</button>
					<span>{zoom.toFixed(1)}</span>
					<button onClick={this.zoomIn} disabled={zoom === this.props.max}>In</button>
				</div>
				<div className="gL-flexed grid gL-column">
					<div className="gL-flexed" style={style}>
						{parent}
					</div>
				</div>
			</div>
		);
	}
}