import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses"; //soubor s dummy datama
import uuid from "uuid";


//state od expenses reduceru je array s jednotlivymi expenses objekty (filtry jsou v druhem reduceru)

test("should set default state", () => {
    const state = expensesReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual([]);
});



test("should remove expense by id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});


test("should not remove expense if id not found", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: "-1"
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});



test("should add expense", () => {
    const action = {
        type: "ADD_EXPENSE",
        expense: {
            id: uuid(),
            description: "dalsi vysetreni",
            note: "neco napisu",
            amount: 34532,
            createdAt: 1
        }
    };
    //const state je novy stav state po probehnuti dummy dat (expenses) reducerem, ktery tam prida objekt property expense z action objektu (tak je to definovane v reduceru)
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, action.expense]);
});


test("should edit expense", () => {
    const action = {
        type:"EDIT_EXPENSE",
        id: expenses[2].id,
        updates: {
            description: "zmeneny nazev"
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[2].description).toBe("zmeneny nazev");
});






test("should not edit expense if not found", () => {
    const action = {
        type:"EDIT_EXPENSE",
        id: -1,
        updates: {
            description: "zmeneny nazev"
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test("should set expenses", () => {
    const action = {
        type: "SET_EXPENSES",
        expenses: [expenses[1]]
    };

    const state = expensesReducer(undefined, action);
    expect(state).toEqual([expenses[1]])
});