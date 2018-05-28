import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";


export const ExpenseListItem = (props) => (
    <div>
        <p>-------------------------------</p>
        <Link to={"/edit/" + props.id} ><h3>{props.description}</h3> </Link>
        <p> 
            {numeral(props.amount / 100).format("$0,0.00")} 
            -
            {moment(props.createdAt).format(" D.M.YYYY")}
        </p>
        
    </div>
);

//DA SE ZAPSAT S DESCTRUCTURED OBJEKTEM PROPS:

// const ExpenseListItem = ({dispatch, id, description, amount, createdAt}) => (
//     <div>
//         <h3>{description}</h3>
//         <p>{amount} - {createdAt}</p>
//         <button onClick={() => {
//             dispatch(removeExpense({ id }));
//         }}>REMOVE</button>
//     </div>
// );


export default ExpenseListItem;