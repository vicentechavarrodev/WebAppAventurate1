
import { header } from '../helpers/headerContent';

export const ServicesHelper = {
    login,
    obtener_usuarios,
    init_crear_usuario,
    crear_usuario,
    init_editar_usuario,
    editar_usuario,
    enviar_contacto
};



async function login(codigo, contrasena) {
    
    const requestOptions = {
        method: 'POST',
        headers: header(),
        body: JSON.stringify({ codigo, contrasena})
    };

    return await fetch("api/Usuarios/Login", requestOptions)
        .then(handleResponse)
        .then(response => {
            
            localStorage.setItem('usuario', JSON.stringify(response.Result));
            return response;
        });
}


function obtener_usuarios() {
    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return fetch(`api/Usuarios/Index`, requestOptions).then(handleResponse);

}



function init_crear_usuario() {
    const requestOptions = {
        method: 'GET',
        headers: header()
    };

    return fetch(`api/Usuarios/Crear`, requestOptions).then(handleResponse);

}

function init_editar_usuario(id) {
    const requestOptions = {
        method: 'GET',
        headers: header()
      
    };

    return fetch(`api/Usuarios/Editar/${id}`, requestOptions).then(handleResponse);

}


async function crear_usuario(usuario) {

    const requestOptions = {
        method: 'POST',
        headers: header(),
        body: JSON.stringify(usuario)
    };

  

    return await fetch(`api/Usuarios/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

async function enviar_contacto(contacto) {

    const requestOptions = {
        method: 'POST',
        headers: header(),
        body: JSON.stringify(contacto)
    };



    return await fetch(`api/Usuarios/CrearContacto`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}



async function editar_usuario(usuario) {

    const requestOptions = {
        method: 'POST',
        headers: header(),
        body: JSON.stringify(usuario)
    };

    return await fetch(`api/Usuarios/Editar`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
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


