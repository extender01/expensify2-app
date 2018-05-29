import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startAddExpense, addExpense, editExpense, removeExpense } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import db from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk])


test("should setup remove expense action object", () => {
    const action = removeExpense({id: "123abc"});
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123abc"
    });
});

test("shloud setup edit expense action object", () => {
    const action = editExpense("123abd", {amount: 32});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123abd",
        updates: {
            amount: 32
        }

    });
});


test("should setup add expense action object with provided values", () => {
   
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
        
    });
});

                                        //done rika jestu ze to je asynchronni fce a ze ma pockat az se vsecko provede
test("should add expense to database and store", (done) => {
    const store = createMockStore({});

    const expenseData = {
        description: "Mouse",
        amount: 3000,
        note: "poznamka",
        createdAt: 54665
    };
    store.dispatch(startAddExpense(expenseData)).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String), 
                ...expenseData
            }
        });
        return db.ref(`expenses/${actions[0].expense.id}`).once("value")
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});





// test("should setup add expense action object with default values", () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: "ADD_EXPENSE",
//         expense: {
//             description: "",
//             note: "",
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     });
// });