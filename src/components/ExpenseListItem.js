import React from "react";
import { Link } from "react-router-dom";


export const ExpenseListItem = (props) => (
    <div>
        <p>-------------------------------</p>
        <Link to={"/edit/" + props.id} ><h3>{props.description}</h3> </Link>
        <p> {props.amount} || {props.createdAt}</p>
        
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