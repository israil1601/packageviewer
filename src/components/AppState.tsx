import React from 'react';
import AppContext from  './AppContext'
import { useApp } from '../hooks/useApp';

const AppState = (props) => {
    const appContext = useApp();
    return (<AppContext.Provider value={appContext}>
        {props.children}
    </AppContext.Provider>)
}

export default AppState;