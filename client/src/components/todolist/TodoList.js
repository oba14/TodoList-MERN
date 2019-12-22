import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Todo from '../todolist/todoitem/TodoItem'
import { showTodo } from '../../actions/todoActions'
import './TodoList.css'

const TodoList = () => {
  let todos = useSelector(state => state.todos.todos);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [status, setStatus] = useState('all');
  const [filterCategories, setFilterCategories] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    
    fetchData();
  }, [])

  useEffect(() => {
    
    switch(status) {
      case 'all': setFilteredTodos(todos)
          break

      case "true":
          setFilteredTodos(todos.filter(todo => {
            return todo.done === true
          }))
          break
      case "false":
          setFilteredTodos(todos.filter(todo => {
            return todo.done === false
          }))
          break
      case 'categories':
          setFilteredTodos(todos.filter(todo => {
            return todo.category === filterCategories
          }))
          break
      case 'default':
          break
    }
  }, [status, todos, filterCategories])

  const fetchData = () => {
    dispatch(showTodo())
  }

  return (
    <div>
      <div >
        <label> Filter by Category: </label>
        <select value={filterCategories} onChange={(event) => 
          {setFilterCategories(event.target.value)
            setStatus('categories')
          }}>
            <option value="select">Select</option>
            <option value="general">General</option>
            <option value="sports">Sports</option>
            <option value="clothes">Clothes</option>
            <option value="travelling">Travelling</option>
            <option value="food">Food</option>
        </select> <br></br>
        
        <label>Filter by Status: </label>        
        <select value={status} onChange={(event) => 
          {setStatus(event.target.value)
          }}>
            <option default value="select">Select</option>
            <option value="all">Entire List</option>
            <option value= "true"  >Done todos</option>
            <option value= "false" >Pending todos</option>
        </select>
      </div>
      <div className="todo-list">
        {filteredTodos.map(todo => <Todo key={todo.id} {...todo}/>)}
      </div>
    </div>
  )
}

export default TodoList;