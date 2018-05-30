import uuid from "uuid";
import db from "../firebase/firebase";

//ADD_EXPENSE
//vraci objekt (action objekt) ktery se pouzije jako argument pro store.dispatch
export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense: expense
    
});


//misto vraceni objektu vraci funkci, ktera nejdriv provede zapis do firebase pomoci push a v promise od push se provede dispatch do redux store - dispatch se vola s argumentem puvodni fce addExpense - ta vrati action objekt
//promise ma v argumentu informace o id polozky zapsane do firebase v objektu ref, takze potrebne parametry o expense pro addExpense predame v desctructured podobe ref.key a zbytek pres spread obkejtu expense
export const startAddExpense = (expenseData = {}) => {
    //muzeme vratit fci misto objektu diky middleware redux thunk
    return (dispatch) => {
        
        //desctructuring objektu expenseData  =  jako kdyby se vytvorily samostatne const description, const note.. a do nich se dosadi hodnoty, ktere prijdou od toho kdo voval startAddExpense (kdyz neprijde nic, tak se tam dosadi defaultni hodnty)
        const {
            description = "",
            note = "",
            amount=0,
            createdAt = 0
        } = expenseData;

       
        //tady se vytvori objekt expense kam se dosadi hodnoty z tech vytvorenych desctructured promennych - description: jeho hodnota, note: jeho hodnota... a ty se pak pouzijou ve spread
        const expense = {description, note, amount, createdAt}
        
        //return abychom mohli za to pridat dalsi promise v testovani (promise chaining - ta predchazejici promise musi byt jako navratova hodnota)
        return db.ref("expenses").push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};


//REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});


//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates

});


//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
});

 export const startSetExpenses = () => {
     return (dispatch) => {
      

        const expenses = []

        return db.ref("expenses").once("value").then((snapshot) => {
            

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            console.log(expenses);
            dispatch(setExpenses(expenses));

        });
        
        
     };
 };




 
// db.ref("expenses").once("value")
//     .then((snapshot) => {
//         const expenses = [];
//         console.log(snapshot.val());

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
// });


