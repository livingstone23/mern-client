import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TaskContext from '../../context/task/taskContext';

const  Proyect  = ({proyecto}) => {

    //Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;
    
    //Obtener el state de tareas
    const TasksContext = useContext(TaskContext);
    const { obtenerTareas } = TasksContext;


    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id);     //Fijar un proyecto actual
        obtenerTareas(id);      //Filtrar las tareas cuando se de click

    }


    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    )
}

export default Proyect
