import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route
            component={(props)=>(
                (!isAuthenticated)
                    ? <Component {...props} />
                    : <Redirect to='/' />
            )}
            {...rest}
        />
    );
};
