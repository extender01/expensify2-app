import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = (props) => (
    <div>

        <button onClick={props.startLogin}>LOGIN</button>
    </div>
);


const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});


export default connect(undefined, mapDispatchToProps)(LoginPage);

