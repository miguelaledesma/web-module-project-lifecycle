import React from 'react'
import axios from 'axios'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
   state = {
     todos: [],
     error: '',
     todoNameInput: '', 
     displayCompleted: true,  
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
       this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data)})
       this.resetForm()
     })
     .catch(this.setAxiosResponseError)
   }

setAxiosResponseError = err => {this.setState({ ...this.state, error: err.response.data.message }) }


   //reset for the form 
   resetForm = () => {
    this.setState({
      ...this.state, todoNameInput: ''
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
    .catch(this.setAxiosResponseError)

   }

   toggleCompleted = id => evt =>  {
     axios.patch(`${URL}/${id}`)
     .then(res => {
       this.setState({ ...this.state, todos: this.state.todos.map(item => {
         if(item.id !== id) {
           return item
         } else{
           return res.data.data
         }
       })})
      })
     .catch(this.setAxiosResponseError)
   }

   toggleDisplayCompleted = () => {
     this.setState({
       ...this.state, displayCompleted: !this.state.displayCompleted
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
          this.state.todos.reduce((acc, todo) => {
            
            if(this.state.displayCompleted || todo.completed) return acc.concat(
              <div onClick = {this.toggleCompleted(todo.id)} key ={todo.id} >{todo.name} {todo.completed ? ' ' : '✔️'} </div>
            )
            return acc
          }, [])
            // return <div onClick = {this.toggleCompleted(todo.id)} key ={todo.id} >{todo.name} {todo.completed ? ' ✔️' : ''} </div>
            
          
        }
      </div>
      <Form 
      todoFormSubmit = {this.todoFormSubmit}
      todoNameInput = {this.todoNameInput}
      nameInputChange = {this.nameInputChange}
      toggleDisplayCompleted = {this.toggleDisplayCompleted}
      displayCompleted = {this.state.displayCompleted}
      /> 

      </div>
    )
  }
}
