import axios from 'axios';
const url = 'http://localhost:5000/todoList/';

export const addTodo = todo => {

    //axios.post('http://localhost:5000/todolist/add', )
    axios({
        method: 'post',
        url: `${url}add`,
        data: todo
      })
      .then(succ => console.log("item successfully added", succ.status))
      .catch(error => console.log("Item couldnt added", error.status))

    return {
        type: 'ADD_TODO',
        todo
    }
}

// Fetch todolist from mongodb and display item when component is rendered
export const showTodo = () => {
    return async (dispatch) => {
        try {
          const res = await axios(`${url}alldata`);
          const data = res.data;
          dispatch({
            type: 'SHOW_TODOS',
            todos: data,
          })
        } catch(error) { console.log("Can’t access " + url + " response. Blocked by browser?")}
}
}

export const deleteTodo = id => {
    console.log('actions DELETED ID', id);
    
    axios({
        method: 'delete',
        url: `${url}delete/${id}`,
        data: id
      })
      .then(succ => console.log("item successfully deleted", succ.status))
      .catch(error => console.log("Item couldnt deleted", error.status))

      

    return {
        type: 'DELETE_TODO',
        id
    }
}

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}

export const editTodo = todo => {
    console.log('item TO BE UPDATED', todo);
    
    axios({
        method: 'put',
        url: `${url}edit/${todo._id}`,
        data: todo
      })
      .then(succ => console.log("item successfully UPDATED MONGOOSE", succ.status))
      .catch(error => console.log("Item couldnt Updated MONGOOSE", error.status))


    return {
        type: 'EDIT_TODO',
        todo
    }
}