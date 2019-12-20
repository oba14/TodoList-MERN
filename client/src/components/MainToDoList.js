import React from 'react';
import AddTodo from './addtodo/AddTodo'
import TodoList from './todolist/TodoList'
import Navigation from './Navigation'

const MainToDoList = () => {
    return (
        <div className="container">
            < Navigation />
            <div className="row">
                <div className="col-md-4">
                    <AddTodo />
                </div>
                <div className="col-md-6">
                    <TodoList/>
                </div>
            </div>
        </div>
    )
}
export default MainToDoList