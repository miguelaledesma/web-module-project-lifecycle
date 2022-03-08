import React from 'react'

export default class Form extends React.Component {
  render() {
    
    return (
      <>
        <form id = "todoForm" onSubmit = {this.props.todoFormSubmit}>
        <input
        value = {this.props.todoNameInput}
        onChange = {this.props.nameInputChange}
         type = 'text'
         placeholder = 'type todo'
         /> 

        <input 
        type = 'submit'
        />

        
      </form>
      <button onClick= {this.props.toggleDisplayCompleted}> {this.props.displayCompleted ? 'Hide' : 'Show' } Completed</button> 

      </>
    )
  }
}
