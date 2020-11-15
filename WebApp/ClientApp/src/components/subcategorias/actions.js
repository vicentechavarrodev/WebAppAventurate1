import {  subcategoriaConstants  } from './constants';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alert_message/actions';



export const subcategoriaActions = {
    obtener_subcat,
    ver_crear_subcategoria,
    crear_subcategoria,
    cargar_editar_subcategoria,
    ver_editar_subcategoria,
    editar_subcategoria,
    select_subcat,
    obtener_cate_subcategoria,
    crear_categoria_subcategoria,
    selec_catsubcat,
    eliminar_cat_subcategoria,
    eliminar_subcategoria
};

function obtener_subcat() {
    return dispatch => {

        ServicesHelper.obtener_subcategorias()
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.Result !== null) {
                            dispatch(success(response.Result));
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


    function success(sub_cate) { return { type: subcategoriaConstants.OBTENER_SUBCAT, sub_cate }; }
}

function select_subcat(id_subcat_sel) {

    return { type: subcategoriaConstants.SUBCATE_SEL, id_subcat_sel };

}

function cargar_editar_subcategoria(id, context) {
    return dispatch => {

        ServicesHelper.init_editar_subcategoria(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {

                            dispatch(success(response.Result));
                            context.setState({ subcategoria: response.Result });

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


    function success(init_editar_subcategoria) { return { type: subcategoriaConstants.CARGAR_EDITAR_SUBCATEGORIA, init_editar_subcategoria }; }
}

function ver_crear_subcategoria(mostrar_crear_subcategoria) {

    return { type: subcategoriaConstants.MOSTRAR_CREATE_SUBCATEGORIA, mostrar_crear_subcategoria };

}



function ver_editar_subcategoria(mostrar_editar_subcategoria) {

    return { type: subcategoriaConstants.MOSTRAR_EDITAR_SUBCATEGORIA, mostrar_editar_subcategoria };

}


function selec_catsubcat(idCatSubsel) {

    return { type: subcategoriaConstants.SELECCIONAR_CATSUBCA, idCatSubsel };

}





function crear_subcategoria(subcategoria, context) {
    return dispatch => {


        ServicesHelper.crear_subcatego(subcategoria)
            .then(
                response => {

                    if (response.IsSuccess) {
                       
                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_subcat();
                         


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
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

    function success(subcategoria_creada) { return { type: subcategoriaConstants.CREAR_SUBCATEGORIA, subcategoria_creada }; }


}

function editar_subcategoria(subcategoria, context) {
    return dispatch => {


        ServicesHelper.editar_subcategoria(subcategoria)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_subcat();
                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
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

    function success(subcategoria_actualizada) { return { type: subcategoriaConstants.EDITAR_SUBCATEGORIA, subcategoria_actualizada }; }


}

function obtener_cate_subcategoria(id) {
    return dispatch => {

        ServicesHelper.obtener_cate_subcategoria(id)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.Result !== null) {
                            dispatch(success(response.Result));
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


    function success(cat_sub) { return { type: subcategoriaConstants.OBTENER_SUB_CAT, cat_sub }; }
}

function crear_categoria_subcategoria(params,context) {
    return dispatch => {


        ServicesHelper.crear_categoria_subcategoria(params)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_cate_subcategoria(params.IdCategoria);



                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
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

    function success(cat_subcategoria_creada) { return { type: subcategoriaConstants.CREAR_CATE_SUBCATEGORIA, cat_subcategoria_creada }; }


}



function eliminar_cat_subcategoria(id,idCategoria, context) {
    return dispatch => {

        ServicesHelper.eliminar_cat_subcategoria(id)
            .then(
                response => {
                    loader.hide();
                    if (response.Result !== null) {

                        dispatch(success(true));
                        dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                        context.props.selec_catsubcat(0);
                        context.props.obtener_cate_subcategoria(idCategoria);

                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };


    function success(cat_subcategoria_eliminada) { return { type: subcategoriaConstants.ELIMINAR_CATE_SUBCATEGORIA, cat_subcategoria_eliminada }; }
}

function eliminar_subcategoria(id, context) {
    return dispatch => {

        ServicesHelper.eliminar_subcategoria(id)
            .then(
                response => {
                    loader.hide();
                    if (response.Result !== null) {

                        dispatch(success(true));
                        dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                        context.props.obtener_subcat();

                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                        context.props.obtener_subcat();
                    }
                },
                error => {

                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };


    function success(subcategoria_eliminada) { return { type: subcategoriaConstants.ELIMINAR_SUBCATEGORIA, subcategoria_eliminada }; }
}