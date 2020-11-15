const empresas_initial_state = {

    empresa_state: {
        empresas: {},
        init_crear_empresa: { SedesEmpresa: [], Usuarios: [] },
        init_editar_empresa: { SedesEmpresa: [], Usuarios: []},
        mostrar_crear_empresa: false,
        mostrar_editar_empresa: false,
        empresa_creada: false,
        empresa_actualizada: false,
        id_empresa_seleccionada: 0
    }
};

export default empresas_initial_state;