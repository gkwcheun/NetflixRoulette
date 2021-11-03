import React from "react";
import PropTypes from "prop-types";

function TextError(props) {
  const { children } = props;
  return <div className="error">{children}</div>;
}

TextError.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TextError;
