import { createStore, combineReducers } from "redux";
import uuid from "uuid";

//ADD_EXPENSE
//vraci objekt (action objekt) ktery se pouzije jako argument pro store.dispatch
const addExpense = ({ description = "", note = "", amount=0, createdAt = 0} = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});


//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});


//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates

});



//SET_TEXT_FILTER
const setTextFilter = (text = "") =>({
    type: "SET_TEXT_FILTER",
    text
})



//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});

//"SORT_BY_DATE"
const sortByDate = () => ({
    type: "SORT_BY_DATE"
});

//"SET_START_DATE"
const setStartDate = (date = undefined) => ({
    type: "SET_START_DATE",
    date
});

//"SET_END_DATE"
const setEndDate = (date = undefined) => ({
    type: "SET_END_DATE",
    date
});




//Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case "ADD_EXPENSE":
           //spread vezme dosavadni state (pri prvnim prubehu je to prazdne array pro expenses)
            return [...state, action.expense]
        case "REMOVE_EXPENSE":
            //v argumentu funkce pro filter je normalne nazev pro polozku v array. bo vime ze ta polozka je objekt tak muzem pouzit destructuring a z toho objektu pouzit jen property id
            return state.filter(({id}) => {
                //vrat true pokud se id polozky z array nerovna id action objektu, ktery byl vyslan do reduceru pres fci removeExpense
                return id !== action.id;
            });
        case "EDIT_EXPENSE":
            return state.map((item) => {
                if (item.id === action.id) {
                    return {...item, ...action.updates}
                }
            });
            

        default:
            return state;
    }
};



//filters reducer
const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case "SET_TEXT_FILTER":
            return {...state, text: action.text}
        case "SORT_BY_AMOUNT":
            return {...state, sortBy: "amount"}
        case "SORT_BY_DATE":
            return {...state, sortBy: "date"}
        case "SET_START_DATE":
            return {...state, startDate: action.date}
        case "SET_END_DATE":
            return {...state, endDate: action.date}
        default:
        
            return state;
    }
};


//get visible expenses pro filtrovani a razeni dat z redux store
//v argumentu jsou objekty expenses a filters (filters jsou destructured)
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((item) => {
        const startDateMatch = typeof startDate !== "number" || item.createdAt >= startDate;
        const endDateMatch = typeof endDate !== "number" || item.createdAt <= endDate;
        const textMatch = item.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === "date") {
            return a.createdAt <  b.createdAt ? 1 : -1;
        } else if (sortBy === "amount") {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

//store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() =>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

//store.dispatch posila action objekt do reduceru, ale taky ma action objekt jako navratovou hodnotu a to se da pouzit kdyz to ulozime do promenne
const expenseOne = store.dispatch(addExpense({description: "rent", amount: 16600, createdAt: 1000}));
const expenseTwo = store.dispatch(addExpense({description: "kafe", amount: 3000, createdAt: 1400}));

//v expenseOne je cely action objekt a my pouzijeme id aby vedel co ma smazat
// store.dispatch(removeExpense({id: expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}));

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());
// store.dispatch(setEndDate());










const demoState = {
    expenses: [{
        id: "dasdasd",
        description: "january rent",
        note: "tohle je nejaka poznamka",
        amount: 3510,
        createdAt: 0
    }],
    filters: {
        text: "rent",
        sortBy: "amount", //date or amount
        startDate: undefined,
        endDate: undefined
    }
};


const demoState = {
    vysetreni: [{
        id: "23af43fq34f",
        nazev: "ACTH",
        synonyma: ["hormon takovy", "hormon makovy"],
        kam: "Krnov",
        odber: ["serum", "EDTA plasma", "LiHEP plasma"],
        preanal: "odebrat stocit chladit",
        poznamka: "blablabla",
        poznamkaOdd: "poznamka od oddeleni"
    }],
    filtry: {
        text: "hledany text",
        seradit: "kam se odesila" //kam nebo nazev
    }
}