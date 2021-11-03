import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import PropTypes from "prop-types";
import { hideDeleteModal, fetchMovies } from "../../redux/actions";
import "./DeleteModalStyles.css";

function DeleteModal(props) {
  const { movieID, hideDeleteModal, fetchMovies, showDeleteModal } = props;
  const deleteMovie = () => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:4000/movies/${movieID}`, requestOptions)
      .then((response) => response.text())
      .then(() => {
        hideDeleteModal();
        fetchMovies();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Modal show={showDeleteModal}>
      <Modal.Header className="delete-modal">
        <CloseButton onClick={hideDeleteModal} variant="white" />
      </Modal.Header>
      <div className="body-container">
        <Modal.Body className="delete-modal modal-body">
          <Modal.Title className="delete-modal-title">DELETE MOVIE</Modal.Title>
          <p className="delete-msg">
            Are you sure you want to delete this movie?
          </p>
        </Modal.Body>
        <Modal.Footer className="delete-modal">
          <Button onClick={deleteMovie} className="confirm-btn">
            CONFIRM
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    showDeleteModal: state.modal.showDeleteModal,
    movieID: state.modal.movieID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    hideDeleteModal: () => dispatch(hideDeleteModal()),
    fetchMovies: () => dispatch(fetchMovies()),
  };
};

DeleteModal.propTypes = {
  movieID: PropTypes.number,
  hideDeleteModal: PropTypes.func.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  showDeleteModal: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
