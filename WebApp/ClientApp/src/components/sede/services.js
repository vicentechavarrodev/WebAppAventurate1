
import { header } from '../helpers/headerContent';

export const ServicesHelper = {
    init_editar_sede,
    crear_sede,
    editar_sede,
    init_crear_sede,
    obtener_cate_subcategoria
};



function init_crear_sede() {
    const requestOptions = {
        method: 'GET',
        headers: header()

    };

    return fetch(`api/Sedes/Crear`, requestOptions).then(handleResponse);

}

async function obtener_cate_subcategoria(id) {
    const requestOptions = {
        method: 'GET',
        headers: header()

    };

    return fetch(`api/SubCategorias/CatSub/${id}`, requestOptions).then(handleResponse);

}



function init_editar_sede(id) {
    const requestOptions = {
        method: 'GET',
        headers: header()

    };

    return fetch(`api/Sedes/Editar/${id}`, requestOptions).then(handleResponse);

}


async function crear_sede(sede) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: sede
    };

    return await fetch(`api/Sedes/Crear`, requestOptions)
        .then(handleResponse)
        .then(sede => {
            return sede;
        });
}


async function editar_sede(sede) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: sede
    };

    return await fetch(`api/Sedes/Editar`, requestOptions)
        .then(handleResponse)
        .then(sede => {
            return sede;
        });
}



function handleResponse(response) {

    if (!response.ok) {
        return response.json()
            .catch(() => {
                // Couldn't parse the JSON
                throw new Error(response.status);
            })
            .then(({ message }) => {
                // Got valid JSON with error response, use it
                throw new Error(message || response.status);
            });
    }
    // Successful response, parse the JSON and return the data
    return response.json();
}
