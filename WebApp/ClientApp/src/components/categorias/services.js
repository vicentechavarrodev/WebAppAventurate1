
import { header } from '../helpers/headerContent';

export const ServicesHelper = {
    obtener_categorias,
    init_crear_categoria,
    crear_categoria,
    init_editar_categoria,
    editar_categoria,
    crear_catego,
    eliminar_categoria
};






async function obtener_categorias() {
    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return fetch(`api/Categorias/Index`, requestOptions).then(handleResponse);

}

async function crear_catego(categoria) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: categoria
    };

    return await fetch(`api/Categorias/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}



 async function init_crear_categoria() {
    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return fetch(`api/Categorias/Crear`, requestOptions).then(handleResponse);

}

async function init_editar_categoria(id) {
    const requestOptions = {
        method: 'GET',
        headers: header()
      
    };

    return fetch(`api/Categorias/Editar/${id}`, requestOptions).then(handleResponse);

}


async function crear_categoria(categoria) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: categoria
    };

   

    return await fetch(`api/Categorias/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}


async function editar_categoria(categoria) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: categoria
    };

    return await fetch(`api/Categorias/Editar`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

async function eliminar_categoria(id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },

    };

    return fetch(`api/Categorias/Delete/${id}`, requestOptions).then(handleResponse);

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


