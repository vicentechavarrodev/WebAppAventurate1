
import { header } from '../helpers/headerContent';

export const ServicesHelper = {
    obtener_subcategorias,
    init_crear_subcategoria,
    crear_subcategoria,
    init_editar_subcategoria,
    editar_subcategoria,
    crear_subcatego,
    obtener_cate_subcategoria,
    crear_categoria_subcategoria,
    eliminar_cat_subcategoria,
    eliminar_subcategoria
};






async function obtener_subcategorias() {
    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return fetch(`api/SubCategorias/Index`, requestOptions).then(handleResponse);

}

async function crear_subcategoria(subcategoria) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: subcategoria
    };

    return await fetch(`api/SubCategorias/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}



async function init_crear_subcategoria() {
    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return fetch(`api/SubCategorias/Crear`, requestOptions).then(handleResponse);

}

async function init_editar_subcategoria(id) {
    const requestOptions = {
        method: 'GET',
        headers: header()
      
    };

    return fetch(`api/SubCategorias/Editar/${id}`, requestOptions).then(handleResponse);

}

async function eliminar_cat_subcategoria(id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        }

    };

    return fetch(`api/SubCategorias/CatSubDelete/${id}`, requestOptions).then(handleResponse);

}

async function eliminar_subcategoria(id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        }

    };

    return fetch(`api/SubCategorias/Delete/${id}`, requestOptions).then(handleResponse);

}


async function crear_subcatego(subcategoria) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: subcategoria
    };

   

    return await fetch(`api/SubCategorias/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}


async function editar_subcategoria(subcategoria) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: subcategoria
    };

    return await fetch(`api/SubCategorias/Editar`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}


async function obtener_cate_subcategoria(id) {
    const requestOptions = {
        method: 'GET',
        headers: header()

    };

    return fetch(`api/SubCategorias/CatSub/${id}`, requestOptions).then(handleResponse);

}

async function crear_categoria_subcategoria(params) {

    const requestOptions = {
        method: 'POST',
        headers: header(),
        body: JSON.stringify(params) 
    };

    console.log(JSON.stringify(params));

    return await fetch(`api/SubCategorias/CrearCategoriaSubcategoria`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}




function handleResponse(response) {
  
    if (!response.ok) {
        return response.json()
            .catch(() => {
                throw new Error(response.status);
            })
            .then(({ message }) => {
                throw new Error(message || response.status);
            });
    }
    return response.json();
}


