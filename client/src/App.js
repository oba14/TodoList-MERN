import React from 'react'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import MainToDoList from './components/MainToDoList'

function App() {
    return (
        <BrowserRouter>
            <Route exact path = '/' component = {LandingPage} />
            <Route path= '/todolist' component = {MainToDoList}/>
        </BrowserRouter>
    );
};

export default App;
