import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { addExpense } from "../actions/expenses";



export class AddExpensePage extends React.Component {
    onSubmituj = (expense) => {
        this.props.addExpense(expense)
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    // STARY ZAPIS BEZ mapDispatchToProps: props.dispatch(addExpense(expense));
                    
                    //NOVY ZAPIS: v mapDispatchToProps se nadefinovala funkce do objektu (tedy metoda), ktery je tady pristupny jako objekt props...
                    // ta metoda ma v definici co se ma provest v dispatch (jaky action generator se ma pustit - tady addExpense)...
                    //tady se na tu metodu jen odkazeme pres props, (argument expense pochazi z ExpenseForm, ktery funkci onSubmit vola)...
                    //takze v ExpenseForm se zavola onSubmit({...}), to prijde sem a presmeruje se to do mapDispatchToProps a tam se vola dispatch
                    //onSubmit je nazev fce, ktera se predava jako props do ExpenseForm, this.onSubmit je nazev mistni fce definovane v mapDispatchToProps - mohly by se jmenovat ruzne
                    onSubmit={this.onSubmituj}    
                    
                />
            </div>
        );
    };
};



//analogie MapStateToProps
//V mapDispatchToProps SE DEFINUJE FUNKCE (napr addExpense) JAKO PROPERTY OD OBJEKTU, KTERY BUDE PRISTUPNY JAKO PROPS V KOMPONENTE
const mapDispatchToProps = (dispatch) => {
    return {
        addExpense: (expense) => dispatch(addExpense(expense))
    }
}

//info z formularove komponenty se sem dostane z jeho state (z ExpenseForm komponenty bo ta je class based a ma tedy state) do objektu expense a odsud odejde kompletni do redux store
export default connect(undefined, mapDispatchToProps)(AddExpensePage);