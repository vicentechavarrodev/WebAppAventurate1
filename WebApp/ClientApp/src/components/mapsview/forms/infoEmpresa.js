import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../../alert_message/actions';
import { Modal, ListGroup, Card, ListGroupItem, Form, Row, Col} from 'react-bootstrap';
import { mapsActions } from '../../mapsView/actions';

class InfoEmpresa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                idEmpresa: 0,
                nombre: '',
                descripcion: '',
                latitud: 0,
                longitud: 0,
                servicios: '',
                idCategoria: 0,
                key:0
            }
        };

        this.AddProduct = this.AddProduct.bind(this);
      
    }
    AddProduct() {
        this.props.showMessage("Funcionalidad no realizada,este es solo un demo de la plataforma ", true, "Información");
    }

    componentDidMount() {
      
        this.buscarInfo();
    }

    buscarInfo() {
        var e = this.props.empresas.filter(e => e.idEmpresa === this.props.idEmpresaseleccionada);
        console.log(e[0]);

        this.setState({
            info:e[0]
        });
    }


    render() {
       
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.state.info.nombre}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card >
                        
                        <Card.Body>
                            <Card.Text>
                                {this.state.info.descripcion}
                                </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 1
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 2
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 3
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 4
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 5
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 6
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 7
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 8
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 9
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="10">
                                        Producto 10
                                </Form.Label>
                                    <Col sm="2">
                                        <button className="btn btn-default btn-3d-style  btn-block" onClick={this.AddProduct}  >Agregar </button>
                                    </Col>
                                </Form.Group>
                            </ListGroupItem>
                        </ListGroup>
                        <Card.Footer className="text-muted">
                            <button className="btn btn-default btn-3d-style  btn-block" onClick={this.props.onHide} >Cerrar </button>

                        </Card.Footer>
                    </Card>
                </Modal.Body>

            </Modal>

        );
    }
}


function mapStateToProps(state) {
    const { user_location, empresas, idEmpresaseleccionada} = state.mapsReducer;
    const { menuLateralVisible } = state.lateralMenuReducer;
    return {
        menuLateralVisible,
        user_location,
        empresas,
        idEmpresaseleccionada
    };
}


const mapDispatchToProps = {

    showMessage: alertActions.showMessage,
    obtener_sedes: mapsActions.obtener_sedes,
    ver_info_empresa: mapsActions.ver_info_empresa
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoEmpresa));