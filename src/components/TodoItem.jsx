import { useState } from "react";

export default  function TodoItem({task, toggleCompletion, deleteToDo, editToDo, addToDoDate}) {
  const [selectDate,setSelectedDate] = useState(task.toBeDone||'');
  console.log(" seleted date:",selectDate)
  const handleDateChange = (event) => {
      const newDate=event.target.value;
      setSelectedDate(newDate);
      addToDoDate(task.id,newDate);
    };

  // const toggleCompletion = () => {
  //   setSelectedDate(selectDate);
  // }

  return (
    <>
      <div className="todo-item">
        <p>
            {task.task} {task.completed ? "Completed" : "Pending"}
        </p>
        <div className="button-container">
          <button className="btn-edit" onClick={()=>editToDo(task.id)}>
            Edit Task
          </button>
          <button className="btn-delete" onClick={()=>deleteToDo(task.id)}>
            Delete Task
          </button>
          <input 
            type="date"  
            value={selectDate} 
            onChange={handleDateChange} 
          />
          <p>
             {task.toBeDone !== "" ? `To be Done on: ${selectDate}` : "No due date set"}
          </p>
            
          
          <button className="btn-Taskstatus"
           onClick={() => {
            toggleCompletion(task.id);
            }}>
            {task.completed ?  "Mark as Pending": "Mark as Completed"}
            </button>
        </div>
      </div>
    </>
  );
}
