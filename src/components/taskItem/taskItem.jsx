import './taskItem.css';

// Componente ItemTarea: Representa una tarea individual en la lista.
export default function ItemTarea({ task, onComplete, onDelete, showCompleteButton, showRecoverButton, onRecover }) {
    return (
        // Contenedor para cada tarea individual.
        <div className='item-tarea'>

            {/* Muestra el nombre de la tarea. Si está completada, aplica una clase para estilizarla como completada. */}
            <p className={task.completed ? 'tarea-completada' : ''}>{task.name}</p>

            {/* Si showCompleteButton es verdadero, muestra el botón para marcar la tarea como completada. */}
            {showCompleteButton && (
                <button className="boton completar" onClick={() => onComplete(task.id)}>
                    Completar
                </button>
            )}

            {/* Si onDelete está definido, muestra el botón para eliminar la tarea. */}
            {onDelete && (
                <button className="boton eliminar" onClick={() => onDelete(task.id)}>
                    Eliminar
                </button>
            )}

            {/* Si showRecoverButton es verdadero, muestra el botón para recuperar una tarea eliminada. */}
            {showRecoverButton && (
                <button className="boton recuperar" onClick={() => onRecover(task.id)}>
                    Recuperar
                </button>
            )}
        </div>
    );
}
