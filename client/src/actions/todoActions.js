import axios from 'axios';
const url = 'http://localhost:5000/todoList/';

export const addTodo = todo => {

    //axios.post('http://localhost:5000/todolist/add', )
    return async (dispatch) => {
        axios({
            method: 'post',
            url: `${url}add`,
            data: todo
        })
        .then(succ => {
            
            console.log("item successfully added", succ.status)
            dispatch({
                type: 'ADD_TODO',
                todo
            })
        })
        .catch(error => {
            console.log("Item couldnt added", error.message)
            dispatch({
                type: 'ERROR_FETCHING',
                error: error.message
            })
        })
    }
}

// Fetch todolist from mongodb and display item when component is rendered
export const showTodo = () => {
    return async (dispatch) => {
        dispatch({
            type: 'IS_FETCHING'
        })
        
        await axios(`${url}alldata`)
          .then(res => {
            dispatch({
                type: 'SHOW_TODOS',
                todos: res.data,
            })
            }) 
          .catch(error => { 
            console.log("Can’t access " + url + " response. Blocked by browser?")
            dispatch({
                type: 'ERROR_ADDING',
                error: error.message
            })
        })
    }
}

export const deleteTodo = id => {
    console.log('actions DELETED ID', id);
    
    return async (dispatch) => {
        axios({
            method: 'delete',
            url: `${url}delete/${id}`,
            data: id
        })
        .then(succ => {
            console.log("item successfully deleted", succ.status)
            dispatch({
                type: 'DELETE_TODO',
                id
            })
        })
        .catch(error => {
            console.log("Item couldnt deleted", error.message)
            dispatch({
                type: 'ERROR_DELETING',
                error: error.message
            })
        })
    }
}

export const toggleTodo = todo => {
    todo.done = !todo.done 
    console.log('STATUSSSSS', todo.done)
    return async (dispatch) => {
        // Sending put request to update the record in mongodb
        await axios({
            method: 'put',
            url: `http://localhost:5000/todolist/edit/${todo._id}`,
            data: todo
        })
        .then(succ => {
          console.log("item successfully UPDATED after TOGGLE MONGOOSE", succ.status)
          dispatch({
              type: 'TOGGLE_TODO',
              id: todo._id
          })  
        })
      .catch(error => {
          console.log("Item couldnt Updated after TOGGLE MONGOOSE", error.message)
          dispatch({
              type: 'ERROR_FETCHING',
              error: error.message
          })
      })
    }
}

export const editTodo = todo => {
    console.log('item TO BE UPDATED', todo);
    
    return async (dispatch) => {
    axios({
        method: 'put',
        url: `${url}edit/${todo._id}`,
        data: todo
      })
      .then(succ => {
          console.log("item successfully UPDATED MONGOOSE", succ.status)
          dispatch({
            type: 'EDIT_TODO',
            todo
            })  
        })
      .catch(error => {
          console.log("Item couldnt Updated MONGOOSE", error.message)
          dispatch({
              type: 'ERROR_FETCHING',
              error: error.message
          })  
        })
    }
}