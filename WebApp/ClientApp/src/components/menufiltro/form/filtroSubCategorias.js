import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../../alert_message/actions';
import { mapsActions } from '../../mapsview/actions';
import { menuFiltroActions } from '../../menufiltro/actions';
import { Modal, ListGroup } from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import RoomIcon from '@material-ui/icons/Room';
import { loader } from '../../helpers/loader';


class FiltroSubCategorias extends Component {


    state = {
        selected: false,
    }

    constructor(props) {
        super(props);
        
        this.FiltroChangeHandler = this.FiltroChangeHandler.bind(this);
        this.SelectAll = this.SelectAll.bind(this);
        
        
    }

   

   
    async    FiltroChangeHandler(e,data) {
        loader.show();

        let arreglo = this.props.itemsFiltroSeleccionado; 
        let subcategorias =  [...this.props.categoriasSubcategorias]; 

       

        if (e.IdCategoriaSubcategoria === 0) {
            var idCategoria = this.props.idCategoriaSeleccionada;
            arreglo = arreglo.filter(function (index) {
                return index.IdCategoria !== parseInt(idCategoria);
            });


            if (data) {
                arreglo.push(...subcategorias);
            }

        } else {
            const encontrado = arreglo.find(element => element.IdCategoriaSubcategoria === e.IdCategoriaSubcategoria);

            if (encontrado === undefined) {
                arreglo.push(e);
            } else {
                arreglo = arreglo.filter(function (element) {
                    return element.IdCategoriaSubcategoria !== e.IdCategoriaSubcategoria;
                });
            }
        }


        this.props.agregar_items_filtro(arreglo);
        await this.props.obtener_sedes(arreglo, this.props.idMunicipioSeleccionado, this);
        this.SelectAll();
    }



    SelectAll() {
        let arreglo = [...this.props.itemsFiltroSeleccionado];
        let subcategorias = [...this.props.categoriasSubcategorias];
        var idCategoria = this.props.idCategoriaSeleccionada;
       
        arreglo = arreglo.filter(function (item) {
            return item.IdCategoria === parseInt(idCategoria);
        });
        var checked = false;
        if (arreglo.length === subcategorias.length) {
            checked=  true;
        }

        this.setState({ selected: checked });
    }

    componentDidMount() {
        loader.show();
        this.props.obtener_subcategorias(this.props.idCategoria, this);

    }


    render() {

        const { categoriasSubcategorias } = this.props;

       


        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header  >
                    <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                        {this.props.nombreCategoria}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item  >
                            <FormControlLabel
                                control={<Checkbox id={`item-f-0`} checked={this.state.selected} onChange={(e, data) => this.FiltroChangeHandler({ IdCategoriaSubcategoria: 0 }, data)} icon={<RoomOutlinedIcon fontSize="large" style={{ fill: "#97BF13" }} />} checkedIcon={<RoomIcon fontSize="large" style={{ fill: "#97BF13" }} />} />}
                                label={<span >Seleccionar todos</span>  }

                            />
                        </ListGroup.Item>

                        {
                            categoriasSubcategorias.map((menuItem) => (
                                <ListGroup.Item key={menuItem.IdCategoriaSubcategoria} >
                                    <FormControlLabel
                                        control={<Checkbox id={`item-f-${menuItem.IdCategoriaSubcategoria}`} checked={this.props.itemsFiltroSeleccionado.some(e => e.IdCategoriaSubcategoria === menuItem.IdCategoriaSubcategoria)} onChange={(e, data) => this.FiltroChangeHandler(menuItem, data)} icon={<RoomOutlinedIcon fontSize="large" style={{ fill: "#97BF13" }} />} checkedIcon={<RoomIcon fontSize="large" style={{ fill: "#97BF13" }} />}  />}
                                        label={<span ><img id={`item-f-${menuItem.IdCategoriaSubcategoria}`} style={{ width: "24px", heigth: "24px" }} alt={"image"} src={`/app-images/${menuItem.SubCategoria.UrlImagen}`} /> {menuItem.SubCategoria.Nombre}</span>}
                                        
                            />
                        </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                    
                </Modal.Body>

            </Modal>

        );
    }
}


function mapStateToProps(state) {

    const { categoriasSubcategorias, itemsFiltroSeleccionado, idMunicipioSeleccionado, idCategoriaSeleccionada} = state.menuFiltroReducer;
    return {
        categoriasSubcategorias,
        itemsFiltroSeleccionado,
        idMunicipioSeleccionado,
        idCategoriaSeleccionada
    };
}


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_subcategorias: menuFiltroActions.obtener_subcategorias,
    agregar_items_filtro: menuFiltroActions.agregar_items_filtro,
    obtener_sedes: mapsActions.obtener_sedes,

    
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FiltroSubCategorias));