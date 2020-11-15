import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { loader } from '../helpers/loader';
import { alertActions } from '../alert_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search } from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { categoriaActions } from '../categorias/actions';
import { subcategoriaActions } from '../subcategorias/actions';
import DeleteIcon from '@material-ui/icons/Delete';

class CategoriaSubcategoria extends Component {

    grid = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            categoria: {
                IdCategoria: 0,
                IdSubcategoria:0,
            }
        };

       

        this.fields = { text: 'Nombre', value: 'IdCategoria' };
        this.fields1 = { text: 'Nombre', value: 'IdSubCategoria' };

        
       
        this.rowSelected = this.rowSelected.bind(this);
        this.filterTemplate = this.filterTemplate.bind(this);
        this.MenuOptionClick = this.MenuOptionClick.bind(this);
        this.rowDeselected = this.rowDeselected.bind(this);
      
        this.agregar = this.agregar.bind(this);
        this.InputChange = this.InputChange.bind(this);
        
        

    }

    

    InputChange(e) {
        const { name, value } = e.target;
        const { categoria } = this.state;
        this.setState({
            categoria: {
                ...categoria,
                [name]: value
            }
            


        }, () => {
                if (name === 'IdCategoria') {
                    this.props.obtener_cate_subcategoria(e.target.value);
                }
                
        });

       
        
    }

    agregar(e) {
        e.preventDefault();
        if (this.state.categoria.IdCategoria === 0) {
            this.props.showMessage('Debe seleccionar una categoría.', true, 'Información');
            return;

        } else if (this.state.categoria.IdSubcategoria === 0) {
            this.props.showMessage('Debe seleccionar una subcategoria', true, 'Información');
            return;
        }


        this.props.crear_categoria_subcategoria(this.state.categoria,this)
    }



    componentDidMount() {

        loader.show();
        this.props.obtener_cat();
        this.props.obtener_subcat();
        

    }

    MenuOptionClick(e) {
        if (e.currentTarget.id === "btnEliminar") {

            if (this.props.id_catSubsel === 0) {
                this.props.showMessage('Debe seleccionar una sub-categoría.', true, 'Información');
                return;

            } 

            loader.show();
            this.props.eliminar_cat_subcategoria(localStorage.getItem('IdCategoriaSubcategoria'), this.state.categoria.IdCategoria,this);
          

        } 
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }


    rowDeselected(e) {
        if (this.grid) {
            localStorage.setItem('IdCategoriaSubcategoria', 0);
          
        }
    }


    rowSelected(e) {
        if (this.grid) {

            localStorage.setItem('IdCategoriaSubcategoria', e.data.IdCategoriaSubcategoria);
         
        }
    }



    filterTemplate() {

        return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }


    render() {
        const { cat_sub} = this.props;


        return (
            <div>
                <nav id="nav" className="nav-form navbar">
                    <div className=" col-sm-12 col-md-6 col-lg-4 center center-vertical" >
                        <h3>Categorias Subcategoría</h3>
                    </div>
                    <div className=" col-sm-12 col-md-12 col-lg-12 " >

                        <ul >

                            <li >
                                <button id="btnEliminar" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style btn-block">

                                    <div>
                                        <DeleteIcon />
                                    </div>
                                    <div>
                                        <p>Eliminar</p>
                                    </div>
                                </button>
                            </li>


                        </ul>
                    </div>
                    <ComboBoxComponent name="IdCategoria" showClearButton={false} value={this.props.cate} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdCategoria', value: val.value } }); }} allowFiltering={true} placeholder="Categoría" className="pz-input" dataSource={this.props.cate} />

                    <ComboBoxComponent name="IdSubcategoria" showClearButton={false} value={this.props.sub_cate} allowCustom={false} fields={this.fields1} change={(val) => { this.InputChange({ target: { name: 'IdSubcategoria', value: val.value } }); }} allowFiltering={true} placeholder="SubCategoría" className="pz-input" dataSource={this.props.sub_cate} />


               
                  
                      <button type="button" onClick={this.agregar} className="btn btn-default btn-3d-style  btn-block">Agregar </button>
                   
                </nav>
           
                <div className='wrap-form table-responsive container-fluid'>
                    <GridComponent dataSource={cat_sub} rowSelected={this.rowSelected}  toolbar={this.toolbarOptions} searchSettings={this.searchOptions} height={280} ref={this.grid}  >
                        <ColumnsDirective>
                            <ColumnDirective field='SubCategoria.Nombre' headerText='Nombre' width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[ Toolbar]} />
                    </GridComponent>
                </div>
               
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { cate } = state.categoria;
    const { sub_cate, cat_sub, idCatSubsel } = state.reducerSubCategoria;
    return { cate, sub_cate, cat_sub, idCatSubsel};
}


const mapDispatchToProps = {
    obtener_cat: categoriaActions.obtener_cat,
    obtener_subcat: subcategoriaActions.obtener_subcat,
    obtener_cate_subcategoria: subcategoriaActions.obtener_cate_subcategoria,
    crear_categoria_subcategoria: subcategoriaActions.crear_categoria_subcategoria,
    showMessage: alertActions.showMessage,
    selec_catsubcat: subcategoriaActions.selec_catsubcat,
    eliminar_cat_subcategoria: subcategoriaActions.eliminar_cat_subcategoria
    
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriaSubcategoria));