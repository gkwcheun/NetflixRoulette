import movieReducer from "../movieReducer";
import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_FAILURE,
} from "../movieTypes";
import expect from "expect";

describe("movie reducer", () => {
  const initialState = {
    loading: false,
    movies: [],
    error: "",
  };
  test("return initial state", () => {
    const state = movieReducer(undefined, {});
    expect(state).toEqual(initialState);
  });
  test("Fetch movie request action", () => {
    const fetchMovieRequestAction = {
      type: FETCH_MOVIES_REQUEST,
    };
    const state = movieReducer(initialState, fetchMovieRequestAction);
    expect(state.loading).toBe(true);
  });
  test("Fetch movie success", () => {
    const movies = ["movie1", "movie2", "movie3", "movie4", "movie6"];
    const fetchMovieSuccessAction = {
      type: FETCH_MOVIES_SUCCESS,
      payload: movies,
    };
    const state = movieReducer(initialState, fetchMovieSuccessAction);
    expect(state).toEqual({ ...initialState, movies: movies });
  });
  test("Fetch movie failure", () => {
    const fetchMovieFailureAction = {
      type: FETCH_MOVIES_FAILURE,
      payload: "This is an error message",
    };
    const state = movieReducer(initialState, fetchMovieFailureAction);
    expect(state).toEqual({
      ...initialState,
      error: "This is an error message",
    });
  });
});
