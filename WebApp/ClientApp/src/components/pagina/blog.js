import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Carousel, Row, Col, Image } from 'react-bootstrap';
import Footer from '../footer';
import Header from '../header';
import { loader } from '../helpers/loader';
import { connect } from 'react-redux';
import { HeaderActions } from '../header/actions';
import { withRouter } from "react-router-dom";

class Blog extends Component {

    componentDidMount() {
        loader.hide();
        window.scrollTo(0, 0);
    }

    volver() {
        this.props.history.push("/");
        localStorage.setItem('item_menu_header', 'inicio');
        this.props.seleccionar_id_item('inicio');
    }

    render() {

        return (

            <div className="container-menu ">
                <div id="content" >
                    <div className="table-responsive">
                        <Header iconMenuVisible="1" align="text-right" />
                        <div className="jumbotron">

                            <ListGroup className="list-group-flush  ">
                                <ListGroupItem>
                                    <Row>
                                    <Col sm={12} md={5} >
                                        
                                            <Image  src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                    </Col>
                                    <Col sm={12} md={7} className="justify-content-center ">
                                        <h5> ¿PORQUE VIAJAR AL DEPARTAMENTO DEL MANIZALES?</h5>
                                        <p> dsffdcvcvvcvccvcvvcvccvcvcvvcvcvcvcvcvccvvc. </p>

                                        </Col>
                                        </Row>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Row>
                                    <Col sm={12} md={7} className="justify-content-center ">
                                        <h5> QUE VISITATAR EN BRASIL </h5>
                                        <p> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. Lorem Ipsum ha sido el texto de relleno estándar de la industria desde la década de 1500, cuando un impresor desconocido tomó una galera de tipos y la mezcló para hacer un libro de muestras tipográfico. Ha sobrevivido no solo a cinco siglos, sino también al salto a la composición tipográfica electrónica, permaneciendo esencialmente sin cambios. Se popularizó en la década de 1960 con el lanzamiento de hojas de Letraset que contienen pasajes de Lorem Ipsum y, más recientemente, con software de autoedición como Aldus PageMaker que incluye versiones de Lorem Ipsum. </p>

                                    </Col>
                                    <Col sm={12} md={5} >

                                            <Image  src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                        </Col>
                                    </Row>
                                </ListGroupItem>



                            </ListGroup>


                        </div>
                    </div>


                </div>
                <Footer />
            </div>

        );
    }
}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {

    const { id_item_menu } = state.HeaderReducer;

    return {
        id_item_menu
    };

};

const mapDispatchToProps = {

    seleccionar_id_item: HeaderActions.seleccionar_id_item,

};




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));