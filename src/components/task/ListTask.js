import React, { Fragment, useContext } from 'react';
import Task from './Task';
import proyectoContext from '../../context/proyectos/proyectoContext';
import taskContext from '../../context/task/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const ListadoTask = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //Obtener las tareas del proyecto
    const tareasContext = useContext(taskContext);
    const { tareasproyecto } = tareasContext;

    //Si no hay proyecto seleccionado 
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    //Array estructuring al proyecto actual
    const [ proyectoActual ] = proyecto;

    const onClickEliminaProyecto = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: { proyectoActual.nombre }</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ?   (<li className="tarea"><p>No hay tareas</p></li>)
                    :   <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Task 
                                
                                task={tarea}
                            />
                            </CSSTransition>
                    ))}
                    </TransitionGroup>
                }
            </ul>

            <button 
                type="button" 
                className="btn btn-eliminar"
                onClick={ () => onClickEliminaProyecto()}
            >Eliminar Proyecto &times;</button>

        </Fragment>
     );
}
 
export default ListadoTask;