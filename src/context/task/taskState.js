import React, { useReducer } from 'react';
//import * as uuid from 'uuid/v4';

import TaskContext from './taskContext';
import TaskReducer from './taskReducer';


import { 
    TAREAS_PROYECTOS,
    AGREGAR_TAREA,
    VALIDAR_TAREA, 
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios';

const TaskState = props => {

    const initialState ={
        // tareas : [
        //     {id: 1, nombre: 'Elegir colores', estado: false, proyectoId: 1 },
        //     {id: 2, nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
        //     {id: 3, nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 2 },
        //     {id: 4, nombre: 'Elegir hostings', estado: true, proyectoId: 3 },
        //     {id: 5, nombre: 'Elegir WORD', estado: true, proyectoId: 4 },
        //     {id: 6, nombre: 'Elegir EXCEL', estado: true, proyectoId: 4 },
        //     {id: 7, nombre: 'Elegir Casita', estado: true, proyectoId: 4 }
        // ],
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }


    //Crear el dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //Crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
       
        try {

            const resultado = await clienteAxios.get('/api/task', { params: { proyecto }});
            // console.log('CANO RESULTADO XXX');
            // console.log(resultado);

            dispatch({
                type: TAREAS_PROYECTOS,
                //payload: proyecto
                payload: resultado.data.tasks
            })


        }catch (error) {
            console.log(error);

        }
    }
    
    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        //tarea.id = uuid();

        try {

            const resultado = await clienteAxios.post('/api/task', tarea);
            console.log(resultado);

            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })

        } catch (error) {
            console.log(error)
        }

    }

    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        
        try {
            
            await clienteAxios.delete(`/api/task/${id}`, { params: { proyecto }});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })

        }catch (error) {
            console.log(error);
        }
    }

    // // Cambia el estado de cada tarea
    // const cambiarEstadoTarea = tarea => {
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload: tarea
    //     })
    // }

    //Extrae una tarea para edición
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Edita o modifica una tarea
    const actualizarTarea = async tarea => {
        
        try{

            const resultado = await clienteAxios.put(`/api/task/${tarea._id}`, tarea);

            // console.log('resultado XXX 32')
            // console.log(resultado)

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.task
            })
            

        } catch (error) {
            console.log(error)

        }
    }

    //Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }


    return(
        <TaskContext.Provider
            value={{
                //tarea: state.tarea,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                //cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;