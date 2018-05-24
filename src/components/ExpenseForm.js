import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";




export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

       //pokud je v props nejaka expense polozka (tzn ze tahle komponenta je renderovana z EditExpensePage) tak pouzij jeji hodnoty a pokud tam nic neni (komponenta je renderovana z AddExpensePage) tak pouzij vychozi hodnoty)
        this.state = {
            description: props.expense ? props.expense.description : "",
            note: props.expense ? props.expense.note : "",
            amount: props.expense ? (props.expense.amount /100).toString() : "",
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ""
        };



    }
    
    
    

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description: description}));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note: note}));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount: amount}))
        }
    };


    onDateChange = (createdAt) => {
       //tady je impicitni return objektu, ktery ma property createdAt
        this.setState(() => ({createdAt: createdAt}));
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    onSubmit = (e) => {
       //aby se pri submitu neobnovila stranka - aby nedoslo k post request ale aby to osefoval javascript
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({error: "nazev nebo amount chybi"}));
        } else {
            //console.log("submitted");
            this.setState(() => ({error: ""}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                //valueOf bo createdAt je ted moment objekt a my potrebujeme jen hodnotu
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    
    
    render() {
        return (
            <div>
                {this.state.error && <p>error: nazev nebo amount chybi, dopln vole</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}                       
                    />

                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    
                    </textarea>
                    <button>ADD EXPENSE</button>

                </form>
            </div>
        )
    }
}