import React from "react";
import { useState } from "react";
import { showInfo } from "../redux/actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import EditDelete from "./forms/EditDelete";
import PropTypes from "prop-types";
import placeholder_poster from "../images/placeholder_poster.png";
import { Link } from "react-router-dom";

function MovieCard(props) {
  const {
    genres,
    release_date,
    title,
    poster_path,
    runtime,
    vote_average,
    overview,
    showInfo,
    id,
  } = props;
  const [showEditDelete, setShowEditDelete] = useState(false);
  const [showUtility, setShowUtility] = useState(false);
  let genreString = genres.join(", ");
  let releaseYear = release_date.substring(0, 4);
  const history = useHistory();
  const toggleEditDelete = (e) => {
    e.stopPropagation();
    setShowEditDelete(!showEditDelete);
  };

  const closeFormNoPropagate = () => {
    setShowEditDelete(!showEditDelete);
  };

  const showMovieInfo = (e) => {
    e.stopPropagation();
    let movieInfo = {
      title: title,
      posterSrc: poster_path,
      year: releaseYear,
      genres: genres,
      length: runtime,
      rating: vote_average,
      description: overview,
    };
    // history.push(`/search/movie=${id}`);
    showInfo(movieInfo);
  };

  const onImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholder_poster;
  };

  return (
    <div
      data-testid={id}
      onMouseEnter={() => setShowUtility(true)}
      onMouseLeave={() => setShowUtility(false)}
      className="movie-card-container"
      // onClick={showMovieInfo}
    >
      {showEditDelete ? (
        <EditDelete
          closeForm={toggleEditDelete}
          closeFormNoPropagate={closeFormNoPropagate}
          movieID={id}
        />
      ) : showUtility ? (
        <button className="edit-delete-btn" onClick={toggleEditDelete}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      ) : null}
      <Link
        className="movie-info-link"
        to={`/search/movie=${id}`}
        onClick={showMovieInfo}
      >
        <img
          src={poster_path}
          alt={title}
          onError={onImageError}
          className="movie-image"
        ></img>
      </Link>
      <div className="movie-title-year">
        <p className="movie-text movie-title">{title}</p>
        <p className="movie-text movie-year">{releaseYear}</p>
      </div>
      <p className="movie-text movie-genres">{genreString}</p>
    </div>
  );
}

MovieCard.propTypes = {
  genres: PropTypes.array.isRequired,
  release_date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  runtime: PropTypes.number.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showInfo: PropTypes.func.isRequired,
};

MovieCard.defaultProps = {
  genres: ["default", "genres"],
  release_date: "1994-06-13",
  title: "Default Title",
  poster_path: "#",
  runtime: 120,
  vote_average: 10,
  overview: "Default Overview",
  id: 1,
};

const mapDispatchToProps = (dispatch) => {
  return {
    showInfo: (movieInfo) => dispatch(showInfo(movieInfo)),
  };
};

export default connect(null, mapDispatchToProps)(MovieCard);
