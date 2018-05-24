

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
                } else {
                    return item;
                  };
            });
            

        default:
            return state;
    }
};

export default expensesReducer;