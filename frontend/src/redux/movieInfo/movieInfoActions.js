import axios from "axios";
import {
  SHOW_INFO,
  HIDE_INFO,
  GET_MOVIE_REQUEST,
  GET_MOVIE_FAILURE,
  GET_MOVIE_SUCCESS,
} from "./movieInfoType";

const getMovieRequest = () => {
  return {
    type: GET_MOVIE_REQUEST,
  };
};

const getMovieSuccess = (movie) => {
  return {
    type: GET_MOVIE_SUCCESS,
    payload: movie,
  };
};

const getMovieFailure = (error) => {
  return {
    type: GET_MOVIE_FAILURE,
    payload: error,
  };
};

const showInfo = (movieInfo) => {
  return {
    type: SHOW_INFO,
    payload: {
      ...movieInfo,
    },
  };
};

const hideInfo = () => {
  return {
    type: HIDE_INFO,
  };
};

const getMovie = (movieID) => {
  let apiURL = `http://localhost:4000/movies/${movieID}`;
  return (dispatch) => {
    dispatch(getMovieRequest());
    axios
      .get(apiURL)
      .then((response) => {
        const movieData = response.data;
        let movieInfo = {
          title: movieData.title,
          posterSrc: movieData.poster_path,
          year: movieData.release_date.substring(0, 4),
          genres: movieData.genres,
          length: movieData.runtime,
          rating: movieData.vote_average,
          description: movieData.overview,
        };
        dispatch(getMovieSuccess(movieInfo));
      })
      .catch((error) => dispatch(getMovieFailure(error)));
  };
};

export { showInfo, hideInfo, getMovie };
