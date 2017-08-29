import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import Test from "../components/test-component";

import { State } from "../data/state";
import allReducers from "../data/reducers";
import App from "../components/app";

// Import our styles
import "../../sass/common/index.scss";

const store = createStore(
	allReducers,
);

ReactDOM.render(
	<Provider store={store} >
		<App>
			<Test name="World 1" />
			<Test name="World 2" />
		</App>
	</Provider>,
	document.getElementById("root")
);