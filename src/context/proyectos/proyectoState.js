import React, { useReducer } from 'react';
//import * as uuid from 'uuid/v4';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS, 
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR
    } from '../../types';
import clienteAxios from '../../config/axios';



const ProyectoState = props => {


    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = async () => {
        // dispatch({
        //     type: OBTENER_PROYECTOS,
        //     payload: proyectos
        // })

        try {
            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                    type: OBTENER_PROYECTOS,
                    payload: resultado.data.proyectos
                })
        } catch (error) {
            console.log(error);

        }
    }

    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
        //Parte ya no necesaria porque lo agrega mongo
        //proyecto.id = uuid();

        // //Insertamos el proyecto con un dispatch
        // dispatch({
        //     type: AGREGAR_PROYECTO,
        //     payload: proyecto
        // })

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            //console.log(resultado);

            dispatch({
                type: AGREGAR_PROYECTO,
                payload:resultado.data
            })

        } catch ( error ) {
            console.log(error);


        }
    }


    //Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO,

        })
    }

    // Selecciona el Proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Elimina el proyecto actual
    const eliminarProyecto = async proyectoId => {
        // dispatch({
        //     type: ELIMINAR_PROYECTO,
        //     payload: proyectoId
        // })
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })

        } catch (error) {
            //console.log(error)
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })

        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}

        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;