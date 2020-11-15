import { municipioConstants  } from './constants';
import initialState from './initial_states';



export function municipio(state = initialState.municipio_state, action) {

    switch (action.type) {

        case municipioConstants.SELECCIONAR_MUNICIPIO:
            return {
                ...state, seleccionar_municipio: action.seleccionar_municipio

            };
        case municipioConstants.OBTENER_MUNICIPIOS:
            return {
                ...state, municipios: action.municipios

            };
        case municipioConstants.CARGAR_EDITAR_MUNICIPIO:
            return {
                ...state, init_editar_municipio: action.init_editar_municipio

            };


        case municipioConstants.MOSTRAR_CREATE_MUNICIPIO:
            return {
                ...state, mostrar_crear_municipio: action.mostrar_crear_municipio

            };
        case municipioConstants.MOSTRAR_EDITAR_MUNICIPIO:
            return {
                ...state, mostrar_editar_municipio: action.mostrar_editar_municipio

            };
        case municipioConstants.CREAR_MUNICIPIO:
            return {
                ...state, municipio_creado: action.municipio_creado

            };


        case municipioConstants.EDITAR_MUNICIPIO:
            return {

                ...state, municipio_actualizado: action.municipio_actualizado
            };
        default:
            return state;

    }
}