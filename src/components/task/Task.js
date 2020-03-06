import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TaskContext from '../../context/task/taskContext';



const Task = ({task}) => {

    //Obtener el state de proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtener el state de tareas
    const TasksContext = useContext(TaskContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = TasksContext;


    //Extraer el proyecto
    const [ proyectoActual ] = proyecto;


    //Funcion que se ejecuta cuando el usuario presiona btn de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    //Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea)
    } 

    //Agrega una tarea actual, cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{task.nombre}</p>

            <div className="estado">
                {task.estado 
                  ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={()=> cambiarEstado(task)}
                        >Completo</button>
                    )
                  :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={()=> cambiarEstado(task)}
                        >Incompleto</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(task) }
                >Editar</button>
                 <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=> tareaEliminar(task._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Task;