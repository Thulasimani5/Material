import React, { useState, useEffect } from 'react';
import './Slidebar.css';

const Slidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <h2>Sidebar</h2>
            <p>This is a sliding sidebar.</p>
        </div>
    );
};

export default Slidebar;
