/* eslint-disable */

import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import './styles/index.css'
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
    // strict mode make  useeffect run twice in production 
);
