import { useState } from "react";
import './taskForm.css';

// Componente FormularioAgregarTarea: permite a los usuarios ingresar y agregar nuevas tareas.
export default function FormularioAgregarTarea({ onAdd }) {
    // Estado para almacenar el valor actual del input de la nueva tarea.
    const [nuevaTarea, setNuevaTarea] = useState('');
    // Estado para rastrear si el input está enfocado.
    const [isFocused, setIsFocused] = useState(false);

    // Manejador para establecer el estado de enfoque a verdadero.
    const handleFocus = () => {
        setIsFocused(true);
    };

    // Manejador para establecer el estado de enfoque a falso.
    const handleBlur = () => {
        setIsFocused(false);
    };

    // Manejador para el envío del formulario. Previene la recarga de la página y añade la nueva tarea.
    const handleSubmit = (e) => {
        e.preventDefault();
        // Verifica si el texto de la nueva tarea está vacío o solo contiene espacios en blanco
        if (!nuevaTarea.trim()) {
            // Muestra una alerta al usuario
            alert("Por favor, ingresa un texto para la tarea.");
            return; // Detiene la ejecución de la función
        }
        // Llama a la función onAdd y agrega la tarea
        onAdd(nuevaTarea);
        setNuevaTarea(''); // Reinicia el campo de entrada
    };
    return (
        <form className="formulario-agregar-tarea" onSubmit={handleSubmit}>
            <input className={`input-tarea ${isFocused ? 'focused' : ''}`}
                type="text"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Agregar nueva tarea..." 
            />
            <button className="boton-agregar" type="submit">Agregar</button>
        </form>
    );
}
