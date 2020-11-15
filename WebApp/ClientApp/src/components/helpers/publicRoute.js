import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PublicRoute = ({ component: Component, restricted, ...rest }) => {


    return (
        <Route {...rest} render={props => (
            localStorage.getItem('usuario') && restricted ? <Redirect to="/ventana" /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;