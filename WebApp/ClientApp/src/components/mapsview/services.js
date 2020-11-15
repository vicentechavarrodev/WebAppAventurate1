import { header } from '../helpers/headerContent';

export const ServicesHelper = {
    obtener_sedes,
    obtener_municipio,
    obtener_sede
   
};


async function obtener_sedes(CategoriasSubcategorias, IdMunicipio) {

    const requestOptions = {
        method: 'POST',
        headers: header(),
        body: JSON.stringify({ CategoriasSubcategorias, IdMunicipio })
    };


    return await fetch("api/Sedes/Index", requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });

}

async function obtener_municipio(IdMunicipio) {

    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return await fetch(`api/Municipios/Index/${IdMunicipio}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });

}


async function obtener_sede(IdSede) {

    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return await fetch(`api/Sedes/GetSede/${IdSede}`, requestOptions)
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


