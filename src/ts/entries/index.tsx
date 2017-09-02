import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import { State } from "../data/state";
import allReducers from "../data/reducers";
import App from "../components/app";
import PlayersList from "../containers/players-list";

// Import our styles
import "sass/common/index.scss";

const store = createStore(
	allReducers,
);

ReactDOM.render(
	<Provider store={store} >
		<App>
			<PlayersList />
		</App>
	</Provider>,
	document.getElementById("root")
);