import React, { useState } from 'react'
import { deleteTodo, toggleTodo, editTodo } from '../../../actions/todoActions';
import { useDispatch } from 'react-redux';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './TodoItem.css'

const Todo = ({title, text, dueDate, id, done, _id, category}) => {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedText, setEditedText] = useState(text)
  const [editedDueDate, setEditedDueDate] = useState(dueDate)
  const [toggleStatus, setToggleStatus] = useState(true)

  const saveEditedTodo = () => {
    dispatch(editTodo({
      id,
      _id, // Mongodb id
      done,
      title: editedTitle,
      text: editedText,
      dueDate: editedDueDate,
      category
    }))
    setEditing(false)
  }
  
  return (
    <div style={{margin: "10px"}}>
      { !editing && (
         <Card className= {toggleStatus ? "cards" : "cards-line-through" }>
          <CardImg variant="top" style={{ width: '100%' }}/>
          <CardBody style={{ width: '100%' }}>
          <CardTitle>Title:{title}</CardTitle>
          <CardText>Category: {category}</CardText>
          <CardText> Description: {text}</CardText>
          <CardText> Duedate: {dueDate}</CardText>
          <CardText> {`Done: ${done}`}</CardText>
          <Button className= "button" onClick={() => dispatch(deleteTodo(_id))} >  
            <span role="img" aria-label="delete">❌</span>
          </Button>
          <Button className= "button" onClick={() => {
            dispatch(toggleTodo({
              id,
              _id, // Mongodb id
              done,
              title,
              text,
              dueDate,
              category
            }))
            setToggleStatus(!toggleStatus)
            }
          } type='button'>Mark as Done</Button>
          <Button className= "button" onClick={() => setEditing(true)}type='button'>
         <span role="img" aria-label="edit">📝</span>
           </Button>
         </CardBody>
        </Card>
      )}

      { editing && (
        <div className= "todo-item">
          <input onChange={(event) => setEditedTitle(event.target.value)} type="text" name="Title" value={editedTitle}></input>
          <input onChange={(event) => setEditedDueDate(event.target.value)} type="text" name="Due Date" value={editedDueDate}></input>
          <input onChange={(event) => setEditedText(event.target.value)} type="text" name="Text" value={editedText}></input>
          <button onClick={() => setEditing(false)} type='button'>Cancel</button>
          <button onClick={() => saveEditedTodo()} type='button'>Save</button>
        </div>
      )}
    </div>
  )
}

export default Todo