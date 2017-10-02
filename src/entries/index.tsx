import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import { reducers } from "../data/";
import { App } from "../components";

import { DEFINE } from "../services/define";

console.log(`${DEFINE.BUILD.IS_PRODUCTION ? "Production" : "Debug"} | ${DEFINE.BUILD.TIME}`);

const store = createStore(
	reducers
);

ReactDOM.render(
	<Provider store={store} >
		<App />
	</Provider>,
	document.getElementById("root")
);