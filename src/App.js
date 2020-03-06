import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyects from './components/proyect/Proyects';


import ProyectoState from './context/proyectos/proyectoState';
import TastkState from './context/task/taskState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/authenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token)
}


function App() {

  return (
    <ProyectoState>
      <TastkState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyects} />


              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TastkState>
    </ProyectoState>
  );
}

export default App;
