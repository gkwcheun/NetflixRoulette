import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { hideInfo } from "../redux/actions";
import PropTypes from "prop-types";
import placeholder_poster from "../images/placeholder_poster.png";
import { Link } from "react-router-dom";
// import "./MovieInfo.css";

function MovieInfo(props) {
  const { movie, hideInfo } = props;
  const genreStr = movie.genres.join(", ");
  const movieHours = Math.floor(movie.length / 60);
  const movieMinutes = movie.length % 60;
  const onImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholder_poster;
  };

  return (
    <Container className="movie-info-container">
      <Row className="movie-info-nav-row">
        <Col>
          <p className="netflix-roulette">netflixroulette</p>
        </Col>
        <Col className="return-search">
          <Link to="/search">
            <FontAwesomeIcon
              data-testid="return-search-btn"
              onClick={hideInfo}
              className="return-search-icon"
              icon={faSearch}
            />
          </Link>
        </Col>
      </Row>
      <Row className="movie-data-row">
        <img
          onError={onImageError}
          className="movie-poster"
          src={movie.posterSrc}
          alt="movie"
        />
        <Col className="movie-info-col">
          <Row>
            <Col>
              <h2 className="movie-info-title">
                {movie.title} <span className="rating">{movie.rating}</span>
              </h2>
            </Col>
          </Row>
          <Row>
            <p className="movie-info-genre">{genreStr}</p>
          </Row>
          <Row>
            <Col>
              <p className="movie-info-year-length">
                {movie.year}
                <span className="movie-info-length">{`${movieHours}h ${movieMinutes}min`}</span>
              </p>
            </Col>
          </Row>
          <Row>
            <p className="movie-info-description">{movie.description}</p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    movie: state.movieInfo.movieInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideInfo: () => dispatch(hideInfo()),
  };
};

MovieInfo.propTypes = {
  movie: PropTypes.object.isRequired,
  hideInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
