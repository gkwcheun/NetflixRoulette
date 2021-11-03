import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import axios from "axios";
import rootReducer from "../src/redux/rootReducer";

import App from "../src/App";

const app = express();
const PORT = 8080;

const getInitialState = async (query) => {
  let genreFilter = query.genre ? `&filter=${query.genre}` : "";
  let sortBy = query.sortBy
    ? query.sortOrder
      ? `&sortBy=${query.sortBy}&sortOrder=${query.sortOrder}`
      : ""
    : "";
  let searchQuery = query.title ? `&search=${query.title}&searchBy=title` : "";
  let apiURL = `http://localhost:4000/movies?limit=6${genreFilter}${sortBy}${searchQuery}`;
  const movieRequest = await axios.get(apiURL);
  const movieData = movieRequest.data.data;
  // compile preloaded state with movieData returned from api call
  const preloadedState = {
    movie: { loading: false, movies: movieData, error: "" },
    modal: { showAddEditModal: false, showDeleteModal: false, movieID: null },
    movieInfo: { loading: false, show: false, movieInfo: {}, error: "" },
  };
  return preloadedState;
};

const getMovieByID = async (movieID) => {
  let apiURL = `http://localhost:4000/movies/${movieID}`;
  const movieRequest = await axios.get(apiURL);
  const movieData = movieRequest.data;
  let movie = {
    title: movieData.title,
    posterSrc: movieData.poster_path,
    year: movieData.release_date.substring(0, 4),
    genres: movieData.genres,
    length: movieData.runtime,
    rating: movieData.vote_average,
    description: movieData.overview,
  };

  let movieListURL = `http://localhost:4000/movies?limit=6`;
  const movieListRequest = await axios.get(movieListURL);
  const movieList = movieListRequest.data.data;

  // compile preloaded state with movieData returned from api call
  const preloadedState = {
    movie: { loading: false, movies: movieList, error: "" },
    modal: { showAddEditModal: false, showDeleteModal: false, movieID: null },
    movieInfo: {
      loading: false,
      show: true,
      movieInfo: { ...movie },
      error: "",
    },
  };
  return preloadedState;
};

app.get("/", (req, res) => {
  res.redirect("/search");
});

app.get("/search", async (req, res) => {
  const preloadedState = await getInitialState(req.query);
  // create new redux store instance with preloaded state
  const store = createStore(rootReducer, preloadedState);
  //render component to string
  let context = {};
  const APP = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  let jsx = ReactDOMServer.renderToString(APP);
  // get state from redux store
  const finalState = store.getState();

  // send rendered page to client
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    const html = `
    <div id='root'>${jsx}</div>
    <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // https://redux.js.org/usage/server-rendering#security-considerations
      window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(
        /</g,
        "\\u003c"
      )}
    </script>
    `;
    return res.send(data.replace('<div id="root"></div>', html));
  });
});

app.get("/search/movie=:movieID", async (req, res) => {
  let preloadedState = await getMovieByID(req.params.movieID);
  // create new redux store instance with preloaded state
  const store = createStore(rootReducer, preloadedState);
  //render component to string
  let context = {};
  const APP = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  let jsx = ReactDOMServer.renderToString(APP);
  // get state from redux store
  const finalState = store.getState();

  // send rendered page to client
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    const html = `
      <div id='root'>${jsx}</div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/usage/server-rendering#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(
          /</g,
          "\\u003c"
        )}
      </script>
      `;
    return res.send(data.replace('<div id="root"></div>', html));
  });
});

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
