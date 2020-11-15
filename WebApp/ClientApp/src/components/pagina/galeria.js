import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Carousel, Row, Col, Image, Container } from 'react-bootstrap';
import Footer from '../footer';
import Header from '../header';
import { loader } from '../helpers/loader';
import { connect } from 'react-redux';
import { HeaderActions } from '../header/actions';
import { withRouter } from "react-router-dom";
import ImageZoom from './forms/imagen_zoom';



class Galeria extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            urlImage:''
        };

        this.zoom = this.zoom.bind(this);
        this.close = this.close.bind(this);
        



    }

    zoom(e) {

        this.setState({
            urlImage: e.target.src,
            show: true
        })
     
    }

    close(e) {
        console.log(e);
        this.setState({
            show: false
        });

    }

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
                                <ListGroupItem >
                                    <Container>
                                        

                                        <ListGroupItem>
                                            <Row>
                                                <Col className="justify-content-center pr-0" sm={12} md={8} >
                                                    <ListGroup className="list-group-flush scroll " style={{ height: "600px" }}  >
                                                        <ListGroupItem>
                                                            <Row>
                                                                <Col xs={12} md={4} className=" text-center">
                                                                    <Image  onClick={this.zoom} src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                                                    <p className="text-left"> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. </p>
                                                                </Col>
                                                                <Col xs={12} md={4} className=" text-center">
                                                                    <Image  onClick={this.zoom} src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                                                    <p className="text-left"> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. </p>
                                                                </Col>
                                                                <Col xs={12} md={4} className=" text-center">
                                                                    <Image  onClick={this.zoom} src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                                                    <p className="text-left"> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. </p>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={12} md={4} className=" text-center">
                                                                    <Image  onClick={this.zoom} src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                                                    <p className="text-left"> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. </p>
                                                                </Col>
                                                                <Col xs={12} md={4} className=" text-center">
                                                                    <Image  onClick={this.zoom} src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                                                    <p className="text-left"> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. </p>
                                                                </Col>
                                                                <Col xs={12} md={4} className=" text-center">
                                                                    <Image  onClick={this.zoom} src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                                                    <p className="text-left"> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. </p>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col xs={12} md={4} className=" text-center">
                                                                    <Image  onClick={this.zoom} src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                                                    <p className="text-left"> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. </p>
                                                                </Col>
                                                                <Col xs={12} md={4} className=" text-center">
                                                                    <Image  onClick={this.zoom} src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                                                    <p className="text-left"> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. </p>
                                                                </Col>
                                                                <Col xs={12} md={4} className=" text-center">
                                                                    <Image  onClick={this.zoom} src="https://imgbox.es/images/2020/09/19/Hoteles-todo-incluido908deaa532e73f06.jpg" fluid />
                                                                    <p className="text-left"> Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica. </p>
                                                                </Col>
                                                            </Row>
                                                          
                                                        </ListGroupItem>
                                                  

                                                       
                                                    </ListGroup>

                                                </Col>
                                                <Col sm={12} md={4} className="justify-content-center ">
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item><h5><u> Siguenos en nuestras redes</u></h5></ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <Row className="justify-content-md-center ">
                                                                <Col sm={12} md={2} ><h4><i className="fa fa-facebook" aria-hidden="true" /></h4></Col>
                                                                <Col sm={12} md={10} ><a target="_blank" href="https://www.facebook.com/instagram/"> Coaventurate</a></Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <Row className="justify-content-md-center ">
                                                                <Col sm={12} md={2} ><h4><i className="fa fa-instagram" aria-hidden="true" /></h4></Col>
                                                                <Col sm={12} md={10} ><a target="_blank" href="https://www.facebook.com/instagram/"> Coaventurate</a></Col>
                                                            </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                            <Row className="justify-content-md-center ">
                                                                <Col sm={12} md={2} ><h4><i className="fa fa-twitter" aria-hidden="true" /></h4></Col>
                                                                <Col sm={12} md={10} ><a target="_blank" href="https://www.facebook.com/instagram/"> Coaventurate</a></Col>
                                                            </Row>
                                                        </ListGroup.Item>

                                                        <ListGroup.Item>
                                                            <Row className="justify-content-md-center ">
                                                                <Col sm={12} md={2} ><h4><i className="fa fa-envelope" aria-hidden="true" /></h4></Col>
                                                                <Col sm={12} md={10} > contacto@coaventurate.com</Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <Row className="justify-content-md-center ">
                                                                <button className="btn btn-default btn-3d-style  btn-block" onClick={() => this.volver()} >Ir al mapa </button>
                                                            </Row>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                    </Container>
                                </ListGroupItem>

                          



                            </ListGroup>


                            {
                                this.state.show ?
                                    <ImageZoom
                                        show={this.state.show}
                                        urlImage={this.state.urlImage}
                                        onHide={() => this.setState({ show:false })}
                                       
                                    /> : " "
                            }

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




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Galeria));