import {
  SHOW_INFO,
  HIDE_INFO,
  GET_MOVIE_REQUEST,
  GET_MOVIE_FAILURE,
  GET_MOVIE_SUCCESS,
} from "./movieInfoType";

const initialState = {
  loading: false,
  show: false,
  movieInfo: {},
  error: "",
};

const movieInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
        show: false,
        error: "",
      };
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        show: true,
        movieInfo: action.payload,
        error: "",
      };
    case GET_MOVIE_FAILURE:
      return {
        ...state,
        loading: false,
        show: false,
        movieInfo: {},
        error: action.payload,
      };
    case SHOW_INFO:
      return {
        ...state,
        show: true,
        loading: false,
        movieInfo: action.payload,
        error: "",
      };
    case HIDE_INFO:
      return {
        ...state,
        show: false,
        loading: false,
        movieInfo: {},
        error: "",
      };
    default:
      return state;
  }
};

export default movieInfoReducer;
