import React, { createContext, useCallback, useContext, useState } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';


export const AuthContext = createContext();

// Estado de la aplicación
const inititalState = {
  uid: null,
  checking: true,
  logged: false,
  name:null,
  email:null
};

export const AuthProvider = ({children}) => {

  // Metodos
  const [auth, setAuth] = useState(inititalState);
  const {dispatch} = useContext(ChatContext);

  const login = async( email, password ) => {

    // Hacer llamado 
    const resp = await fetchSinToken('login',{email, password}, 'POST');

    if (resp.ok) {
        localStorage.setItem('token', resp.token);
        const { usuario } = resp;
        // console.log(usuario);
        setAuth({
          uid: usuario.uid,
          checking: false,
          logged: true,
          name: usuario.nombre,
          email: usuario.email,
        });
      // console.log('Autenticado !!');
    }
  
    // Si todo sale bien retornamos
    return resp.ok;

  }

  const register = async(nombre, email, password ) => {
    // Hacer llamado 
    const resp = await fetchSinToken('login/new', {nombre, email, password }, 'POST');
    // console.log(resp);
    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      const { usuario } = resp;

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
      // console.log('Autenticado !!');
      return true;
    }
    return resp.msg;
  }

  const verificaToken = useCallback( async()=>{
    // validamos si el token existe
    const token = localStorage.getItem('token');
    // console.log(token);
    if (!token) {
      setAuth({ 
         uid: null,
         checking: false,
         logged: false,
         name: null,
         email: null,
       });

       return false;
    }

    // si el token existe haremos una valiodación en el servidor

    const resp = await fetchConToken('login/renew',{},'POST');

    // console.log(resp);
    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      const { usuario } = resp;

      setAuth({
              uid: usuario.uid,
              checking: false,
              logged: true,
              name: usuario.nombre,
              email: usuario.email,
            });
      console.log('Token validado !!');
      return true;
    }else{
       setAuth({
              uid: null,
              checking: false,
              logged: false,
              name: null,
              email: null,
            });
      return false;
    }

  },[]);

  const logout = () => {
    localStorage.removeItem('token');
    // Chat al ser un componente padre puedo ejecutar aqui la acción de purgar la info

    dispatch({
      type: types.cerrarSession,
    });

    setAuth({
      checking: false,
      logged: false,
    });
  }


  return (
    <AuthContext.Provider value={{
      auth,
      login,
      register,
      verificaToken,
      logout,
    }}>
      { children }
    </AuthContext.Provider>
  )
}
