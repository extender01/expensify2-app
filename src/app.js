//kdyz je export named tak pri importu se musi jmenovat stejne jako v exportnim souboru
//kdyz je export default tak se to pri jmenovani importu muze jmenovat jinak nez v externim souboru a je to bez slozenych zavorek

/* import {square, add} from "./utils.js";
import {isAdult, canDrink} from "./person.js";
import defaultniFceSenior from "./person.js"; */

/* import validator from "validator";
console.log(validator.isEmail("ahoooooj@asf.com")); */


import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, {history} from "./routers/AppRouter";
import store from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import getVisibleExpenses from "./selectors/expenses";
import { firebase } from "./firebase/firebase";







//console.log("test");


//vse co je v komponente Provider bude mit pristup do redux store po pouziti fce connect (tady se ten store jmenuje store)
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

//fce aby se aplikace renderovala jen jednou
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));
    


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("log in");
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            //history.location.pathname je soucasna url kde ted jsme - pokud jsme na domaci login page, tak presmeruj na dashboard page
            if (history.location.pathname === "/") {
                history.push("dashboard");
            }
        });
    } else {
        console.log("log out");
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});




