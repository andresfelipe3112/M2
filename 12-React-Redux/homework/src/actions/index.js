// En nuestro archivo index.js en nuestra carpeta actions. Por ahora vamos a crear 4 actions.
// - Una para hacer la request a la API y traer todas las peliculas getMovies
// - Una para traer los detalles de la pelicula especifica getMovieDetail,
// - Una para agregarlas como Favoritas addMovieFavorite
// - Y una para eliminarla de favoritas removeMovieFavorite.

export const GET_MOVIES = "GET_MOVIES";
export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL";
export const ADD_MOVIE_FAVORITE = "ADD_MOVIE_FAVORITE";
export const REMOVE_MOVIE_FAVORITE = "REMOVE_MOVIE_FAVORITE";

export function getMovies(titulo) {
  return function (dispatch) {
    return fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + titulo) // Request
      .then((respuesta) => respuesta.json()) // Cuando me responde lo convierto en un objeto de Javascript con el método .json
      .then((datos) => { // Cuando ya tengo los datos
        dispatch({ type: GET_MOVIES, payload: datos }); // Despacho la acción. En éste caso el payload el dato de TODAS las películas
      });
  };
}
export function getMovieDetail(id) { // A partir de una ID (En vez de un título)
  return function (dispatch) {
    return fetch("http://www.omdbapi.com/?apikey=20dac387&i=" + id + "&plot=full") // Ahora la búsqueda será por ID
      .then((respuesta) => respuesta.json()) // Lo convierto en objeto de Javascript
      .then((detalles) => { // Cuando lo tengo como objeto despacho una acción
        dispatch({ type: GET_MOVIE_DETAIL, payload: detalles }); 
      });
  };
}
export function addMovieFavorite(payload) { 
  // El payload va a ser los datos de esa película en particular
  return { 
    type: ADD_MOVIE_FAVORITE, 
    payload 
  };
}
export function removeMovieFavorite(payload) {
  return { 
    type: REMOVE_MOVIE_FAVORITE, 
    payload 
  };
}
