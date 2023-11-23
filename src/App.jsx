import React from 'react'; // Importando React (opcional en las versiones más recientes de React)
import './App.css'; // Importando los estilos CSS

import TaskList from './components/taskList/taskList'; // Asegúrate de que la ruta sea correcta

function App() {
  // Renderizando el componente TaskList
  return (
    <>
      <TaskList />
    </>
  );
}

export default App;
