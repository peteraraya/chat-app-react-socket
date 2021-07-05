import { types } from "../../types/types";



export const chatReducer = (state, action ) => {

  switch (action.type){

    case types.cerrarSession:
        return {
          uid:'',
          chatActivo:null,
          usuarios:[],
          mensajes:[],
        }

    case types.usuariosCargados:
          return {
            ...state,
            usuarios:[...action.payload ]
          }

    case types.activarChat:
          if( state.chatActivo === action.payload ) return state;
          return {
            ...state,
            chatActivo: action.payload,
            mensajes:[] 
          }
          
    case types.nuevoMensaje:
          if( state.chatActivo === action.payload.de || state.chatActivo === action.payload.para){
          return {
            ...state,
            mensajes:[ ...state.mensajes, action.payload ] 
          }
        }else{
          return state;
        }
      
    case types.cargarMensjaes:
          return {
            ...state,
            mensajes:[ ...action.payload ]
          }

    default:
        return state;
  }


}


/** 
 * Un reducer es una función pura que no debe tener interacciones del exterior
 * todo debe procesarse al state y las acciones
 * 
 * siempre debemos retornar el state, no debemos mutarlo
 * 
 * ni tampoco disparar acciones secundarias dentro del reducer
 * 
 * el reducer siempre debe ser una función sincrona que siempre este regresando un nuevo state
*/