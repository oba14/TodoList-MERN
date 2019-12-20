import React from 'react';
import './Navigation.css';
import {NavLink} from 'react-router-dom'

const Navigation = () => {
    return(
        <div className="sidenav">
            <nav>
                <h3 className="sidenav-welcome">Welcome</h3>
                <NavLink to='/'>Home</NavLink> 
            </nav>
        </div>
    )
}
export default Navigation;