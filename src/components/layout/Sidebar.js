import React from 'react';
import NewProyect from '../proyect/NewProyect';
import ListadoProyecto from '../proyect/ListadoProyecto';

const SideBar = () => {
    return (
        <aside>
            <h1>MERN <span>Tasks</span></h1>
            <NewProyect 
            />

            <div className="proyecto">
                <h2>Tus Proyectos</h2>
                <ListadoProyecto />
            </div>
        </aside>
    )
}

export default SideBar



























































