import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TaskContext from '../../context/task/taskContext';

const FormTask = () => {

    //Obtener el state de proyecto
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    
    //Obtener el state de tareas
    const TasksContext = useContext(TaskContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = TasksContext;


    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            })
        }  

    },[tareaseleccionada])

    //State del formulario
     const [tarea, guardarTarea ] = useState({
         nombre: ''
     })


    //Extraer el nombre del proyecto
    const { nombre } = tarea;


    //Si no hay proyecto seleccionado 
    if(!proyecto) return null;

    //Array estructuring al proyecto actual
    const [ proyectoActual ] = proyecto;


    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === '' ) {
            validarTarea();
            return;
        }  


        //si es edicion o si es nueva tarea
        if(tareaseleccionada === null ){
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            //tarea.estado = false;
            agregarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);
            //Elimina la tarea seleccionada del state
            limpiarTarea()
        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        guardarTarea({
            nombre : ''
        })
    }


    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
                    />

                </div>
            </form>

            { errortarea ?  <p className="mensaje error">El nombre de la tarea es obligatorio</p>: null }
        </div>
     );
}
 
export default FormTask;