import { header } from '../helpers/headerContent';

export const ServicesHelper = {
    obtener_categorias,
    obtener_subcategorias

};




async function obtener_categorias() {

    const requestOptions = {
        method: 'GET',
        headers: header(),
    };

    return await fetch("api/Categorias/Index", requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });

}

async function obtener_subcategorias(IdCategoria) {

    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return await fetch(`api/SubCategorias/Index/${IdCategoria}`, requestOptions)
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


