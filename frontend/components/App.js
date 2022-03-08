import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
   state = {
     todos: [],
     error: '',
     todoNameInput: '', 
   }


   //slice of state to be able to input changes

   nameInputChange = evt => {
     const { value } = evt.target
     this.setState({ ...this.state, todoNameInput: value})
   }



   //post new todo
   postNewTodo = () => {
     axios.post(URL, { name: this.state.todoNameInput })
     .then(res => {
       this.fetchAllTodos()
       this.setState({
         ...this.state, todoNameInput: ''
       })
     })
     .catch(err => {
       this.setState({
         ...this.state, error: err.response.data.message
       })
     })
   }

   //submit 

   todoFormSubmit = evt => {
     evt.preventDefault()
     this.postNewTodo()
   }

   //helper to get all the todos 

   fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state, 
        todos: res.data.data
      })
    })
    .catch(err => {
      this.setState({
        ...this.state, error: err.response.data.message
      })
    })

   }

   componentDidMount() {
     //fetch all the todos from the server 
     this.fetchAllTodos()
   }

  render() {
    return (
      <div>
      <div id = 'error'> {this.state.error}</div>
      <div id = "todos">
        <h2>Todos:</h2>
        {
          this.state.todos.map(todo => {
            return <div key ={todo.id} >{todo.name} </div>
            
          })
        }
      </div>
      <form id = "todoForm" onSubmit = {this.todoFormSubmit}>
        <input
        value = {this.state.todoNameInput}
        onChange = {this.nameInputChange}
         type = 'text'
         placeholder = 'type todo'
         /> 

        <input 
        type = 'submit'
        />

        <button>Clear Completed</button> 
      </form>

      </div>
    )
  }
}
