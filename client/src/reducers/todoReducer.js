import axios from 'axios';

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
const todoReducer = (state = [], action) => {
  switch (action.type) {

    case 'SHOW_TODOS':
    return action.todos
    

    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.todo.id,
          title: action.todo.title,
          text: action.todo.text,
          dueDate: action.todo.dueDate,
          done: false,
          category: action.todo.category
        }
      ]

    case 'DELETE_TODO':
      return state.filter(todo => todo._id !== action.id) 

    case 'TOGGLE_TODO':

      return state.map(todo => {
        if(todo._id === action.id) {
          todo.done = !todo.done
          
          // Sending put request to update the record in mongodb
          axios({
            method: 'put',
            url: `http://localhost:5000/todolist/edit/${todo._id}`,
            data: todo
          })
          .then(succ => console.log("item successfully UPDATED after TOGGLE MONGOOSE", succ.status))
          .catch(error => console.log("Item couldnt Updated after TOGGLE MONGOOSE", error.status))
        }
        return todo
      })
    
    case 'EDIT_TODO':
      return state.map(todo => {
        if (todo.id === action.todo.id) {
          return action.todo
        }
        return todo
      })

    default:
      return state
  }
}

export default todoReducer

// const todoReducer = (todos = [], action) => {
//     switch (action.type) {
//         case 'ADD_TODO':
//             return [{id: action.id, title: action.title, done: false}, ...todos];
//         case 'REMOVE_TODO':
//             return todos.filter(todo => todo.id !== action.id);
//         case 'UPDATE_TODO':
//             return todos.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo);
//         case 'TOGGLE_DONE_TODO':
//             return todos.map(todo => todo.id === action.id ? {...todo, done: !todo.done} : todo);
//         default:
//             return todos
//     }
// };

// export default todoReducer