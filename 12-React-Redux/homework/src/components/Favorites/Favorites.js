// Acá va a mostrar la lista de películas a las cuales seleccionamos como Favoritas
import React, { Component } from "react";
import { connect } from "react-redux";
import { removeMovieFavorite } from "../../actions/index";
import { Link } from 'react-router-dom';
import './Favorites.css';

export class ConnectedList extends Component {
  handleOnClick = (id) => {
    this.props.removeMovieFavorite(id)
  }
  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        {this.props.movies && this.props.movies.map((movie)=>(
            <div key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>
                {movie.Title}
              </Link>
              <button onClick={() => this.handleOnClick(movie.imdbID)}>X</button>
            </div>
         ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesFavorites
  }
}
function mapDispatchToProps(dispatch) {
  return {
    removeMovieFavorite: movie => dispatch(removeMovieFavorite(movie))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
