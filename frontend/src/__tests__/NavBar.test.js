import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavBar from "../components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

const mockStore = configureStore([]);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    search: "",
  }),
}));

test("placeholder", () => {});

describe("Nav Bar Testing", () => {
  let store;
  let componentSnapshot;
  let component;
  let initialState = {};
  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    componentSnapshot = renderer.create(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
    component = render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
  });
  test("Nav Bar Snapshot", () => {
    expect(componentSnapshot.toJSON()).toMatchSnapshot();
  });
  test("Nav Links Render", () => {
    const { getByText } = component;
    getByText("ALL");
    getByText("DOCUMENTARY");
    getByText("HORROR");
    getByText("CRIME");
  });
  test("Nav Bar ALL link is selected on render by default", () => {
    const { getByText } = component;
    const allLink = getByText("ALL");
    expect(allLink.className).toBe("nav-link selected-nav");
  });
  test("Clicking NavBar links changes classname to selected", () => {
    const { getByText } = component;
    const allLink = getByText("ALL");
    const documentaryLink = getByText("DOCUMENTARY");
    const horrorLink = getByText("HORROR");
    const crimeLink = getByText("CRIME");
    // initially ALL is selected
    expect(allLink.className).toBe("nav-link selected-nav");
    expect(documentaryLink.className).toBe("nav-link null");
    expect(horrorLink.className).toBe("nav-link null");
    expect(crimeLink.className).toBe("nav-link null");
    // on click of link, all other links will be null and selected selected-nav
    fireEvent.click(documentaryLink);
    expect(documentaryLink.className).toBe("nav-link selected-nav");
    expect(allLink.className).toBe("nav-link null");
    expect(horrorLink.className).toBe("nav-link null");
    expect(crimeLink.className).toBe("nav-link null");
    fireEvent.click(horrorLink);
    expect(horrorLink.className).toBe("nav-link selected-nav");
    expect(documentaryLink.className).toBe("nav-link null");
    expect(allLink.className).toBe("nav-link null");
    expect(crimeLink.className).toBe("nav-link null");
    fireEvent.click(crimeLink);
    expect(horrorLink.className).toBe("nav-link null");
    expect(documentaryLink.className).toBe("nav-link null");
    expect(allLink.className).toBe("nav-link null");
    expect(crimeLink.className).toBe("nav-link selected-nav");
    fireEvent.click(allLink);
    expect(horrorLink.className).toBe("nav-link null");
    expect(documentaryLink.className).toBe("nav-link null");
    expect(allLink.className).toBe("nav-link selected-nav");
    expect(crimeLink.className).toBe("nav-link null");
  });
  test("Dropdown menu initial render", () => {
    const { getByText } = component;
    const dropDownToggle = getByText("SORT BY");
    fireEvent.click(dropDownToggle);
    getByText("Release Date Ascending");
    getByText("Release Date Descending");
    getByText("Highest Rated");
    getByText("Clear Sort");
  });
  test("Dropdown menu click and select Release Date Ascending", () => {
    const { getByText, getByTestId } = component;
    const dropDownToggle = getByTestId("dropdown-toggle");
    fireEvent.click(dropDownToggle);
    const releaseDateAsc = getByText("Release Date Ascending");
    fireEvent.click(releaseDateAsc);
    expect(dropDownToggle.textContent).toContain("RELEASE DATE ASCENDING");
  });
  test("Dropdown menu click and select Release Date Descending", () => {
    const { getByText, getByTestId } = component;
    const dropDownToggle = getByTestId("dropdown-toggle");
    fireEvent.click(dropDownToggle);
    const releaseDateDesc = getByText("Release Date Descending");
    fireEvent.click(releaseDateDesc);
    expect(dropDownToggle.textContent).toContain("RELEASE DATE DESCENDING");
  });
  test("Dropdown menu click and select Highest Rated", () => {
    const { getByText, getByTestId } = component;
    const dropDownToggle = getByTestId("dropdown-toggle");
    fireEvent.click(dropDownToggle);
    const highestRated = getByText("Highest Rated");
    fireEvent.click(highestRated);
    expect(dropDownToggle.textContent).toContain("HIGHEST RATED");
  });
});
