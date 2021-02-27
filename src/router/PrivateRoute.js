import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route
            component={(props)=>(
                (isAuthenticated)
                    ? <Component {...props} />
                    : <Redirect to='/auth' />
            )}
            {...rest}
        />
    );
};
