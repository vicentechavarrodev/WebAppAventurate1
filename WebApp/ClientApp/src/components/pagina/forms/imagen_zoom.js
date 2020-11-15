import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../../alert_message/actions';
import { ListGroup, ListGroupItem, Row, Modal, Col, Image } from 'react-bootstrap';

class ImagenZoom extends Component {

  

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
      
        


    }

   
    render() {

        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.props.onHide}
            >
               
                <Modal.Body>
                    <ListGroup className="list-group-flush  ">
                        <ListGroupItem>
                            <Row>
                                <Col sm={12} md={12} >
                                    <Image  src={this.props.urlImage} fluid />
                                </Col>
                                
                            </Row>
                        </ListGroupItem>

                       
                    </ListGroup>
                       
                </Modal.Body>

            </Modal>

        );
    }
}




function mapStateToProps(state) {
    const { mostrar_crear_categoria } = state.categoria;
    return { mostrar_crear_categoria };
};


const mapDispatchToProps = {

    showMessage: alertActions.showMessage,

};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImagenZoom));