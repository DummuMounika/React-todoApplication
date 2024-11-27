import React, { useReducer } from 'react'
// import { useState } from "react";
import TodoForm from './TodoForm'
import TodoItem from './TodoItem';
import EditToDoForm from './EditToDoForm';


const initialState = [];
const reducer = (state, action) => {
  switch(action.type) {
    case "ADD":
      return [...state, { id: Date.now(), task: action.payload, completed: false , isEditing: false }];
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    case "TOGGLE":
      return state.map((item) => item.id === action.payload ? {...item, completed: !item.completed}: item);
    case "EDIT":
      return state.map((item) => item.id === action.payload ? {...item, isEditing : !item.isEditing}: item);
    case "EDITTASK":
      return state.map((item) => item.id === action.payload.id ? {...item, task: action.payload.task, isEditing : !item.isEditing}: item);
    default:
      return state;
    }

}
export default function TodoWrapper() {
    const [tasks, dispatch] = useReducer(reducer, initialState);

    const addToDoTask = (task) => dispatch({type: "ADD" , payload: task});
    const editToDoTask = (id) => dispatch({type: "EDIT" , payload: id});
    const editTask = (task, id) => dispatch({type: "EDITTASK" , payload: {task, id}});
    const toggleToDoTask = (id) => dispatch({type: "TOGGLE" , payload: id});
    const deleteToDoTask = (id) => dispatch({type: "DELETE" , payload: id});

    return (
      <div>
        <TodoForm addToDo={addToDoTask} />
        {tasks.map((todo) => (
            todo.isEditing ? 
            (<EditToDoForm key={todo.id} editToDo={editTask} task={todo}/>) : 
             (<TodoItem task={todo} 
                      key={todo.id} 
                      toggleCompletion={toggleToDoTask}
                      deleteToDo = {deleteToDoTask} 
                      editToDo= {editToDoTask}/> )
        ))}
      </div>
    )
}
