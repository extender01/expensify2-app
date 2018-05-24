import filtersReducer from "../../reducers/filters";
import moment from "moment";

//bude se testovat jestli reducer odesila spravny state objekt do store


//mel by do redux store pri jeho inicializaci (akce @@INIT) zapsat defaultni hodnoty uvedene pro filter reducer
//reducer prijima jako prvni argument objekt state (tady prvni inicializace, takze predavame undefined a mely by se vyplnit defaultni hodnoty), druhy argument je destructured action objekt
test("should setup default filter valuer", () => {
    const state = filtersReducer(undefined, { type: "@@INIT"});

    expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    });
});




test("should set sortBy to amount", () => {
    const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT"});
    expect(state.sortBy).toBe("amount");
    
});


//zadame uz nejaky vlastni state se sortBy amount a posleme action objekt typu SORT_BY_DATE abychom zjistili jestli se to prehodi na date (bo vychozi je date tak bysme nepoznali jestli se to zmenilo)
test("should set sortBy to date", () => {
    //ted davame nejaky modelovy uz zadany state a ne vychozi
    const currentState = {
        text: "",
        startDate: undefined,
        endDate: undefined,
        sortBy: "amount"
    };

    const action = {type:"SORT_BY_DATE"};
    const state = filtersReducer(state, action);
    expect(state.sortBy).toBe("date");
});



test("should set text filter", () => {
    const state = filtersReducer(undefined, {type: "SET_TEXT_FILTER", text:"cys"})
    expect(state.text).toBe("cys");
});


test("should set startdate filter", () => {
    const state = filtersReducer(undefined, {type: "SET_START_DATE", startDate: moment(0)});
    expect(state.startDate).toEqual(moment(0));
});


test("should set enddate filter", () => {
    const state = filtersReducer(undefined, {type: "SET_END_DATE", endDate: moment(0)});
    expect(state.endDate).toEqual(moment(0));
});