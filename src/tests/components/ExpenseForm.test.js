import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from "moment";

test("should render expense form correctly", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});


test("should render ExpenseForm with data", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});;

test("should render error when invalid submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    //vytvorime snapshot stavu pred errorem a potom snapshot stavu po erroru na konci tohohle testu
    expect(wrapper).toMatchSnapshot();
    
    //find najde pozadovany element a simulate simuluje kliknuti na submit, druhy argument je objekt nahrazujici e,
    //ktery musi obsahovat property preventDefault aby to nehodilo error (jako hodnota staci prazdna fce)
    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    });
    //kontrola jestli error ve state od komponenty neco obsahuje
    expect(wrapper.state("error").length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();

});


test("should set description on input change", () => {
    const value = "New description";
    const wrapper = shallow(<ExpenseForm />);
   //vybere prvni input ktery najde
   //simuluje aktivaci handleru onChange, druhy argument je objekt nahrada e objektu, ktery je tam ocekavan (e.target.value)
    wrapper.find("input").at(0).simulate("change", {
        target: {
            value: value
        }
    });
    expect(wrapper.state("description")).toBe(value);
});


test("should set note on text area change", () => {
    const value = "New note";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("textarea").simulate("change", {
        target: {
            value: value
        }    
    });
    expect(wrapper.state("note")).toBe(value);
});


test("should set amount if valid input", () => {
    const value = "12.50";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
        target: {
            value: value
        }       
    });
    expect(wrapper.state("amount")).toBe(value);
});


test("should set amount if INvalid input", () => {
    const value = "12.122";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
        target: {
            value: value
        }       
    });
    expect(wrapper.state("amount")).toBe("");
   
});



test("should call onSubmit prop for valid form submission", () => {
    //onSubmitSpy je spy fce pro testovani, bude se spoustet misto te opravdicke
    const onSubmitSpy = jest.fn();
    //tady predavame v props tu spy fci, ta se v testovani spusti misto dispatche definovanem v rodicovske komponente od ExpenseForm
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    //tady simulujeme submit jako v testu vyse
    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    });
    expect(wrapper.state("error")).toBe(""); 
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});



test("should set new date on date change", () => {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment()
    //.prop() zajisti pristup k props od toho singleDatePickeru
    //.prop("onDateChange")(now) je vlastne to stejne jako volani onDateChange(now) v komponente
    wrapper.find("SingleDatePicker").prop("onDateChange")(now);
    expect(wrapper.state("createdAt")).toEqual(now);
});



test("should set focus on focus change", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("SingleDatePicker").prop("onFocusChange")({focused: true});
    expect(wrapper.state("calendarFocused")).toBe(true);
});