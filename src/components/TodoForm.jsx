import { useState } from "react";

export default function TodoForm({addToDo}) {

  const [taskValue, setTaskValue] = useState("");

  const handleChange = (e) => {
    setTaskValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(taskValue.trim()) {
      addToDo(taskValue);
      setTaskValue("");
    }else{
      alert("Task cannot be empty!");
    } 
  };

  return(
    <>
      <form onSubmit={handleSubmit} className= "form">
        <input className="form-input"
        type="text" 
        placeholder="what is the task today?" 
        value={taskValue}
        onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
    </>
  );
}
