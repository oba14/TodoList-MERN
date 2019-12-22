const initialState = {
  todos: [],
  isFetching: false,
  error: null,
  error_adding: false,
  error_deleting: false
}
/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
const todoReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'IS_FETCHING':
      return {
        ...state,
        todos: [],
        isFetching: true,
        error: null,
        error_adding: false,
        error_deleting: false
      }

    case 'ERROR_FETCHING':
      return {
        ...state,
        todos: [],
        isFetching: false,
        error: action.error,
        error_adding: false,
        error_deleting: false
      }  

    case 'SHOW_TODOS':
    return {
      ...state, 
      todos: action.todos,
      isFetching: false,
      error: null,
      error_adding: false,
      error_deleting: false
    }
    
    case 'ERROR_DELETING':
      return {
        ...state,
        error_deleting: true
      }

    case 'ERROR_ADDING':
      return {
        ...state,
        error_adding: true
      } 
      
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos,{
          id: action.todo.id,
          title: action.todo.title,
          text: action.todo.text,
          dueDate: action.todo.dueDate,
          done: false,
          category: action.todo.category
        }],
        isFetching: false,
        error: null,
        error_adding: false,
        error_deleting: false
      }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.id),
        isFetching: false,
        error: null,
        error_adding: false,
        error_deleting: false
      } 

    case 'TOGGLE_TODO':

      return {
        ...state,
        todos: state.todos.map(todo => {
        if(todo._id === action.id) {
          todo.done = !todo.done
        }
        return todo
      }),
      isFetching: false,
      error: null,
      error_adding: false,
      error_deleting: false
    }
    
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => {
        if (todo.id === action.todo.id) {
          return action.todo
        }
        return todo
      }),
      isFetching: false,
      error: null,
      error_adding: false,
      error_deleting: false
    }

    default:
      return state
  }
}

export default todoReducer
