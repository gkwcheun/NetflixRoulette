import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBar from "../components/SearchBar";

const mockStore = configureStore([]);
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    search: "",
  }),
}));

test("placeholder", () => {});

describe("Search Bar Testing", () => {
  let store;
  let componentSnapshot;
  let component;
  let initialState = {};
  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    componentSnapshot = renderer.create(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    component = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  });
  test("component renders with given state from redux store", () => {
    expect(componentSnapshot.toJSON()).toMatchSnapshot();
  });
  test("Verify search bar title was rendered", () => {
    const { getByText } = component;
    getByText("FIND YOUR MOVIE");
  });
  test("Verify Search Input Rendered", () => {
    const { getByPlaceholderText } = component;
    getByPlaceholderText("What do you want to watch?");
  });
  test("Changing input in search bar works correctly", () => {
    const { getByPlaceholderText } = component;
    const searchInput = getByPlaceholderText("What do you want to watch?");
    fireEvent.change(searchInput, {
      target: {
        value: "La La Land",
      },
    });
    expect(searchInput.value).toBe("La La Land");
  });
  test("Verify seach button renders", () => {
    const { getByTestId } = component;
    getByTestId("movie-search-btn");
  });
  test("Test each button click pushes to url", () => {
    const { getByTestId } = component;
    const searchBtn = getByTestId("movie-search-btn");
    fireEvent.click(searchBtn);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  });
  test("Change url input and push search to url", () => {
    const { getByPlaceholderText } = component;
    const searchInput = getByPlaceholderText("What do you want to watch?");
    fireEvent.change(searchInput, {
      target: {
        value: "La La Land",
      },
    });
    expect(searchInput.value).toBe("La La Land");
    const { getByTestId } = component;
    const searchBtn = getByTestId("movie-search-btn");
    fireEvent.click(searchBtn);
    expect(mockHistoryPush).toHaveBeenCalledWith(
      `/search?title=${"La La Land"}`
    );
  });
});
