import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';

class BottomMenu  extends Component {
    

    componentDidMount() {

       
    }


    render() {

        return (
            <div className="bottom-navbar">
                <div className="container-navbar">
                    <Container>
                        <Row>
                            <Col xs={2} md={1}> <a href="#home" className="active">Menu 1</a></Col>
                            <Col xs={2} md={1}><a href="#contact">Menu 2</a></Col>
                            <Col xs={2} md={1}><a href="#contact">Menu 3</a></Col>
                            <Col xs={2} md={1}><a href="#news">Menu 4</a></Col>
                            <Col xs={2} md={1}><a href="#news">Menu 5</a></Col>
                            <Col xs={2} md={1}><a href="#news">Menu 6</a></Col>
                            <Col xs={2} md={1}><a href="#news">Menu 7</a></Col>
                            <Col xs={2} md={1}><a href="#news">Menu 8</a></Col>
                        </Row>
                    </Container>
                   
                   
                  
                   
                  
                </div>
            </div>

        );
    }
}


function mapStateToProps(state) {
    const { user_location, empresas, idEmpresaseleccionada } = state.mapsReducer;
    const { menuLateralVisible } = state.lateralMenuReducer;
    return {
        menuLateralVisible,
        user_location,
        empresas,
        idEmpresaseleccionada
    };
}


const mapDispatchToProps = {

  
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BottomMenu));