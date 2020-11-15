import initialState from './initial_state';
import { empresaConstants } from './constant';

export default function empresasReducer(state = initialState.empresa_state, action) {
    switch (action.type) {
        case empresaConstants.CARGAR_EMPRESAS: 
            return {
                 ...state, empresas: action.empresas
            };

        case empresaConstants.CARGAR_CREATE_EMPRESA:
            return {
                ...state, init_crear_empresa: action.init_crear_empresa

            };
        case empresaConstants.CARGAR_EDITAR_EMPRESA:
            return {
                ...state, init_editar_empresa: action.init_editar_empresa

            };

        case empresaConstants.MOSTRAR_CREATE_EMPRESA:
            return {
                ...state, mostrar_crear_empresa: action.mostrar_crear_empresa

            };
        case empresaConstants.MOSTRAR_EDITAR_EMPRESA:
            return {
                ...state, mostrar_editar_empresa: action.mostrar_editar_empresa

            };
        case empresaConstants.CREAR_EMPRESA:
            return {
                ...state, empresa_creada: action.empresa_creada

            };
        case empresaConstants.EMPRESA_SELECCIONADA:
            return {
                ...state, id_empresa_seleccionada: action.id_empresa_seleccionada

            };

        case empresaConstants.EDITAR_EMPRESA:
            return {

                ...state, empresa_actualizada: action.empresa_actualizada
            };



        default:
            return state;
    }
}