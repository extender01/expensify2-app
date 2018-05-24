import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import getVisibleExpenses from "../selectors/expenses";

//tenhle export nepripojene verze komponenty je jen pro testovani v enzyme
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                //ternary operator, kdyz v poli nic neni tak jen <p>, a kdyz je tak vygenerovany seznam
                <p>No expenses</p>
            ) : (
                props.expenses.map((item) => {
                    //vygeneruje komponentu pro kazdou polozku v expenses array
                    return <ExpenseListItem  key={item.id} {...item} />
                })    
            )
        }
        
    </div>
);



//connect nema jako return value tu novou komponentu, ale jeste dalsi funkci, ktera tu novou komponentu vytvori, proto syntax connect()() neboli connect(fce ktera rekne co ze store chceme - argumentem je objekt state tedy vse z redux store)(NaseKomponenta)
// const ConnectedExpenseList = connect(fce mapStateToProps(state))(NaseKomponenta)

// const ConnectedExpenseList = connect((state) =>{
//     //vraci se objekt do ktereho muzeme ulozit vsechny veci ze store (ty jsou v objektu state, ktery je jako argument), ktere potrebujeme a vlozime je do puvodni komponenty jako props objekt a v tele komponenty pak informace z toho objektu vyuzijeme
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList)

// export default ConnectedExpenseList;


//STANDARDNI ZAPIS JE  definice te fce mimo a nazev mapStateToProps: connect(mapStateToProps)(NaseKomponenta)
//mapStateToProps VYTAHNE VECI Z REDUX STORE, KTERE POTREBUJEME A VRATI JE VE FORME OBJEKTU, KTERY JE PAK POUZITELNY JAKO PROPS OBJEKT V PUVODNI KOMPONENTE
//NEMUSIME TVORIT NOVOU PROMENNOU ConnectedKomponenta, MISTO TOHO DAME ROVNOU EXPORT DEFAULT TE FCE CONNECT


const mapStateToProps = (state) => {
    return {
       //vysledny objekt props obsahuje profiltrovane a serazene array  pomoci fce getVisibleExpenses ze selectoru
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);
//mame vyexportovanou komponentu, ktera ma pristupne veci ze store v podobe objektu props, ktery zajistila fce mapStateToProps