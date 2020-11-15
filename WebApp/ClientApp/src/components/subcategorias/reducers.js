import { subcategoriaConstants  } from './constants';
import initialState from './initialStates';


export function reducerSubCategoria(state = initialState.subcategoria_state, action) {
    switch (action.type) {

        case subcategoriaConstants.ELIMINAR_SUBCATEGORIA:
            return {
                ...state, subcategoria_eliminada: action.subcategoria_eliminada

            };
        case subcategoriaConstants.SELECCIONAR_CATSUBCA:
            return {
                ...state, idCatSubsel: action.idCatSubsel

            };

        case subcategoriaConstants.OBTENER_SUBCAT:
            return {
                ...state, sub_cate: action.sub_cate

            };

        case subcategoriaConstants.ELIMINAR_CATE_SUBCATEGORIA:
            return {
                ...state, cat_subcategoria_eliminada: action.cat_subcategoria_eliminada

            };

            



      
        case subcategoriaConstants.CARGAR_EDITAR_SUBCATEGORIA:
            return {
                ...state, init_editar_subcategoria: action.init_editar_subcategoria

            };
        case subcategoriaConstants.SUBCATE_SEL:
            return {
                ...state, id_subcat_sel: action.id_subcat_sel

            };

        case subcategoriaConstants.MOSTRAR_CREATE_SUBCATEGORIA:
            return {
                ...state, mostrar_crear_subcategoria: action.mostrar_crear_subcategoria

            };
        case subcategoriaConstants.MOSTRAR_EDITAR_SUBCATEGORIA:
            return {
                ...state, mostrar_editar_subcategoria: action.mostrar_editar_subcategoria

            };
        case subcategoriaConstants.CREAR_SUBCATEGORIA:
            return {
                ...state, subcategoria_creada: action.subcategoria_creada

            };
        case subcategoriaConstants.EDITAR_SUBCATEGORIA:
            return {

                ...state, subcategoria_actualizada: action.subcategoria_actualizada
            };

        case subcategoriaConstants.OBTENER_SUB_CAT:
            return {

                ...state, cat_sub: action.cat_sub
            };
        case subcategoriaConstants.CREAR_CATE_SUBCATEGORIA:
            return {

                ...state, cat_subcategoria_creada: action.cat_subcategoria_creada
            };

        default:
            return state;
    }
}