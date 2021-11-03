import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { showAddEditModal } from "../redux/actions";
import SearchBar from "./SearchBar";

function Header(props) {
  const { showAddEditModal } = props;
  return (
    <>
      <div className="header-banner"></div>
      <div className="header-container">
        <div className="top-nav-bar">
          <p className="logo">netflixroulette</p>
          <button className="add-movie-btn" onClick={showAddEditModal}>
            + ADD MOVIE
          </button>
        </div>
        <SearchBar />
      </div>
      <div className="empty-bar-big"></div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showAddEditModal: () => dispatch(showAddEditModal()),
  };
};

Header.propTypes = {
  showAddEditModal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
