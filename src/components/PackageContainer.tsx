import React, { useState, useContext } from 'react';
import AppContext from './AppContext';
import PackageCard from './PackageCard';
import "../styles/PackageContainer.css";

const PackageContainer = (props: any) => {
    // const [currentPackages, setCurrentPackages] = useState([]);
    const {filteredPackages} = useContext(AppContext);
    return (
        <div className="packageContainer">
            {filteredPackages.map(elem => <PackageCard package={elem} key={elem.id}/>)}
        </div>
    )
}

export default PackageContainer;