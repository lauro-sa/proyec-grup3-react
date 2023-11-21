// Formulario para agregar tarea

import { useState } from "react"

export default function TaskForm ({onAdd}) {
    const [newTask, setNewTask] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(newTask);
        setNewTask('');
    }

    return(
        <form action="" onSubmit={handleSubmit}>
            <input type="text" 
                value={newTask}
                onChange={(e)=> setNewTask(e.target.value)}
            />
            <button type="submit"><Agregar></Agregar></button>
        </form>
    )   
}