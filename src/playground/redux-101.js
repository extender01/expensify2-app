import { createStore } from "redux";

//vraci action objekt
const incrementCount = ({incrementBy = 1 } = {}) => ({
     
        type: "INCREMENT",
        incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy: decrementBy
});

const resetCount = () => ({
    type: "RESET"

});

const setCount = ({ nastaveneMnozstvi } = {}) => ({
    type: "SET",
    count: nastaveneMnozstvi
});



const store = createStore((state = { count: 0}, action) => {
   
   switch (action.type) {
        case "INCREMENT":
           return {
                count: state.count + action.incrementBy
           }; 
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            };   
        case "RESET":
            return {
                count: 0
            };  

        case "SET":
            return {
                count: action.count
            }; 
        default:
           return state;
   };
    
});

store.subscribe(() => {
    console.log(store.getState());
});



// store.dispatch({
//     type: "INCREMENT",
//     incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5}));

store.dispatch(incrementCount());

// store.dispatch({
//     type: "DECREMENT",
//     decrementBy: 7
// });

store.dispatch(decrementCount({decrementBy: 20}));

store.dispatch(resetCount());

store.dispatch(setCount({nastaveneMnozstvi: 108}));

// store.dispatch({
//     type: "RESET"
// });

// store.dispatch({
//     type: "SET",
//     count: 105
// });





