import moment from "moment";
//dummy data pro testovani
export default [{
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: 0
},{
    id: "2",
    description: "Rent",
    note: "",
    amount: 109500,
    //moment(0).subtract vezme aktualni timestamp, ktery je v argumentu a odecte od nej 4 dny, valueOf zase vrati cislo timestamp mensi o ty 4 dny 
    createdAt: moment(0).subtract(4, "days").valueOf()
},{
    id: "3",
    description: "credit card",
    note: "",
    amount: 4500,
    createdAt: moment(0).add(4, "days").valueOf()
}];