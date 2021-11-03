import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchMovies } from "../redux/actions";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const { movieData, fetchMovies } = props;
  useEffect(() => {
    fetchMovies();
  }, []);
  let numMovies = movieData.movies ? movieData.movies.length : 0;
  return movieData.loading ? (
    <h2>Loading</h2>
  ) : movieData.error ? (
    <h2>{movieData.error}</h2>
  ) : (
    <>
      <p className="movie-count">{`${numMovies} Movies Found`}</p>
      <div className="movie-list-container">
        {movieData.movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movieData: state.movie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: () => dispatch(fetchMovies()),
  };
};

MovieList.propTypes = {
  movieData: PropTypes.object.isRequired,
  fetchMovies: PropTypes.func.isRequired,
};
MovieList.defaultProps = {
  movieData: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
