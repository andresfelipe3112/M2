// Ya tenemos nuestro Reducer y nuestras actions. Entonces terminamos de conectar nuestro store, para esto importamos applyMiddleware de 'redux', thunk de la libreria 'redux-thunk' y nuestro Reducer. Pasamos como parametros en createStore nuestro rootReducer y applyMiddleware, a esta le pasamos nuestro middleware thunk. Puedes investigar sobre thunk en aca. Usamos un Middleware para poder hacer peticiones AJAX sin problemas.
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
// Al store le tengo que pasar los reducers
import thunk from "redux-thunk";
// thunk se importa de Redux para que pueda trabajar con funciones asíncronas

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    )

export default store