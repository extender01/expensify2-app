import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";


export const Header = (props) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Domu   </NavLink>
        <NavLink to="/create" activeClassName="is-active">Pridej   </NavLink>
        <button onClick={props.startLogout}>Logout</button>

    </header>
);


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);

//<NavLink to="/help" activeClassName="is-active">Pomoc   </NavLink>
