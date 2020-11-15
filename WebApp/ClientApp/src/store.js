import { createStore, combineReducers, applyMiddleware } from 'redux';
import { alerts } from './components/alert_message/reducers';
import { lateralMenuReducer } from './components/lateral_bar/reducers';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { menuFiltroReducer} from './components/menufiltro/reducers';
import { authentication } from './components/users/reducers';
import { categoria } from './components/categorias/reducers';

import { reducerSubCategoria } from './components/subcategorias/reducers';
import { mapsReducer } from './components/mapsview/reducers';

import empresasReducer from './components/empresas/reducers';
import sedesReducer from './components/sede/reducers';
import { municipio } from './components/municipios/reducers';

import { HeaderReducer } from './components/header/reducers';







const loggerMiddleware = createLogger();

const rootReduc = combineReducers({
    categoria,
    alerts,
    lateralMenuReducer,
    mapsReducer,
    menuFiltroReducer,
    authentication,
    reducerSubCategoria,
    empresasReducer,
    sedesReducer,
    municipio,
    HeaderReducer
    
});


const store = createStore(
    rootReduc,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));


export default store;