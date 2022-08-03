import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Main from "./components/Main"
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

let reactRoot = ReactDOM.createRoot(document.getElementById('root'));

reactRoot.render(<Main />);

serviceWorkerRegistration.register();