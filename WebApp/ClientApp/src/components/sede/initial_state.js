const sedes_initial_state = {

    sede_state: {
        init_editar_sede: { municipios: [], tiposSede: [], categorias: [], CategoriasSubcategorias: []},
        init_crear_sede: {
            municipios: [], tiposSede: [], categorias: []},
        mostrar_crear_sede: false,
        mostrar_editar_sede: false,
        sede_creada: false,
        sede_actualizada: false,
        id_sede_seleccionada: 0
    }
};

export default sedes_initial_state;