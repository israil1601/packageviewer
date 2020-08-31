import {useState} from 'react';

export const useApp = () => {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    return {
        packages,
        setPackages,
        filteredPackages,
        setFilteredPackages
    }

    
}

