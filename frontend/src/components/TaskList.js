
const TaskList = ({ tasks, deleteTask }) => {

  return (
    <>
      
      <div className='list'>
      <table>
        <tr>
          <th>User Name</th>
          <th> Task Title</th>
          <th>Action</th>
        </tr>
        {tasks.map((task, i) => (
          <tr key={i}>
            <td>{task.userDetails?.name}</td>
            <td>{task.taskDetails?.taskName}</td>
            <td><button className="btn" onClick={() => deleteTask(task?.id)}>Delete</button></td>
          </tr>
        ))}

      </table>
      </div>
      
      <style>
        {`
        .btn{
        margin: 5px 0 5px 0;
        background-color: dimgrey;
        color: white;
        padding: 5px 20px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        }
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        table{
           margin: auto;
           width: 50%;
           padding: 10px;
        }
        .btn:hover {
            background-color: red;
        }

      `}
      </style>
    </>

  );
};

export default TaskList;
