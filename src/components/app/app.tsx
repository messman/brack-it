import * as React from "react";

import "./app.scss"
import "../../style/index.scss";

export default function (props: React.HTMLProps<HTMLDivElement>) {
	return (
		<div className="full grid L-column">
			<header>
				<h1>brack-it</h1>
			</header>
			<main className="L-filled">
				{props.children}
			</main>
		</div>
	)
}