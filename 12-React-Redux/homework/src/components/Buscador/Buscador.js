// Buscaremos peliculas (llamando a la API) y las mostraremos en forma de lista.
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import './Buscador.css';
// Importo las acciones que quiera usar en éste componente
import { addMovieFavorite , getMovies } from '../../actions/index.js'

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = { // Éste es un estado interno que lo único que va a hacer es modificarse cada vez que el usuario escriba en el input
      title: "" // Guardando en title el nombre de la película
    };
  }
  handleChange = (event) => {
    this.setState({ title: event.target.value });
  }
  handleSubmit = (event) => { // Cuando le de click en el botón 'BUSCAR' se va a ejecutar 'handleSubmit'
    event.preventDefault();
    this.props.getMovies(this.state.title)
    // Despacho getMovies con el título que guardé en el estado 'title'
  }
  handleClick = (movie) => {
    this.props.addMovieFavorite(movie)
  }
  render() {
    const { title } = this.state;
    return (
      <div>
        <h2>Buscador</h2>
        <form 
          className="form-container" 
          onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">Película: </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        
           {/* Por las dudas verificamos que exista un 'movies'. Porque si es undefined, el map arrojará errores */}
           {this.props.movies && 
            this.props.movies.map((movie)=>(
            <div key={movie.imdbID}>
              <NavLink to={`/movie/${movie.imdbID}`}>
                {movie.Title}
              </NavLink>
              <button onClick={()=>this.handleClick(movie)}>Fav</button>
            </div>
         ))}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded
    // Voy a tener una propiedad interna en mi Componente que se va a llamar 'movies'
    // Que está conectada del store, lo que conocemos como 'moviesLoaded'
  }
}
function mapDispatchToProps(dispatch) {
  return {
    // "Permitime desde el componente, a través de los nombres que tengo acá, despachar estas acciones"
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buscador)
