import axios from "axios";
import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_FAILURE,
} from "./movieTypes";

const fetchMoviesRequest = () => {
  return {
    type: FETCH_MOVIES_REQUEST,
  };
};

const fetchMoviesSuccess = (movies) => {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload: movies,
  };
};

const fetchMoviesFailure = (error) => {
  return {
    type: FETCH_MOVIES_FAILURE,
    payload: error,
  };
};

const fetchMovies = (
  genre = null,
  criteria = null,
  order = null,
  query = null,
  category = null
) => {
  let genreFilter = genre ? `&filter=${genre}` : "";
  let sortBy = criteria
    ? order
      ? `&sortBy=${criteria}&sortOrder=${order}`
      : ""
    : "";
  let searchQuery = query
    ? category
      ? `&search=${query}&searchBy=${category}`
      : ""
    : "";
  let apiURL = `http://localhost:4000/movies?limit=6${genreFilter}${sortBy}${searchQuery}`;
  return (dispatch) => {
    dispatch(fetchMoviesRequest());
    axios
      .get(apiURL)
      .then((response) => {
        const movies = response.data.data;
        dispatch(fetchMoviesSuccess(movies));
      })
      .catch((error) => {
        dispatch(fetchMoviesFailure(error));
      });
  };
};

export {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  fetchMovies,
};
