import moment from "moment"

//get visible expenses pro filtrovani a razeni dat z redux store
//v argumentu jsou objekty expenses a filters (filters jsou destructured)
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((item) => {
        
        //createdAtMoment je casova znacka od polozky vlozena do moment objektu
        const createdAtMoment = moment(item.createdAt)
        
        //pokud existuje startDate nebo endDate (bylo zadano z kalendare pro filtrovani) tak zjisti, jestli expensify polozka patri do filtrovaneho rozmezi datumu; kdyz neni filtr tak neni ani startDate a je to vzdycky true
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;
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

export default getVisibleExpenses;



// export default (expenses, { text, sortBy, startDate, endDate }) => {
//     return expenses.filter((expense) => {
//       const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
//       const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
//       const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
  
//       return startDateMatch && endDateMatch && textMatch;
//     }).sort((a, b) => {
//       if (sortBy === 'date') {
//         return a.createdAt < b.createdAt ? 1 : -1;
//       } else if (sortBy === 'amount') {
//         return a.amount < b.amount ? 1 : -1;
//       }
//     });
//   };
  