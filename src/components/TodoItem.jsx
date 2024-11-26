export default  function TodoItem({task, toggleCompletion, deleteToDo, editToDo, statusToDo}) {
  return (
    <>
      <div className="todo-item">
        <p>
          {task.task} - {task.completed ? "Completed" : "Pending"}
        </p>
        <div className="button-container">
          <button className="btn-edit" onClick={()=>editToDo(task.id)}>Edit Task</button>
          <button className="btn-delete" onClick={()=>deleteToDo(task.id)}>Delete Task</button>
          <button className="btn-Taskstatus"
           onClick={() => {toggleCompletion(task.id)}}>
            Mark as Completed</button>
        </div>
      </div>
    </>
  );
}
