import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

//v argumentu od PrivateRoute jsou props ve forme descructured
export const PrivateRoute = ({
    isAuthenticated, //to same jako isAuthenticated: isAuthenticated
    component: Component,
    ...rest //vse ostatni co dosud neni v destructured podobe (nemusi se jmenovat rest, muze to byt jakkoli)
}) => (
    //route dostava jako props jenom to co je v ...rest, tzn vse co je v props krome isAuthenticated a component: Component, proto tam za ...rest davame component protoze to v ...rest neni a my to potrebujeme
    //vysledek fce ktera je v component= rozhoduje kterou komponentu bude react router renderovat - pokud je uzivatel prihlasen tak vyrenderuje komponentu, kterou mu predal v props jako "component: Component" PrivateRoute v AppRouteru...
    //pokud neni uzivatel prihlasen tak se vyrenderuje komponenta Redirect z react routeru, ktera presmeruje na zadane misto
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
         ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute)