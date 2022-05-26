import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Provider from "./context/Provider";
import HistoryProvider from "./context/HistoryProvider";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <HistoryProvider>
        <BrowserRouter basename="/songidentifier">
          <Router />
        </BrowserRouter>
      </HistoryProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
