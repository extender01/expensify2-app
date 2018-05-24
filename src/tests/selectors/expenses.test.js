import selectExpenses from "../../selectors/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses"; //soubor s dummy datama


//selectExpenses vezme z redux store vsechny expenses a nacte aktualni filters a podle hodnot ve filtru vrati array tech expenses, ktere projdou filtrem
//tady si udelame modelove databazi expenses ve forme array, tedy stejne jako kdyby sly z redux, filtry se nastavi zvlast v kazdem testu




test("should filter by text value", () => {
    const filters = {
        text: "e",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2], expenses[1] ]);
});



test("should filter by start date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: moment(0),
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2], expenses[0]]);
});


test("should filter by end date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: moment(0)
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[0], expenses[1]]);
});


test("should sort by date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});


test("should sort by amount", () => {
    const filters = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
