
import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';


const PrivateRoute = (props) => (
    <Fragment>
        {localStorage.getItem('usuario') ? props.children : <Redirect to="/ventana" />}
    </Fragment>
)

export default PrivateRoute;