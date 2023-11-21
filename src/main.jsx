import React from 'react'; // Creo que en versiones recientes no es necesario
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importando el componente App
import './index.css'; // Importando estilos globales

// Colocando la aplicación en el elemento raíz del DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
