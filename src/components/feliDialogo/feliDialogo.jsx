import React from 'react';
import './feliDialogo.css';

// Componente FeliDialogo: muestra un mensaje de felicitaciones al usuario.
export default function FeliDialogo({ onClose }) {
    return (
        <div className="info-dialog-overlay">
            <div className="info-dialog-box">
                <h3>¡Felicidades!</h3>
                <h5>Has completado todas tus tareas</h5>
                <p className='f-2'>🎉👏🥳</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
