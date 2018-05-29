import React from "react";
import {shallow} from "enzyme";
import {AddExpensePage} from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";



//beforeEach se provede pred kazdym testem, tak nemusime duplikovat kod
let startAddExpense, history, wrapper;
beforeEach(() => {
     startAddExpense = jest.fn();
     history = {push: jest.fn()};
     wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
})

test("should render AddExpensePage correctly", () => {

    expect(wrapper).toMatchSnapshot();
});


test("should handle onSubmit correctly", () => {

    //simulujeme zavolani fce onSubmit v komponente ExpenseForm s parametrem jednoho expense objektu ze vzorove fixture array
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);

})