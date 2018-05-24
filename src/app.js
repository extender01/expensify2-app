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
import AppRouter from "./routers/AppRouter";
import store from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";



store.dispatch(addExpense({description: "Water bill", amount: 500, createdAt: 156213}));
store.dispatch(addExpense({description: "Gas bill", amount: 40, createdAt: 77796413}));
store.dispatch(addExpense({description: "rent", amount: 1095, createdAt: -9746413}));


const state = store.getState(); //vlozeni soucasneho redux store do promenne state
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters); //profiltrovani a serazeni veci ze state do nove promenne visibleExpenses
console.log(visibleExpenses);


//vse co je v komponente Provider bude mit pristup do redux store po pouziti fce connect (tady se ten store jmenuje store)
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));

