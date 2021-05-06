// Acá mostraremos los detalles de una película en específico
import React from "react";
import { connect } from "react-redux";
import { getMovieDetail } from "../../actions/index";

import "./Movie.css";

class Movie extends React.Component {
  // Apenas el componente se agregue
  componentDidMount() {
    const movieId = this.props.match.params.id
    this.props.getMovieDetail(movieId);
  }
  render() {
    const { movie } = this.props;
    return (
      <div>
        <div className="movie-detail">Detalle de la pelicula: {movie.Title}</div>
        <div>Año: {movie.Year}</div>
        <div>Fecha de Estreno: {movie.Released}</div>
        <div>Director: {movie.Director}</div>
        <div>Género: {movie.Genre}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movie: state.movieDetail,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getMovieDetail: (movie) => dispatch(getMovieDetail(movie)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
