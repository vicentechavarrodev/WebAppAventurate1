import initialState from './initialStates';
import { mapsConstants  } from './constants';

export function mapsReducer(state = initialState.maps_states, action) {
    switch (action.type) {

        case mapsConstants.USER_LOCATION: {
            return {
                ...state, user_location: action.user_location
            }

        }

        case mapsConstants.USER_ADDRESS: {
            return {
                ...state, user_address: action.user_address
            }

        }

        case mapsConstants.OBTENER_SEDES: {
            return {
                ...state, sedes: action.sedes
            }

        }

        case mapsConstants.EMPRESA_SELECCIONADA: {
            return {
                ...state, idEmpresaseleccionada: action.idEmpresaseleccionada
            }

        }

        case mapsConstants.VER_INFO_EMPRESA: {
            return {
                ...state, verInforEmpresa: action.verInforEmpresa
            }

        }

        case mapsConstants.VER_MENU_BUSQUEDA: {
            return {
                ...state, verMenuBusqueda: action.verMenuBusqueda
            }

        }

        case mapsConstants.GUARDAR_MAPA: {
            return {
                ...state, map: action.map
            }

        }

        case mapsConstants.GUARDAR_LAYER_SELECCIONADO: {
            return {
                ...state, layerSeleccionado: action.layerSeleccionado
            }

        }

        case mapsConstants.GUARDAR_POSICION_CENTRAL: {
            return {
                ...state, centerInitial: action.centerInitial
            }

        }

        case mapsConstants.OBTENER_MUNICIPIO: {
            return {
                ...state, municipio: action.municipio
            }

        }

        case mapsConstants.OBTENER_SEDE: {
            return {
                ...state, sede: action.sede
            }

        }


          

            
        default: return state;
    }
}