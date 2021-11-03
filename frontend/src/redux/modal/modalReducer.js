import {
  SHOW_ADD_EDIT_MODAL,
  HIDE_ADD_EDIT_MODAL,
  SHOW_DELETE_MODAL,
  HIDE_DELETE_MODAL,
} from "./modalTypes";

const initialState = {
  showAddEditModal: false,
  showDeleteModal: false,
  movieID: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADD_EDIT_MODAL:
      return {
        ...state,
        showDeleteModal: false,
        showAddEditModal: true,
        movieID: action.payload,
      };
    case HIDE_ADD_EDIT_MODAL:
      return {
        ...state,
        showDeleteModal: false,
        showAddEditModal: false,
        movieID: null,
      };
    case SHOW_DELETE_MODAL:
      return {
        ...state,
        showAddEditModal: false,
        showDeleteModal: true,
        movieID: action.payload,
      };
    case HIDE_DELETE_MODAL:
      return {
        ...state,
        showAddEditModal: false,
        showDeleteModal: false,
        movieID: null,
      };
    default:
      return state;
  }
};

export default modalReducer;
