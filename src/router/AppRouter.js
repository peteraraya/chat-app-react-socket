import React, { useContext, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

  const {auth, verificaToken } = useContext( AuthContext );

  // se ejecuta una unica vez
  useEffect(() => {
    verificaToken();
  }, [verificaToken])


  // Espere mientras verifico el estado de su sesión
  if (auth.checking ) {
    return <h1>Espere por favor!!</h1>
  }

  return (
    <Router>
      <div>
      
        <Switch>

          <PublicRoute isAuthenticated={auth.logged} path="/auth" component={ AuthRouter }  />

          <PrivateRoute isAuthenticated={auth.logged} exact path="/" component={ChatPage} />

          <Redirect to="/" />
          
        </Switch>

      </div>
    </Router>
  )
}


/**
 * Componente de sistema de rutas de la aplicación
 */