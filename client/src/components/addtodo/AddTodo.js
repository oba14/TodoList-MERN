import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTodo} from "../../actions/todoActions";
import uuid from 'uuid/v1';

const AddTodo = () => {

  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [dueDate, setDueDate] = useState('2019-12-25')
  const [done, setDone] = useState(false)
  const [category, setCategory] = useState('General')

  const add = (event) => {
    event.preventDefault()
    dispatch(addTodo({
      id: uuid(),
      title,
      text,
      dueDate,
      done,
      category
    }))
  }

  return (
    <div>
    <h3>Add New Task</h3>
  <form style={{margin: "15px"}} id="todoForm" onSubmit={add}>
    <label>Category </label>
    <select value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Select Category">
            <option value="general">General</option>
            <option value="sports">Sports</option>
            <option value="clothes">Clothes</option>
            <option value="travelling">Travelling</option>
            <option value="food">Food</option>
    </select> <br></br>
    
      <input onChange={(event) => setTitle(event.target.value)} name="Title" type="text" placeholder="Title"></input>
      <br></br>
      
    <input onChange={(event) => setText(event.target.value)} name="Text" type="text" placeholder="Text"></input>
    <br></br>
    
    <input onChange={(event) => setDueDate(event.target.value)} name="Due Date" type="date" value={dueDate}></input>
    
    <button type="submit">
      <span role="img" aria-label="Add">👍</span>
    </button>
  </form>
  </div>
  )
}

export default AddTodo;