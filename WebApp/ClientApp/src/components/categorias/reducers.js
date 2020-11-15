import { categoriaConstants  } from './constants';
import initialState from './initial_states';



export function categoria(state = initialState.categoria_state, action) {

    switch (action.type) {
        case categoriaConstants.ELIMINAR_CATEGORIA:
            return {
                ...state, categoria_eliminada: action.categoria_eliminada

            };
        case categoriaConstants.SELECCIONAR_CATEGORIA:
            return {
                ...state, seleccionar_categoria: action.seleccionar_categoria

            };
        case categoriaConstants.OBTENER_CAT:
            return {
                ...state, cate: action.cate

            };
        case categoriaConstants.CARGAR_EDITAR_CATEGORIA:
            return {
                ...state, init_editar_categoria: action.init_editar_categoria

            };


        case categoriaConstants.MOSTRAR_CREATE_CATEGORIA:
            return {
                ...state, mostrar_crear_categoria: action.mostrar_crear_categoria

            };
        case categoriaConstants.MOSTRAR_EDITAR_CATEGORIA:
            return {
                ...state, mostrar_editar_categoria: action.mostrar_editar_categoria

            };
        case categoriaConstants.CREAR_CATEGORIA:
            return {
                ...state, categoria_creada: action.categoria_creada

            };


        case categoriaConstants.EDITAR_CATEGORIA:
            return {

                ...state, categoria_actualizada: action.categoria_actualizada
            };
        default:
            return state;

    }
}