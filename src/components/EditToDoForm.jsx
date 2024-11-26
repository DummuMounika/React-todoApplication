import { useState } from "react";

export default function EditToDoForm({editToDo, task}) {

  const [taskValue, setTaskValue] = useState(task.task);

  const handleChange = (e) => {
    setTaskValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(taskValue.trim()) {
      editToDo(taskValue, task.id);
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
        placeholder="Update Task" 
        value={taskValue}
        onChange={handleChange}
        />
        <button type="submit">Update Task</button>
      </form>
    </>
  );
}
