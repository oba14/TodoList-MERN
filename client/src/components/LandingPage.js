import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navigation.css'

const WelcomePage = () => {
    return (
        <div className='container' >
            <div className='row'>
                <div className= 'col-md'>
                    <div className = "landing-welcome">
                        <h1>Todo List built with MERN Stack</h1>
                        <NavLink to= '/todolist'>Start Using TodoList</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default WelcomePage