import React from 'react'
import { useState } from "react";
import TodoForm from './TodoForm'
import TodoItem from './TodoItem';
import EditToDoForm from './EditToDoForm';

export default function TodoTask() {
    const [toDoTask, settoDoTask] = useState([]);

    const addToDo = (toDo) => {
        settoDoTask([...toDoTask, 
            {
                id:Date.now(), 
                task: toDo, 
                completed: false , 
                isEditing: false
            }]) 
    }
    console.log(toDoTask);

    const toggleTaskCompletion = (taskId) => {
      settoDoTask(
        toDoTask.map((task) => 
          task.id === taskId ?
            { ...task, completed: !task.completed}
            : task
        )
      );
    };

    const deleteToDo = (taskId) => {
      settoDoTask(
        toDoTask.filter((task) => 
        task.id !== taskId ))
    }

    const editToDo = (taskId) => {
      settoDoTask(
        toDoTask.map((task) => 
        task.id === taskId ?
        { ...task, isEditing: !task.isEditing} : task)
      );
    };

    const editTask = (task, id) => {
      settoDoTask(
        toDoTask.map((toDo) => 
          toDo.id === id ?
        { ...toDo, task, isEditing : !toDo.isEditing}: toDo)

      )
    }

    return (
      <div>
        <TodoForm addToDo={addToDo} />
        {toDoTask.map((todo) => (
            todo.isEditing ? 
            (<EditToDoForm editToDo={editTask} task={todo}/>) : 
             (<TodoItem task={todo} 
                      key={todo.id} 
                      toggleCompletion={toggleTaskCompletion}
                      deleteToDo = {deleteToDo} 
                      editToDo= {editToDo}/> )
        ))}
      </div>
    )
}
