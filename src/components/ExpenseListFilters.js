import React from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from "../actions/filters";
import { DateRangePicker } from "react-dates";


export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    //kdyz se v kalendari zmeni datumy tak je posli do redux store
    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    //kdyz se otevre nebo zavre kalendar tak odesli aktualni stav do state tehle komponenty
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) =>{
        if (e.target.value === "amount") {
         this.props.sortByAmount();
        } else if (e.target.value === "date"){
         this.props.sortByDate();
        }
     };

    render() {
        return (
            
                <div>
                    <input type="text" 
                        value={this.props.filters.text} 
                        onChange={this.onTextChange}
                    />
            
                    <select 
                        value={this.props.filters.sortBy}
                        onChange={this.onSortChange}    
                    >
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
            
                    <DateRangePicker 
                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        showClearDates={true}
                    />
                    
                </div>
            
        )
    }

}


// callback fce v onChange se spusti pokazde kdyz dojde ke zmene v inputu - tady se pokazde zapise nova hodnota filtrovaciho textu do store
//komponenty spojene s redux store pres connect maji automaticky pristup k dispatch na upravy redux store (dispatch je pristupny v props objektu)

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDateGen) => dispatch(setStartDate(startDateGen)),
    setEndDate: (endDateGen) => dispatch(setEndDate(endDateGen)),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByDate: () => dispatch(sortByDate()),
    setTextFilter: (textGen) => dispatch(setTextFilter(textGen))
});
       
    

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);