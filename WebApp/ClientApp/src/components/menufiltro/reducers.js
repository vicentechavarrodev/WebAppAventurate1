import initialState from './initialStates';
import {  menuFiltroConstants } from './constants';

export function menuFiltroReducer(state = initialState.menuFiltro_states, action) {
    switch (action.type) {


        case menuFiltroConstants.NOMBRE_MUNICIPIO_SELECCIONADO: {
        return {
            ...state, nombreMunicipioSeleccionado: action.nombreMunicipioSeleccionado
        }

    }

        case menuFiltroConstants.OBTENER_CATEGORIAS: {
            return {
                ...state, categorias: action.categorias
            }

        }

        case menuFiltroConstants.ASIGNAR_ITEM_ACTIVE: {
            return {
                ...state, itemActiveClass: action.itemActiveClass
            }

        }

        case menuFiltroConstants.VER_FILTRO_FLOTANTE: {
            return {
                ...state, verFiltroFlotante: action.verFiltroFlotante
            }

        }

        case menuFiltroConstants.OBTENER_SUBCATEGORIAS: {
            return {
                ...state, categoriasSubcategorias: action.categoriasSubcategorias
            }

        }

        case menuFiltroConstants.AGREGAR_SUBCATEGORIAS_FILTRO: {
            return {
                
                ...state, itemsFiltroSeleccionado: action.itemsFiltroSeleccionado
            }

        }

        case menuFiltroConstants.SELECIONAR_MUNICIPIO: {
            return {

                ...state, idMunicipioSeleccionado: action.idMunicipioSeleccionado
            }

        }

        case menuFiltroConstants.CAMBIAR_ZOOM_MAP: {
            return {

                ...state, zoomMap: action.zoomMap
            }

        }

        case menuFiltroConstants.SELECIONAR_CATEGORIA: {
            return {

                ...state, idCategoriaSeleccionada: action.idCategoriaSeleccionada
            }

        }

        case menuFiltroConstants.POSICION_CENTRAL_MAPA: {
            return {

                ...state, centeInitial: action.centeInitial
            }

        }



            
            

        default: return state;
    }
}