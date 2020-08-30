import React, { useState, useContext } from 'react';
import AppContext from './AppContext';
import PackageCard from './PackageCard';


const PackageContainer = (props: any) => {
    // const [currentPackages, setCurrentPackages] = useState([]);
    const {filteredPackages} = useContext(AppContext);
    return (
        <div>
            {filteredPackages.map(elem => <PackageCard package={elem} key={elem.id}/>)}
        </div>
    )
}

export default PackageContainer;