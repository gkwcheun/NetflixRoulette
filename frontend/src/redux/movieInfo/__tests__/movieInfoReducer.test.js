import movieInfoReducer from "../movieInfoReducer";
import {
  SHOW_INFO,
  HIDE_INFO,
  GET_MOVIE_REQUEST,
  GET_MOVIE_FAILURE,
  GET_MOVIE_SUCCESS,
} from "../movieInfoType";
import expect from "expect";

describe("Movie Info Reducer", () => {
  const initialState = {
    loading: false,
    show: false,
    movieInfo: {},
    error: "",
  };
  test("initial movie info reducer state", () => {
    const state = movieInfoReducer(undefined, {});
    expect(state).toEqual(initialState);
  });
  test("Get movie request", () => {
    const getMovieRequestAction = {
      type: GET_MOVIE_REQUEST,
    };
    const state = movieInfoReducer(initialState, getMovieRequestAction);
    expect(state.loading).toBe(true);
  });
  test("Get movie success", () => {
    const movie = {
      title: "Test Movie",
      posterSrc: "movie poster url",
      year: 1994,
      genres: ["comedy", "action", "adventure"],
      length: 120,
      rating: 10,
      description: "Test description",
    };
    const getMovieSuccessAction = {
      type: GET_MOVIE_SUCCESS,
      payload: movie,
    };
    const state = movieInfoReducer(initialState, getMovieSuccessAction);
    expect(state).toEqual({ ...initialState, show: true, movieInfo: movie });
  });
  test("Get movie failure", () => {
    const getMovieFailureAction = {
      type: GET_MOVIE_FAILURE,
      payload: "Test error message",
    };
    const state = movieInfoReducer(initialState, getMovieFailureAction);
    expect(state).toEqual({ ...initialState, error: "Test error message" });
  });
  test("show info", () => {
    const movie = {
      title: "Test Movie",
      posterSrc: "movie poster url",
      year: 1994,
      genres: ["comedy", "action", "adventure"],
      length: 120,
      rating: 10,
      description: "Test description",
    };
    const showInfoAction = {
      type: SHOW_INFO,
      payload: movie,
    };
    const state = movieInfoReducer(initialState, showInfoAction);
    expect(state).toEqual({ ...initialState, show: true, movieInfo: movie });
  });
  test("hide info", () => {
    const hideInfoAction = {
      type: HIDE_INFO,
    };
    const state = movieInfoReducer(initialState, hideInfoAction);
    expect(state).toEqual({ ...initialState, show: false });
  });
});
