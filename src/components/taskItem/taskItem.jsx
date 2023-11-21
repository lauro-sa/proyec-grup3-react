//Componente de Tarea individual.

export default function TaskItem ({task, onComplete, onDelete}){
    return (
        <div className={task.completed ? 'task-item completed' : 'task-item'}>
            <p>{task.name}</p>
            <button onClick={() => onComplete(task.id)}>Completar</button>
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
        </div>
    )
}