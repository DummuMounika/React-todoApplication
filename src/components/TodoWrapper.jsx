import React, { useEffect, useReducer, useState } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem';
import EditToDoForm from './EditToDoForm';
import { BrowserRouter as Router,Switch , Route, Routes } from 'react-router-dom';

const getInitialState = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const reducer = (state, action) => {
  switch(action.type) {
    case "ADD":
      return [...state, { id: Date.now(), task: action.payload, completed: false , isEditing: false , tobeDone: Date()}];
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    case "TOGGLE":
      return state.map((item) => item.id === action.payload ? {...item, completed: !item.completed}: item);
    case "EDIT":
      return state.map((item) => item.id === action.payload ? {...item, isEditing : !item.isEditing}: item);
    case "EDITTASK":
      return state.map((item) => item.id === action.payload.id ? {...item, task: action.payload.task, isEditing : !item.isEditing}: item);
    case "ADDDATE":
      return state.map((item) => 
        item.id === action.payload.id ? {...item, tobeDone: action.payload.date }: item);
    default:
      return state;
    }

}
export default function TodoWrapper() {

    
    const [tasks, dispatch] = useReducer(reducer, [], getInitialState);

     useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks))
     }, [tasks]);

  

    const addToDoTask = (task) => dispatch({type: "ADD" , payload: task});
    const editToDoTask = (id) => dispatch({type: "EDIT" , payload: id});
    const editTask = (task, id) => dispatch({type: "EDITTASK" , payload: {task, id}});
    const toggleToDoTask = (id) => dispatch({type: "TOGGLE" , payload: id});
    const deleteToDoTask = (id) => dispatch({type: "DELETE" , payload: id});
    const addToDoDate = (id,date) => dispatch({type: "ADDDATE", payload: {id,date}});

    const completedTasks = tasks.filter((task)=>task.completed);
    const pendingTasks = tasks.filter((task)=>!task.completed);
    
    return (
      <div>

        {/* <Router>
              <Routes>
              <Route path="/toDoItems" exact Component={TodoItem}></Route>
              </Routes> */}
              
            <TodoForm addToDo={addToDoTask} />
            <button>Add To Do Task</button>
            {pendingTasks.length > 0 && <h3>Pending Task</h3>}    
            {pendingTasks.map((todo) => (
                todo.isEditing ?  (<EditToDoForm 
                  key={todo.id} 
                  editToDo={editTask}
                  task={todo}/>) :  (<TodoItem 
                          task={todo} 
                          key={todo.id} 
                          toggleCompletion={toggleToDoTask}
                          deleteToDo = {deleteToDoTask} 
                          editToDo= {editToDoTask}
                          addToDoDate={addToDoDate}
                          />)
            ))}
            
            {completedTasks.length > 0 && <h3>Completed Task</h3>}
            {completedTasks.map((todo) => (
                todo.isEditing ?  (<EditToDoForm 
                  key={todo.id} 
                  editToDo={editTask}

                  task={todo}/>) :  (<TodoItem 
                          task={todo} 
                          key={todo.id} 
                          toggleCompletion={toggleToDoTask}
                          deleteToDo = {deleteToDoTask} 
                          editToDo= {editToDoTask}
                          addToDoDate={addToDoDate}
                          />)
            ))}
        {/* </Router>      */}
      </div>
    )
}
