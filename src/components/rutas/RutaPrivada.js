import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authenticacion/authContext';


const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect(()=> {
        usuarioAutenticado();

        //Codigo abajo evita se cicle la app
        // eslint-disable-next-line
    }, []);

    return (  
        <Route { ...props } render={ props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )} 
        />
    );
}

export default RutaPrivada;













































