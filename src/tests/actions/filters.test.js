import {setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from "../../actions/filters";
import moment from "moment";

test("should generate setStartDate action object", () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: "SET_START_DATE",
        startDate: moment(0)
    })
});


test("should generate setEndtDate action object", () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: "SET_END_DATE",
        endDate: moment(0)
    })
});

test("should  generate set text filter action object", () =>{
    const action = setTextFilter("hov");
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: "hov"
    });
});

test("should  generate set text filter default action object", () =>{
    const action = setTextFilter();
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: ""
    });
});

test("should sort by amount", () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: "SORT_BY_AMOUNT"
    });
});

test("should sort by date", () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE"
    });
});


