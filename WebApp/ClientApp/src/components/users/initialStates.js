
const usuarios_initial_state = {

    usuario_state: {
        user: localStorage.getItem('usuario') !== null ? JSON.parse(localStorage.getItem('usuario')) : {},
        usuarios: [],
        init_crear_usuario: { Roles: [] },
        init_editar_usuario: { Roles: [] },
        mostrar_crear_usuario: false,
        seleccionar_usuario: 0,
        mostrar_editar_usuario: false,
        usuario_creado: false,
        contacto_enviado: false,
        usuario_actualizado: false,
        
    }
};

export default usuarios_initial_state;