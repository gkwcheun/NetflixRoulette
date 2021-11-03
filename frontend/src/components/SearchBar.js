import React from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../redux/movie/movieActions";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function SearchBar(props) {
  const { fetchMovies } = props;
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState({
    query: null,
    category: null,
    sortBy: null,
    sortOrder: null,
  });
  const history = useHistory();

  const submitSearch = (e) => {
    //   refactor later for api call
    e.preventDefault();
    history.push(`/search?title=${search}`);
    let searchInput = {
      query: search,
      category: "title",
      sortBy: null,
      sortOrder: null,
    };
    setSearchQuery(searchInput);
  };

  const query = new URLSearchParams(useLocation().search);
  console.log(query.get("sortBy"));

  let searchObj = {
    query: query.get("title") ? query.get("title") : query.get("genre"),
    category: query.get("title")
      ? "title"
      : query.get("genre")
      ? "genres"
      : null,
    sortBy: query.get("sortBy") ? query.get("sortBy") : null,
    sortOrder: query.get("sortOrder") ? query.get("sortOrder") : null,
  };

  useEffect(() => {
    setSearchQuery(searchObj);
  }, []);

  useEffect(() => {
    let { query, category, sortBy, sortOrder } = searchQuery;
    if (query) {
      fetchMovies(
        null,
        sortBy,
        sortOrder,
        query.toLowerCase(),
        category.toLowerCase()
      );
      setSearch(query);
    }
  }, [searchQuery]);

  return (
    <div className="search-container">
      <h1 className="find-movie-header">FIND YOUR MOVIE</h1>
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="   What do you want to watch?"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
        <button
          name="search-button"
          data-testid="movie-search-btn"
          className="search-btn"
          onClick={submitSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: (
      genre = null,
      criteria = null,
      order = null,
      query = null,
      category = null
    ) => {
      return dispatch(fetchMovies(genre, criteria, order, query, category));
    },
  };
};

SearchBar.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchBar);
