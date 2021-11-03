import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "./Header";
import MovieInfo from "./MovieInfo";

function HeaderContainer(props) {
  const { showInfo } = props;
  return <div>{showInfo ? <MovieInfo /> : <Header />}</div>;
}

const mapStateToProps = (state) => {
  return {
    showInfo: state.movieInfo.show,
  };
};

HeaderContainer.propTypes = {
  showInfo: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(HeaderContainer);
