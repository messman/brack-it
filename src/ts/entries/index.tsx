import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import Test from "../components/test-component";

import { State } from "../data/state";
import allReducers from "../data/reducers";

const store = createStore(
	allReducers,
);

ReactDOM.render(
	<Provider store={store} >
		<div>
			<Test name="World 1" />
			<Test name="World 2" />
		</div>
	</Provider>,
	document.getElementById("root")
);