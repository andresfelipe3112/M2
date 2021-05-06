// Como vimos, un reducer es simplemente una funcion que recibe 2 parametros: 
// state y action. Y depende la action que reciba nos devuelve el estado actualizado. 
// Al comienzo del archivo creamos nuestro estado inicial. 

import { ADD_MOVIE_FAVORITE, GET_MOVIES, GET_MOVIE_DETAIL, REMOVE_MOVIE_FAVORITE } from "../actions";
// Éste es nuestro estado global de nuestra aplicación
const initialState = { // Estado inicial
    moviesFavorites: [], // Favoritos
    moviesLoaded: [], // Listado de las películas
    movieDetail: {} // Detalles
  };
// La primera vez cuando no tenga un estado, lo va a inicializar por defecto con initialState
function rootReducer(state = initialState, action) {
    switch (action.type) { // Tipo de acción
        case ADD_MOVIE_FAVORITE:
            return {
                ...state, 
                moviesFavorites: [...state.moviesFavorites, action.payload]
            }
        case GET_MOVIES:
            return {
                ...state,
                moviesLoaded: action.payload.Search // El arreglo con todas las películas de mi búsqueda está dentro de .Search
                // Piso todo lo que había en moviesLoaded al hacer una nueva búsqueda
            }
        case REMOVE_MOVIE_FAVORITE:
            return {
                ...state,
                moviesFavorites: state.moviesFavorites.filter(movie => movie.imdbID !== action.payload)
            }
        case GET_MOVIE_DETAIL:
            return {
                ...state, // Lo anterior a movieDetail no se modificará, por lo tanto, hago una copia
                movieDetail: action.payload
                // A movieDetail le voy a guardar la respuesta de la API que contiene la información de la película
            }
        default:
            return state
    }
}
export default rootReducer