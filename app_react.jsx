const MyTasksForm = (props) => {
return (
    <form className="form" id="taskForm" onSubmit={(event) => props.onSubmit(event)}>
            <div className="form-group">
                <label htmlFor="taskTitle" className="form-label">
                    Mau Ngapain Hari Ini?
                </label>
                <input className="form-input form-input--full" type="text" id="taskTitle"
                name="taskTitle" placeholder="Masukkan Kegiatan" onChange={(event) => props.setTaskTitle(event.target.value)}
                value={props.taskTitle}/>
            </div>
            <div className="form-group form-group--button-right">
                <button className="button" type="submit">Simpan</button>
            </div>
        </form>
)
};

const MyTasksList = (props) => {
    return (
        <div className="tasks">
            <h2 className="tasks-title">Agenda Ku</h2>
            <ul className="tasks-list" id="tasks-list">
            {
                props.tasks.length > 0 ? (
                props.tasks.map((task,index) => 
                    <li key={task.id}  className={`tasks-list-item ${task.checked ? "checked" : ""}`}>
                    <div className="task">
                        <input 
                        type="checkbox" 
                        checked={task.checked} 
                        onChange={event => props.checkTask(event,index)} 
                        />
                        <span className="task-title">{task.title}</span>
                        <button className="button" onClick={() => props.deleteTask(index)}>Hapus</button>
                    </div>
                    </li>)
                ) : (
                <li className="tasks-list-item">Tidak Ada Kegiatan</li>
                )
            }
            </ul>
        </div>
    );
};

const MyTasksContainer = (props) => {
    return <div className="container">{props.children}</div>;
    
};

const App = () => {

    const [taskTitle, setTaskTitle] = React.useState("");
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const handleAddTasks = (event) => {
        event.preventDefault();
        if (taskTitle.trim() === "") {
            alert("Judul Tugas Tidak Boleh Kosong");
            return;
        }

    const newTask = {
        id: tasks.length + 1,
        title: taskTitle,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]))
    };

    const deleteTask = (taskIndex) => {
        const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    const checkTask = (event, taskIndex) => {
        const isChecked = event.target.checked;
        const updatedTasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return { ...task, checked: isChecked };
            }
            return task;
        })
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return (
        <MyTasksContainer>
            <MyTasksForm onSubmit={handleAddTasks} taskTitle={taskTitle} setTaskTitle={setTaskTitle} />
            <MyTasksList tasks={tasks} deleteTask={deleteTask} checkTask={checkTask} />
        </MyTasksContainer>
    )
};  

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);