import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { fetchMovies } from "../redux/actions";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";

function NavBar(props) {
  const { fetchMovies } = props;
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [navBarStatus, setNavBarStatus] = useState({
    all: true,
    documentary: false,
    comedy: false,
    horror: false,
    crime: false,
  });
  const [dropDownText, setDropDownText] = useState("RELEASE DATE");

  const query = new URLSearchParams(useLocation().search);

  const resetNavBar = {
    all: false,
    documentary: false,
    comedy: false,
    horror: false,
    crime: false,
  };

  useEffect(() => {
    fetchMovies(genre, sortBy, order, null, null);
  }, [genre, sortBy, order]);

  const onNavChange = (e) => {
    const navName = e.target.getAttribute("name");
    if (navName === "all") {
      setGenre(null);
    } else {
      setGenre(navName);
    }
    setNavBarStatus({
      ...resetNavBar,
      [navName]: true,
    });
  };

  useEffect(() => {
    // there are genres that aren't in the figma UI, so not on the list of genres
    // how to incorporate or just only append whatever genres in UI to obj?
    const searchGenre = query.get("genre") && query.get("genre").toLowerCase();
    let dropDown = "RELEASE DATE";
    const sortBy = query.get("sortBy") && query.get("sortBy").toLowerCase();
    const sortOrder =
      query.get("sortOrder") && query.get("sortOrder").toLowerCase();
    if (sortBy && sortOrder) {
      if (sortBy === "release_date") {
        dropDown = "RELEASE DATE";
      } else if (sortBy === "vote_average") {
        dropDown = "HIGHEST RATED";
      }
      if (sortOrder === "asc") {
        dropDown += " ASCENDING";
      } else if (sortOrder === "desc") {
        dropDown += " DESCENDING";
      }
    }
    if (searchGenre) {
      setNavBarStatus({
        ...resetNavBar,
        [searchGenre]: true,
      });
    }
    setDropDownText(dropDown);
  }, []);

  const onDropDownChange = (e) => {
    if (e.target.getAttribute("name") === "clear") {
      setSortBy(null);
      setOrder(null);
      setDropDownText("RELEASE DATE");
    } else {
      let [criteria, sortOrder] = e.target.getAttribute("name").split("-");
      setSortBy(criteria);
      setOrder(sortOrder);
      setDropDownText(e.target.innerHTML.toUpperCase());
    }
  };

  return (
    <>
      <div className="nav-bar-container">
        <nav className="nav-bar">
          <Link
            to="/search"
            className={`nav-link ${navBarStatus.all ? "selected-nav" : null}`}
            onClick={onNavChange}
            name="all"
          >
            ALL
          </Link>
          <Link
            to="/search?genre=documentary"
            className={`nav-link ${
              navBarStatus.documentary ? "selected-nav" : null
            }`}
            onClick={onNavChange}
            name="documentary"
          >
            DOCUMENTARY
          </Link>
          <Link
            to="/search?genre=comedy"
            className={`nav-link ${
              navBarStatus.comedy ? "selected-nav" : null
            }`}
            onClick={onNavChange}
            name="comedy"
          >
            COMEDY
          </Link>
          <Link
            to="/search?genre=horror"
            className={`nav-link ${
              navBarStatus.horror ? "selected-nav" : null
            }`}
            onClick={onNavChange}
            name="horror"
          >
            HORROR
          </Link>
          <Link
            to="/search?genre=crime"
            className={`nav-link ${navBarStatus.crime ? "selected-nav" : null}`}
            onClick={onNavChange}
            name="crime"
          >
            CRIME
          </Link>
        </nav>
        <div className="sort-nav">
          <Dropdown>
            <Dropdown.Toggle
              data-testid="dropdown-toggle"
              variant="dark"
              id="dropdown-button-dark-example2"
              className="sortby-toggle"
            >
              <span className="sort-by-label">SORT BY</span>
              {dropDownText}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={onDropDownChange}>
                <Link
                  className="nav-link"
                  to="/search?sortBy=release_date&sortOrder=asc"
                  name="release_date-asc"
                >
                  Release Date Ascending
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={onDropDownChange}>
                <Link
                  className="nav-link"
                  to="/search?sortBy=release_date&sortOrder=desc"
                  name="release_date-desc"
                >
                  Release Date Descending
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={onDropDownChange}
                name="vote_average-desc"
              >
                <Link
                  className="nav-link"
                  to="/search?sortBy=vote_average&sortOrder=desc"
                  name="vote_average-desc"
                >
                  Highest Rated
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={onDropDownChange}>
                <Link className="nav-link" to="/search" name="clear">
                  Clear Sort
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
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

NavBar.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NavBar);
