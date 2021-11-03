import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function ErrorBoundary(props) {
  const { loading, children } = props;
  const Fallback = () => (
    <h1 className="error-boundary">
      Oops, Something went wrong! We are working hard to fix it!
    </h1>
  );
  return <>{loading ? <Fallback /> : children}</>;
}

const mapStateToProps = (state) => {
  return {
    loading: state.movie.loading,
  };
};

ErrorBoundary.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default connect(mapStateToProps)(ErrorBoundary);
