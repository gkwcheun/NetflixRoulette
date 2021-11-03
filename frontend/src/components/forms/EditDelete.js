import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CloseButton from "react-bootstrap/CloseButton";
import { showDeleteModal, showAddEditModal } from "../../redux/actions";
import "./EditDeleteStyles.css";

function EditDeleteForm(props) {
  const {
    movieID,
    closeFormNoPropagate,
    closeForm,
    showAddEditModal,
    showDeleteModal,
  } = props;
  const clickHandler = (e, cb) => {
    cb(e, movieID);
    closeFormNoPropagate();
  };
  return (
    <div className="edit-delete-container">
      <CloseButton
        className="edit-delete-close-btn"
        onClick={closeForm}
        variant="white"
      />
      <p
        onClick={(e) => clickHandler(e, showAddEditModal)}
        className="edit-delete-options edit"
      >
        Edit
      </p>
      <p
        onClick={(e) => clickHandler(e, showDeleteModal)}
        className="edit-delete-options delete"
      >
        Delete
      </p>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showAddEditModal: (e, movieID) => {
      e.stopPropagation();
      return dispatch(showAddEditModal(movieID));
    },
    showDeleteModal: (e, movieID) => {
      e.stopPropagation();
      return dispatch(showDeleteModal(movieID));
    },
  };
};

EditDeleteForm.propTypes = {
  movieID: PropTypes.number.isRequired,
  closeFormNoPropagate: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  showAddEditModal: PropTypes.func.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(EditDeleteForm);
