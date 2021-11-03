import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { showInfo } from "../redux/actions";
import MovieList from "../components/MovieList";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);
const data = {
  data: [
    {
      id: 337167,
      title: "Fifty Shades Freed",
      tagline: "Don't miss the climax",
      vote_average: 6.1,
      vote_count: 1195,
      release_date: "2018-02-07",
      poster_path:
        "https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg",
      overview:
        "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
      budget: 55000000,
      revenue: 136906000,
      genres: ["Drama", "Romance"],
      runtime: 106,
    },
    {
      id: 269149,
      title: "Zootopia",
      tagline: "Welcome to the urban jungle.",
      vote_average: 7.7,
      vote_count: 6795,
      release_date: "2016-02-11",
      poster_path:
        "https://image.tmdb.org/t/p/w500/sM33SANp9z6rXW8Itn7NnG1GOEs.jpg",
      overview:
        "Determined to prove herself, Officer Judy Hopps, the first bunny on Zootopia's police force, jumps at the chance to crack her first case - even if it means partnering with scam-artist fox Nick Wilde to solve the mystery.",
      budget: 150000000,
      revenue: 1023784195,
      genres: ["Animation", "Adventure", "Family", "Comedy"],
      runtime: 108,
    },
    {
      id: 181808,
      title: "Star Wars: The Last Jedi",
      tagline: "The Saga Continues",
      vote_average: 7.1,
      vote_count: 4732,
      release_date: "2017-12-13",
      poster_path:
        "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
      overview:
        "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
      budget: 200000000,
      revenue: 1325937250,
      genres: ["Fantasy", "Adventure", "Science Fiction"],
      runtime: 152,
    },
    {
      id: 284054,
      title: "Black Panther",
      tagline: "Long live the king",
      vote_average: 7.3,
      vote_count: 3788,
      release_date: "2018-02-13",
      poster_path:
        "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
      overview:
        "King T'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without.  Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister,  members of the Dora Milaje (the Wakandan \"special forces\"), and an American secret agent, to prevent Wakanda from being dragged into a world war.",
      budget: 200000000,
      revenue: 1245257672,
      genres: ["Action", "Adventure", "Fantasy", "Science Fiction"],
      runtime: 134,
    },
    {
      id: 354912,
      title: "Coco",
      tagline: "The celebration of a lifetime",
      vote_average: 7.8,
      vote_count: 3619,
      release_date: "2017-10-27",
      poster_path:
        "https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg",
      overview:
        "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
      budget: 175000000,
      revenue: 700920729,
      genres: ["Adventure", "Comedy", "Family", "Animation"],
      runtime: 105,
    },
    {
      id: 333339,
      title: "Ready Player One",
      tagline: "A better reality awaits.",
      vote_average: 8.1,
      vote_count: 617,
      release_date: "2018-03-28",
      poster_path:
        "https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
      overview:
        "When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.",
      budget: 175000000,
      revenue: 0,
      genres: ["Adventure", "Science Fiction", "Action"],
      runtime: 140,
    },
  ],
};
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test("placeholder", () => {});

describe("MovieList Testing", () => {
  let store;
  let componentSnapshot;
  let component;
  let initialState = {
    movie: {
      loading: false,
      movies: data.data,
      error: "",
    },
  };
  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    componentSnapshot = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <MovieList />
        </BrowserRouter>
      </Provider>
    );
    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieList />
        </BrowserRouter>
      </Provider>
    );
  });
  test("MovieList Snapshot", () => {
    expect(componentSnapshot.toJSON()).toMatchSnapshot();
  });
  test("Correct Movie Count", () => {
    const { getByText } = component;
    getByText("6 Movies Found");
  });
  test("Movie Cards render with proper info", () => {
    const { getByText, getAllByText } = component;
    getByText("Fifty Shades Freed");
    getByText("Zootopia");
    getByText("Star Wars: The Last Jedi");
    getByText("Black Panther");
    getByText("Coco");
    getByText("Ready Player One");

    expect(getAllByText("2018").length).toBe(3);
    expect(getAllByText("2017").length).toBe(2);
    getByText("2016");
  });
  test("Clicking MovieCard calls dispatch for showMovieInfo", () => {
    const { getByTestId } = component;
    let movieCard = getByTestId("337167");
    fireEvent.click(movieCard);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
  test("Clicking another movie card", () => {
    const { getByTestId } = component;
    let movieCard = getByTestId("333339");
    fireEvent.click(movieCard);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
