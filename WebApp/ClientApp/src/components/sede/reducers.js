import initialState from './initial_state';
import { sedeConstants } from './constant';

export default function sedesReducer(state = initialState.sede_state, action) {
    switch (action.type) {

      
        case sedeConstants.CARGAR_CREAR_SEDE:
            return {
                ...state, init_crear_sede: action.init_crear_sede

            };
        case sedeConstants.CARGAR_EDITAR_SEDE:
            return {
                ...state, init_editar_sede: action.init_editar_sede

            };

        case sedeConstants.MOSTRAR_CREATE_SEDE:
            return {
                ...state, mostrar_crear_sede: action.mostrar_crear_sede

            };
        case sedeConstants.MOSTRAR_EDITAR_SEDE:
            return {
                ...state, mostrar_editar_sede: action.mostrar_editar_sede

            };
        case sedeConstants.CREAR_SEDE:
            return {
                ...state, sede_creada: action.sede_creada

            };
        case sedeConstants.SEDE_SELECCIONADA:
            return {
                ...state, id_sede_seleccionada: action.id_sede_seleccionada

            };

        case sedeConstants.EDITAR_SEDE:
            return {

                ...state, sede_actualizada: action.sede_actualizada
            };



        default:
            return state;
    }
}