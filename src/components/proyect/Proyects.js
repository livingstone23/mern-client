import React, { useContext, useEffect } from 'react';
import SideBar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTask from '../task/FormTask';
import ListTask from '../task/ListTask';
import AuthContext from '../../context/authenticacion/authContext';

const Proyects = () => {

    //Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
       
    }, [])

    return ( 
        <div className="contenedor-app">
            <SideBar 
            
            />
            <div className="seccion-principal">
                <Barra 
                
                />
                
                <main>
                    <FormTask />
                    <div className="contenedor-tareas">
                        <ListTask 
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Proyects;