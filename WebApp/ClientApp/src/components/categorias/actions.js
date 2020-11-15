import {  categoriaConstants  } from './constants';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alert_message/actions';



export const categoriaActions = {
    seleccionar_cat,
    obtener_cat,
    ver_crear_categoria,
    crear_categoria,
    cargar_editar_categoria,
    ver_editar_categoria,
    editar_categoria,
    eliminar_categoria
 
};

function seleccionar_cat(seleccionar_categoria) {

    return { type: categoriaConstants.SELECCIONAR_CATEGORIA, seleccionar_categoria };

}



function obtener_cat() {
    return dispatch => {

        ServicesHelper.obtener_categorias()
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.result !== null) {
                            dispatch(success(response.Result));
                        } else {
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }

                    } else {
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {
                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };


    function success(cate) { return { type: categoriaConstants.OBTENER_CAT, cate }; }
}



function cargar_editar_categoria(id, context) {
    return dispatch => {

        ServicesHelper.init_editar_categoria(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {

                            dispatch(success(response.Result));
                            context.setState({ categoria: response.Result });

                        } else {
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };


    function success(init_editar_categoria) { return { type: categoriaConstants.CARGAR_EDITAR_CATEGORIA, init_editar_categoria }; }
}

function ver_crear_categoria(mostrar_crear_categoria) {

    return { type: categoriaConstants.MOSTRAR_CREATE_CATEGORIA, mostrar_crear_categoria };

}

function ver_editar_categoria(mostrar_editar_categoria) {

    return { type: categoriaConstants.MOSTRAR_EDITAR_CATEGORIA, mostrar_editar_categoria };

}

 function crear_categoria(categoria, context) {
    return dispatch => {


        ServicesHelper.crear_catego(categoria)
            .then(
                response => {

                    if (response.IsSuccess) {
                    
                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_cat();
                            context.props.ver_crear_categoria(false);
                            

                            
                         


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_cat();
                            context.props.ver_crear_categoria(false);
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };

     function success(categoria_creada) { return { type: categoriaConstants.CREAR_CATEGORIA, categoria_creada }; }


}

function editar_categoria(categoria, context) {
    return dispatch => {


        ServicesHelper.editar_categoria(categoria)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_cat();
                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage( response.message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };

    function success(categoria_actualizada) { return { type: categoriaConstants.EDITAR_CATEGORIA,  categoria_actualizada }; }


}

function eliminar_categoria(id, context) {
    return dispatch => {

        ServicesHelper.eliminar_categoria(id)
            .then(
                response => {
                    loader.hide();
                    if (response.Result !== null) {

                        dispatch(success(true));
                        dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                        context.props.obtener_cat();

                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };


    function success(categoria_eliminada) { return { type: categoriaConstants.ELIMINAR_CATEGORIA, categoria_eliminada }; }
}

