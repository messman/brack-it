import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import { reducers } from "../data/";
import { App } from "../components";

const store = createStore(
	reducers
);

ReactDOM.render(
	<Provider store={store} >
		<App />
	</Provider>,
	document.getElementById("root")
);