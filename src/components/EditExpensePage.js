import React from "react";
import  { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";



  


export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push("/");
    };

    onRemove = () => {
        this.props.removeExpense({id: this.props.expense.id});
        this.props.history.push("/");
    };


    render() {
        return (
            <div>
                
                <ExpenseForm 
                    expense={this.props.expense}    
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>REMOVE</button>
    
    
            </div>
        );
    };


};



//mapStateToProps muze mit jako druhy argument pristupne props, ktere uz komponenta ma odjinud a neco tam zmenit nebo prihodit
const mapStateToProps = (state, props) => {
  // console.log(state.expenses);
   //console.log(props.match.params.id);
  // console.log(state.expenses.find((expense) => expense.id === props.match.params.id));
    return {
        //projde array expense objektu a zjisti jestli se nejaka polozka z array 
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
        
    };
};



//stejne jako mapStateToProps muze vyuzit jako druhy argument dosavadnich props, ktere uz existujou (tady nevyuzito)
const mapDispathToProps = (dispatch) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    //(data) protoze vime ze tam prijde objekt s property id, tak proste definujem objekt obecne
    removeExpense: (data) => dispatch(removeExpense(data))
});

export default connect(mapStateToProps, mapDispathToProps)(EditExpensePage);


//NEFUNGUJE EDIT, NENAJDE ID, PODIVAT SE ZNOVA NA WIRING ADD A EDIT