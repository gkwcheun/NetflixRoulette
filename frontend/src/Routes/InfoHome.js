import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getMovie } from "../redux/actions";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import HeaderContainer from "../components/HeaderContainer";
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";
import DeleteModal from "../components/forms/DeleteModal";
import MovieDetailsForm from "../components/forms/MovieDetailsForm";

function InfoHome(props) {
  const { getMovie } = props;
  const { movieID } = useParams();
  useEffect(() => {
    getMovie(movieID);
  }, [movieID]);
  return (
    <>
      <HeaderContainer />
      <NavBar />
      <MovieDetailsForm />
      <DeleteModal />
      <MovieList />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovie: (movieID) => dispatch(getMovie(movieID)),
  };
};

InfoHome.propTypes = {
  getMovie: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(InfoHome);
