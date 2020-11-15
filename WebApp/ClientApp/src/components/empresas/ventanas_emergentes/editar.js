import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { EmpresaActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alert_message/actions';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';


class EditarEmpresa extends Component {



    constructor(props) {
        super(props);

        this.state = {
            empresa: {
                Nombre: '',
                IdEmpresa: 0,
                IdUsuario: 0,
                Activa:false
            }
        };

        this.fields = { text: 'Nombres', value: 'IdUsuario' };

        this.InputChange = this.InputChange.bind(this);
        this.EditEmpresaSubmit = this.EditEmpresaSubmit.bind(this);
    }


    componentDidMount() {
        this.props.cargar_editar_empresa(localStorage.getItem('idEmpresaSeleccionada'), this);
    }

    InputChange(e) {
        const { name, value } = e.target;
        const { empresa } = this.state;
        this.setState({
            empresa: {
                ...empresa,
                [name]: value
            }
        });
    }

    EditEmpresaSubmit(e) {
        e.preventDefault();
        const {
            empresa
        } = this.state;

        if (!empresa.Nombre) {
            this.props.showMessage('Debe ingresar un nombre.', true, 'Información');
            return;
         
        } else if (!empresa.IdUsuario || empresa.IdUsuario === 0) {
            this.props.showMessage('Debe selecionar  un usuario.', true, 'Información');
            return;
        }


        loader.show();
        this.props.editar_empresa(empresa, this.props.user, this);


    }




    render() {
        
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Empresa
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditEmpresaSubmit} >
                        <Form.Group md="6" >
                            <Form.Control type="text" maxLength={100} name="Nombre" value={this.state.empresa.Nombre} onChange={this.InputChange} className="pz-input" placeholder="Nombre" />
                        </Form.Group>
                       
                        <Form.Group md="6" >
                            <div className="input-group" >
                                <ComboBoxComponent name="IdUsuario" showClearButton={false} value={this.state.empresa.IdUsuario} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdUsuario', value: val.value } }); }} allowFiltering={true} placeholder="Usuario" className="pz-input" dataSource={this.props.init_editar_empresa.usuarios} />
                            </div>
                        </Form.Group>

                        <Form.Group md="6"  >
                            <CheckBoxComponent label='Activa' checked={this.state.empresa.Activa} change={(val) => { this.InputChange({ target: { name: 'Activa', value: val.checked } }); }} />
                        </Form.Group>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <button type="submit" className="btn btn-default btn-3d-style  btn-block">Grabar </button>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <button type="button" onClick={this.props.onHide} className="btn btn-default btn-3d-style  btn-block">Cancelar </button>
                            </Form.Group>
                        </Form.Row>

                    </Form>
                </Modal.Body>

            </Modal>

        );
    }
}


//-------------------------------Redux Event------------------------

function mapStateToProps(state) {
    const { mostrar_editar_empresa, init_editar_empresa, id_empresa_seleccionada } = state.empresasReducer;
    const { user } = state.authentication;
    return { mostrar_editar_empresa, init_editar_empresa, user,id_empresa_seleccionada };
}


const mapDispatchToProps = {
    obtener_empresas: EmpresaActions.obtener_empresas,
    showMessage: alertActions.showMessage,
    ver_editar_empresa: EmpresaActions.ver_editar_empresa,
    cargar_editar_empresa: EmpresaActions.cargar_editar_empresa,
    editar_empresa: EmpresaActions.editar_empresa,
    empresa_seleccionada: EmpresaActions.empresa_seleccionada

};

//------------------------------------------------------------------



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarEmpresa));