import React, { useState, useEffect } from 'react';
import TaskForm from "../taskForm/taskForm";
import TaskItem from "../taskItem/taskItem";
import InfoDialogo from "../infoDialogo/Infodialogo";
import FeliDialogo from "../feliDialogo/feliDialogo";
import './taskList.css';

// Componente ListaDeTareas: Maneja la lista completa de tareas, incluyendo añadir, completar y eliminar tareas.
export default function ListaDeTareas() {
    // Estado para las tareas actuales, inicializadas desde localStorage.
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    // Estado para las tareas que se eliminaron.
    const [deletedTasks, setDeletedTasks] = useState(() => {
        const savedDeletedTasks = localStorage.getItem('deletedTasks');
        return savedDeletedTasks ? JSON.parse(savedDeletedTasks).slice(0, 3) : [];
    });

    // Estado para controlar la apertura del cuadro de diálogo de información.
    const [dialogOpen, setDialogOpen] = useState(false);

    // Estado para controlar si se muestra el cuadro de diálogo de felicitaciones.
    const [showCongratsDialog, setShowCongratsDialog] = useState(false);

    // Estado para rastrear si el cuadro de diálogo de felicitaciones se ha mostrado.
    const [congratsDialogShown, setCongratsDialogShown] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        const initialTasks = savedTasks ? JSON.parse(savedTasks) : [];
        return initialTasks.length > 0 && initialTasks.every(task => task.completed);
    });

    // Efecto para guardar las tareas y las tareas eliminadas en localStorage.
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Asegurarse de que solo las últimas 3 tareas eliminadas se guarden
        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks.slice(0, 3)));
    }, [tasks, deletedTasks]);

    // Efecto para comprobar si todas las tareas están completadas después de cualquier actualización en las tareas.
    useEffect(() => {
        const areAllTasksCompleted = tasks.length > 0 && tasks.every(task => 
            task.completed && !deletedTasks.some(deletedTask => deletedTask.id === task.id)
        );
    
        if (areAllTasksCompleted && !congratsDialogShown) {
            setShowCongratsDialog(true);
            setCongratsDialogShown(true);
        }
    }, [tasks, deletedTasks, congratsDialogShown]);
    

    // Función para añadir una nueva tarea a la lista.
    const addTask = (newTask) => {
        const id = new Date().getTime(); // Genera un ID único
        setTasks([...tasks, { id, name: newTask, completed: false }]);
        setCongratsDialogShown(false);
    };

    // Función para marcar una tarea como completada.
    const completeTask = (taskId) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
        setCongratsDialogShown(false);
    };

    // Función para eliminar una tarea de la lista.
    const deleteTask = (taskId) => {
        const taskToDelete = tasks.find(task => task.id === taskId);
        setDeletedTasks(prevDeletedTasks => [taskToDelete, ...prevDeletedTasks].slice(0, 3));
        setTasks(tasks.filter(task => task.id !== taskId));
        setCongratsDialogShown(false);
    };

    // Función para recuperar una tarea que ha sido eliminada.
    const recoverTask = (taskId) => {
        const taskToRecover = deletedTasks.find(task => task.id === taskId);
        const recoveredTask = { ...taskToRecover, completed: false };
        setTasks([...tasks, recoveredTask]);
        setDeletedTasks(prevDeletedTasks => prevDeletedTasks.filter(task => task.id !== taskId).slice(0, 3));
        setCongratsDialogShown(false);
    };

    // Función para abrir el cuadro de diálogo de información.
    const openDialog = () => {
        setDialogOpen(true);
    };

    // Función para cerrar el cuadro de diálogo de información.
    const closeDialog = () => {
        setDialogOpen(false);
    };

    // Filtrar tareas para separar las completadas y las activas.
    const completedTasks = tasks.filter(task => task.completed);
    const activeTasks = tasks.filter(task => !task.completed); 

    return (
        <div className="contenedor-lista">
            {/* Sección del logo y el texto */}
            <div className="texto-logo">
                <div className="logo-1">
                    <img src="src/assets/logo-01.png" alt="Logo de Tareas 24/7" />
                </div>
                <div className="texto-2">
                    <h2>SwiftTick</h2>
                    <h3>Marca rápido y vive tu vida.</h3>
                </div>
            </div>
            {/* Sección para agregar nuevas tareas */}
            <div className="lista-tareas agregar-tareas">
                <TaskForm onAdd={addTask} />
                {activeTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onComplete={completeTask}
                        onDelete={deleteTask}
                        showCompleteButton={true}
                    />
                ))}
            </div>
            {/* Contenedor para tareas completadas y eliminadas */}
            <div className="container-ComEli">
                {/* Sección de tareas completadas */}
                <div className="lista-tareas tareas-completadas">
                    <h2>Completadas</h2>
                    {completedTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onComplete={completeTask}
                            onDelete={deleteTask}
                            showCompleteButton={false}
                        />
                    ))}
                </div>
                {/* Sección de tareas eliminadas */}
                <div className="lista-tareas tareas-eliminadas">
                    <h2>Eliminadas</h2>
                    {deletedTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onComplete={completeTask}
                            showCompleteButton={false}
                            showRecoverButton={true}
                            onRecover={recoverTask}
                        />
                    ))}
                </div>
            </div>
            {/* Botón de información */}
            <div className="informacion-texto" onClick={openDialog}>
                <h5>INFO</h5>
            </div>
            {/* Cuadro de diálogo de felicitaciones */}
            {showCongratsDialog && <FeliDialogo onClose={() => setShowCongratsDialog(false)} />}

            {/* Cuadro de diálogo de información */}
            {dialogOpen && <InfoDialogo openDialog={closeDialog} />}
        </div>
    );
}
