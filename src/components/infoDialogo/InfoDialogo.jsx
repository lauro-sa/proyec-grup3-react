import React from 'react';
import './infoDialogo.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

// Componente InfoDialogo: Muestra un cuadro de diálogo con información sobre la aplicación.
export default function InfoDialogo({ openDialog }) {

    // Función para manejar el cierre del cuadro de diálogo.
    const handleClose = () => {
        openDialog(); // Llama a la función openDialog para cerrar el cuadro de diálogo.
    };

    return (
        // Capa oscura que cubre la pantalla, cerrando el cuadro de diálogo al hacer clic fuera de él.
        <div className="info-dialog-overlay" onClick={openDialog}>
            {/* Cuadro de diálogo que muestra la información. Detiene la propagación del clic para evitar el cierre al hacer clic dentro del cuadro. */}
            <div className="info-dialog-box" onClick={(e) => e.stopPropagation()}>
                <h3>Información</h3>
                <h5>SwiftTick</h5>
                {/* Descripción de la aplicación */}
                <p>Es una aplicación de gestión de tareas intuitiva y fácil de usar, diseñada para ayudarte a organizar y priorizar tus tareas diarias. Esta aplicación fue creada como parte de un proyecto final en el curso de Desarrollo Web Con React de Argentina Programa. SwiftTick te permite agregar, completar y eliminar tareas con facilidad, ayudándote a mantener el control de tu lista de tareas y mejorar tu productividad.</p>
                {/* Créditos de los desarrolladores y diseñadores */}
                <p>Dev: Vicky, Karo y Sal <br></br>
                Diseño: Vicky, Karo y Sal</p>
                {/* Botón para cerrar el cuadro de diálogo */}
                <button onClick={handleClose}>Cerrar</button>
            </div>
        </div>
    );
}
