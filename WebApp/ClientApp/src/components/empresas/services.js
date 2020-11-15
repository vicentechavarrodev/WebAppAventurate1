import { header } from '../helpers/headerContent';

export const ServicesHelper = {
    obtener_empresas,
    init_crear_empresa,
    init_editar_empresa,
    crear_empresa,
    editar_empresa
};


function obtener_empresas() {
    const requestOptions = {
        method: 'GET',
        headers: header(),
    };

    return fetch(`api/Empresas/Index/`, requestOptions).then(handleResponse);

}

function init_crear_empresa() {
    const requestOptions = {
        method: 'GET',
        headers: header(),
    };

    return fetch(`api/Empresas/Crear`, requestOptions).then(handleResponse);

}

function init_editar_empresa(id) {
    const requestOptions = {
        method: 'GET',
        headers: header(),

    };

    return fetch(`api/Empresas/Editar/${id}`, requestOptions).then(handleResponse);

}


async function crear_empresa(empresa) {

    const requestOptions = {
        method: 'POST',
        headers: header(),
        body: JSON.stringify(empresa)
    };
   
    return await fetch("api/Empresas/Crear", requestOptions)
        .then(handleResponse)
        .then(empresa => {
            return empresa;
        });
}


async function editar_empresa(empresa) {

    const requestOptions = {
        method: 'POST',
        headers: header(),
        body: JSON.stringify(empresa)
    };

    return await fetch(`api/Empresas/Editar`, requestOptions)
        .then(handleResponse)
        .then(empresa => {
            return empresa;
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
