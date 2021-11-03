import {
  SHOW_ADD_EDIT_MODAL,
  HIDE_ADD_EDIT_MODAL,
  SHOW_DELETE_MODAL,
  HIDE_DELETE_MODAL,
} from "./modalTypes";

const showAddEditModal = (movieID = null) => {
  return {
    type: SHOW_ADD_EDIT_MODAL,
    payload: movieID,
  };
};

const hideAddEditModal = () => {
  return {
    type: HIDE_ADD_EDIT_MODAL,
  };
};

const showDeleteModal = (movieID = null) => {
  return {
    type: SHOW_DELETE_MODAL,
    payload: movieID,
  };
};

const hideDeleteModal = () => {
  return {
    type: HIDE_DELETE_MODAL,
  };
};

export { showAddEditModal, hideAddEditModal, showDeleteModal, hideDeleteModal };
