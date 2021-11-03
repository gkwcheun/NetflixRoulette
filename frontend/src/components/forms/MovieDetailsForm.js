import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import { hideAddEditModal, fetchMovies } from "../../redux/actions";
import TextError from "./TextError";
import "./MovieDetailsFormStyles.css";

const initialValues = {
  title: "",
  tagline: "Default Tagline",
  vote_average: "",
  vote_count: 1000,
  release_date: "",
  poster_path: "",
  overview: "",
  budget: 0,
  revenue: 0,
  runtime: "",
  genres: [],
};

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  tagline: Yup.string(),
  vote_average: Yup.number().required("Required"),
  vote_count: Yup.number(),
  release_date: Yup.string().required("Required"),
  poster_path: Yup.string().url().required("Required"),
  overview: Yup.string().required("Required"),
  budget: Yup.number(),
  revenue: Yup.number(),
  runtime: Yup.number().required("Required"),
  genres: Yup.array().required("Required"),
});

function MovieDetailsForm(props) {
  const { fetchMovies, hideAddEditModal, movieID, showAddEditModal } = props;
  const [formValues, setFormValues] = useState(null);
  const [editStatus, setEditStatus] = useState(false);

  const onSubmit = (values, onSubmitProps) => {
    const requestType = editStatus ? "PUT" : "POST";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(values);

    const requestOptions = {
      method: requestType,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/movies", requestOptions)
      .then((response) => response.json())
      .then(() => fetchMovies())
      .then(() => hideAddEditModal())
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    // if form opened with edit button, fetch movie details with movieID prop
    if (movieID) {
      fetch(`http://localhost:4000/movies/${movieID}`)
        .then((response) => response.json())
        .then((data) => {
          setFormValues(data);
          // edit status set to differentiate submit button PUT or POST request
          setEditStatus(true);
        })
        .catch((error) => console.log(error));
    } else {
      setFormValues(null);
    }
  }, [movieID]);

  return (
    <Modal
      show={showAddEditModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="add-movie-modal">
        <CloseButton onClick={hideAddEditModal} variant="white" />
      </Modal.Header>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleReset,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <div className="modal-body-container">
              <FormikForm>
                <Modal.Body className="add-movie-modal">
                  <Modal.Title
                    className="modal-title"
                    id="contained-modal-title-vcenter"
                  >
                    ADD MOVIE
                  </Modal.Title>
                  <Row>
                    <Col className="col-1">
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">TITLE</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          placeholder="Movie Title"
                          onChange={handleChange}
                          value={values.title}
                          className="add-movie-form-input"
                        />
                      </Form.Group>
                      <ErrorMessage name="title" component={TextError} />
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">
                          RELEASE DATE
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="release_date"
                          onChange={handleChange}
                          value={values.release_date}
                          className="add-movie-form-input"
                        />
                        <ErrorMessage
                          name="release_date"
                          component={TextError}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-1">
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">
                          MOVIE URL
                        </Form.Label>
                        <Form.Control
                          name="poster_path"
                          placeholder="https://"
                          onChange={handleChange}
                          value={values.poster_path}
                          className="add-movie-form-input"
                        />
                        <ErrorMessage
                          name="poster_path"
                          component={TextError}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">RATING</Form.Label>
                        <Form.Control
                          type="number"
                          name="vote_average"
                          onChange={handleChange}
                          value={values.vote_average}
                          placeholder="7.8"
                          className="add-movie-form-input"
                        />
                        <ErrorMessage
                          name="vote_average"
                          component={TextError}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-1">
                      <Form.Group>
                        <Form.Label className="form-label">GENRE</Form.Label>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="dark"
                            id="dropdown-button-dark-example1"
                            className="add-movie-form-input dropdown-toggle"
                          >
                            Select Genre
                          </Dropdown.Toggle>
                          <Dropdown.Menu variant="dark">
                            <Form.Check
                              name="genres"
                              type="checkbox"
                              label="Crime"
                              onChange={handleChange}
                              value="Crime"
                              checked={values.genres.includes("Crime")}
                              className="form-checkbox"
                            />
                            <Form.Check
                              name="genres"
                              type="checkbox"
                              label="Documentary"
                              onChange={handleChange}
                              value="Documentary"
                              checked={values.genres.includes("Documentary")}
                              className="form-checkbox"
                            />
                            <Form.Check
                              name="genres"
                              type="checkbox"
                              label="Horror"
                              onChange={handleChange}
                              value="Horror"
                              checked={values.genres.includes("Horror")}
                              className="form-checkbox"
                            />
                            <Form.Check
                              name="genres"
                              type="checkbox"
                              label="Comedy"
                              onChange={handleChange}
                              value="Comedy"
                              checked={values.genres.includes("Comedy")}
                              className="form-checkbox"
                            />
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">RUNTIME</Form.Label>
                        <Form.Control
                          type="number"
                          name="runtime"
                          placeholder="Minutes"
                          onChange={handleChange}
                          value={values.runtime}
                          className="add-movie-form-input"
                        />
                        <ErrorMessage name="runtime" component={TextError} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">OVERVIEW</Form.Label>
                      <Form.Control
                        name="overview"
                        as="textarea"
                        onChange={handleChange}
                        value={values.overview}
                        placeholder="Movie description"
                        className="add-movie-form-input overview-input"
                      />
                      <ErrorMessage name="overview" component={TextError} />
                    </Form.Group>
                  </Row>
                </Modal.Body>
                <Modal.Footer className="add-movie-modal">
                  <Button
                    onClick={handleReset}
                    className="reset-btn add-movie-form-btn"
                  >
                    RESET
                  </Button>
                  <Button
                    className="submit-btn add-movie-form-btn"
                    type="submit"
                  >
                    SUBMIT
                  </Button>
                </Modal.Footer>
              </FormikForm>
            </div>
          );
        }}
      </Formik>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    showAddEditModal: state.modal.showAddEditModal,
    movieID: state.modal.movieID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideAddEditModal: () => dispatch(hideAddEditModal()),
    fetchMovies: () => dispatch(fetchMovies()),
  };
};

MovieDetailsForm.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
  hideAddEditModal: PropTypes.func.isRequired,
  showAddEditModal: PropTypes.bool.isRequired,
  movieID: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsForm);
