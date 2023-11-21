//Lista de tareas

import TaskForm from "../taskForm/taskForm";
import TaskItem from "../taskItem/taskItem";

export default function TaskList () {
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Tarea 1', completed: false },
        { id: 2, name: 'Tarea 2', completed: true }
    ]);
    
    useEffect(() => {
        console.log('Lista de tareas modificada');
        }, [
    tasks])
    
    const addTask = (newTask) => {
        const id = tasks.length + 1;
        setTasks([...tasks, { id, name: newTask, completed: false }]);
    } 

    const completeTask = (taskId) => {
        setTasks(tasks.map(task => {
          if(task.id === taskId) {
            return {...task, completed: true};
          }
          return task;
        }))
    } 

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    return (
        <div className="container-list">
                <div className="logoText">
                    <img src="src/assets/logo-tarea-24-7.png" alt="Logo de Tareas 24/7" />
                    <h2>Tareas</h2>
                </div>
            <div>
            <TaskForm onAdd={addTask} />

            {tasks.map(task => (
                <TaskItem  
                key={task.id}
                task={task}
                onComplete={completeTask}
                onDelete={deleteTask}
                />
            ))}
            </div>
        </div>
    );
}