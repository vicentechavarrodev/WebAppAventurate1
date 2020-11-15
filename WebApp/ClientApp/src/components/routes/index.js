import MapView from '../mapsview/mapView';
import App from '../../App';
import React from 'react';
import PerfilSede from '../mapsview/forms/perfilSede';
import Login from '../users/login';
import PerfilMunicipio from '../mapsview/forms/perfilMunicipio';
import { Switch, BrowserRouter} from 'react-router-dom';
import PublicRoute from '../helpers/publicRoute';
import PrivateRoute from '../helpers/privateRoute';
import Ventana from '../ventanaPrincipal';
import Usuarios from '../users';
import Categorias from '../categorias/index';
import SubCategorias from '../subcategorias';
import QuienesSomos from '../pagina/quienes_somos';
import CatSubCategorias from '../cat_sub';
import Empresas from '../empresas';
import Municipios from '../municipios';
import Mapass from '../empresas/ventanas_emergentes/DraggableExample';
import Blog from '../pagina/blog';
import Galeria from '../pagina/galeria';
import Condiciones from '../pagina/condiciones';
import Privacidad from '../pagina/privacidad';
import Contacto from '../pagina/contacto';


const AppRoutes = () =>
    <BrowserRouter>
    <App>
            <Switch>
                <PublicRoute restricted={true} component={Login} path="/start" exact />
                <PublicRoute component={MapView} path="/" exact />
                <PublicRoute component={PerfilSede} path="/sitio" exact />
                <PublicRoute component={PerfilMunicipio} path="/municipio" exact />
                <PublicRoute component={QuienesSomos} path="/quienes_somos" exact />
                <PublicRoute component={Blog} path="/blog" exact />
                <PublicRoute component={Galeria} path="/galeria" exact />
                <PublicRoute component={Condiciones} path="/terminos_condiciones" exact />
                <PublicRoute component={Contacto} path="/contacto" exact />
                <PublicRoute component={Privacidad} path="/politicas_privacidad" exact />
                    
                <Ventana>
                    <PrivateRoute component={Empresas} path="/empresa" exact />
                    <PrivateRoute component={Usuarios} path="/usuarios" exact />
                    <PrivateRoute component={Categorias} path="/categorias" exact />
                    <PrivateRoute component={SubCategorias} path="/subcategorias" exact />
                    <PrivateRoute component={CatSubCategorias} path="/catsubcategorias" exact />
                    <PrivateRoute component={Mapass} path="/mapas" exact />
                    <PrivateRoute component={Municipios} path="/municipios" exact />
                </Ventana>
              
        </Switch>
    </App>
    </BrowserRouter>;
        

export default AppRoutes;
        
        
                      