import React, { useContext } from 'react';
import AppContext from './AppContext';
import { Redirect } from 'react-router';

const ProtectedRoute = (props) => {
    const {packages} = useContext(AppContext);
    
    return packages.length ? props.children : <Redirect to="/" />
}

export default ProtectedRoute;