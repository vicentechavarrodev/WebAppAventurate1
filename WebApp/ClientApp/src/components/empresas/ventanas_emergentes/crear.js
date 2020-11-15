import React, { Component, createRef } from 'react'
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { EmpresaActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alert_message/actions';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';



class CrearEmpresa extends Component {

   

    constructor(props) {
        super(props);

        this.state = {
            empresa: {
                Nombre: '',
                IdEmpresa: 0,
                IdUsuario: 0,
                Activa: true
            }
        };

        this.fields = { text: 'Nombres', value: 'IdUsuario' };
        this.InputChange = this.InputChange.bind(this);
        this.CreateEmpresaSubmit = this.CreateEmpresaSubmit.bind(this);
    }


    componentDidMount() {
        this.props.cargar_crear_empresa();
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

    CreateEmpresaSubmit(e) {
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
        this.props.crear_empresa(empresa, this.props.user, this);
    }




    render() {
        const { empresa } = this.state;

        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                

                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Empresa
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateEmpresaSubmit} >
                        <Form.Group md="6" >
                            <Form.Control type="text" maxLength={100} name="Nombre" value={empresa.Nombre} onChange={this.InputChange} className="pz-input" placeholder="Nombre" />
                        </Form.Group>
                     
                        <Form.Group md="6" >
                            <div className="input-group" >
                                <ComboBoxComponent name="IdUsuario" showClearButton={false} value={empresa.IdUsuario} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdUsuario', value: val.value } }); }} allowFiltering={true} placeholder="Usuario" className="pz-input" dataSource={this.props.init_crear_empresa.usuarios} />
                                </div>
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
    const { mostrar_crear_empresa, init_crear_empresa } = state.empresasReducer;
    const {  user } = state.authentication;
    return { mostrar_crear_empresa, init_crear_empresa, user};
}


const mapDispatchToProps = {
    obtener_empresas: EmpresaActions.obtener_empresas,
    showMessage: alertActions.showMessage,
    ver_crear_empresa: EmpresaActions.ver_crear_empresa,
    cargar_crear_empresa: EmpresaActions.cargar_crear_empresa,
    crear_empresa: EmpresaActions.crear_empresa

};

//------------------------------------------------------------------



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearEmpresa));