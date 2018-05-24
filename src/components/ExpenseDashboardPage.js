import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters"



const ExpenseDashboardPage = () => (
    <div>
        <p>This is from dashboard</p>
        <div className="zelena">
            <ExpenseListFilters />
        </div>
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;