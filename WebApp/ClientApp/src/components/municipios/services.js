
import { header } from '../helpers/headerContent';

export const ServicesHelper = {
    obtener_municipios,
    init_crear_municipio,
    crear_municipio,
    init_editar_municipio,
    editar_municipio
};


async function obtener_municipios() {
    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return fetch(`api/Municipios/Index`, requestOptions).then(handleResponse);

}

async function crear_municipio(municipio) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: municipio
    };

    return await fetch(`api/Municipios/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

async function init_crear_municipio() {
    const requestOptions = {
        method: 'GET',
        headers: header()
    };

     return fetch(`api/Municipios/Crear`, requestOptions).then(handleResponse);

}

async function init_editar_municipio(id) {
    const requestOptions = {
        method: 'GET',
        headers: header()
      
    };

    return await fetch(`api/Municipios/Editar/${id}`, requestOptions).then(handleResponse);

}

async function editar_municipio(municipio) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: municipio
    };

    return await fetch(`api/Municipios/Editar`, requestOptions)
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


