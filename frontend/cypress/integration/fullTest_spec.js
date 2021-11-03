describe("Testing movie click", () => {
  it("clicks an element", () => {
    // visit website
    cy.visit("http://localhost:8080/");
    // find search bar by placeholder text and type title;
    cy.findByPlaceholderText("What do you want to watch?").type("La La Land");
    // find search button and click
    cy.findByTestId("movie-search-btn").click();
    cy.url().should("include", "/search?title=La%20La%20Land");
    // Verify movie card and verify it populated from search and click to open movie info pane
    cy.findByTestId("313369").click();
    cy.url().should("include", "/search/movie=313369");
    // find return search btn, click to close movie info pane
    cy.findByTestId("return-search-btn").click();
    // return to search button hidden after movie info pane closed
    cy.findByTestId("return-search-btn").should("not.exist");
  });
});

describe("Testing Nav Bar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });
  it("Clicking NavBar links changes URL", () => {
    cy.url().should("be.equal", "http://localhost:8080/search");
    cy.get('[name="documentary"]').click();
    cy.url().should(
      "be.equal",
      "http://localhost:8080/search?genre=documentary"
    );
    cy.get('[name="comedy"]').click();
    cy.url().should("be.equal", "http://localhost:8080/search?genre=comedy");
    cy.get('[name="horror"]').click();
    cy.url().should("be.equal", "http://localhost:8080/search?genre=horror");
    cy.get('[name="crime"]').click();
    cy.url().should("be.equal", "http://localhost:8080/search?genre=crime");
  });
  it("Clicking genre correctly fetches movies with said genre", () => {
    cy.get('[name="documentary"]').click();
    cy.get(".movie-genres").should("have.length", 6);
    cy.get(".movie-genres").then((genres) => {
      for (let i = 0; i < 6; i++) {
        expect(genres[i].innerText).to.include("Documentary");
      }
    });
    cy.get('[name="comedy"]').click();
    cy.get(".movie-genres").should("have.length", 6);
    cy.get(".movie-genres").then((genres) => {
      for (let i = 0; i < 6; i++) {
        expect(genres[i].innerText).to.include("Comedy");
      }
    });
    cy.get('[name="horror"]').click();
    cy.get(".movie-genres").should("have.length", 6);
    cy.get(".movie-genres").then((genres) => {
      for (let i = 0; i < 6; i++) {
        expect(genres[i].innerText).to.include("Horror");
      }
    });
    cy.get('[name="crime"]').click();
    cy.get(".movie-genres").should("have.length", 6);
    cy.get(".movie-genres").then((genres) => {
      for (let i = 0; i < 6; i++) {
        expect(genres[i].innerText).to.include("Crime");
      }
    });
  });
});

describe("Testing Add and Delete Movie Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });
  it("Add Movie Test", () => {
    // visit website
    const title = "Testing Movie";
    const year = "1994";
    const month = "06";
    const day = "13";
    const posterSrc =
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/rons-gone-wrong_xh1kjpu4_240x360_crop_center.progressive.jpg?v=1625519115";
    const rating = 8;
    const runtime = 120;
    const overview = "example movie overview";
    cy.get(".add-movie-btn").click();
    // populate movie title
    cy.get(":nth-child(2) > .col-1 > .mb-3 > .add-movie-form-input").type(
      title
    );
    // populate movie release date
    cy.get(
      ":nth-child(2) > :nth-child(2) > .mb-3 > .add-movie-form-input"
    ).type(`${year}-${month}-${day}`);
    // populate movie poster url
    cy.get(":nth-child(3) > .col-1 > .mb-3 > .add-movie-form-input").type(
      posterSrc
    );
    // populate movie rating
    cy.get(
      ":nth-child(3) > :nth-child(2) > .mb-3 > .add-movie-form-input"
    ).type(rating);
    // click dropdown and select genres
    cy.get("#dropdown-button-dark-example1").click();
    cy.get(":nth-child(1) > .form-check-input").click();
    // populate run time
    cy.get(
      ":nth-child(4) > :nth-child(2) > .mb-3 > .add-movie-form-input"
    ).type(runtime);
    // write movie description/overview
    cy.get(":nth-child(5) > .mb-3 > .add-movie-form-input").type(overview);
    // submit form
    cy.get(".submit-btn").click();

    // search for movie
    cy.get(".search-input").type("Testing Movie");
    // click search
    cy.get("[data-testid=movie-search-btn]").click();
    // verify movie card found by search and click to show movie info pane
    cy.get(".movie-image").click();
    // verify contents of movie info
    cy.get(".movie-info-title").then((titleElement) =>
      expect(titleElement.text()).to.include(title)
    );
    cy.get(".rating").then((ratingElement) =>
      expect(ratingElement.text()).to.equal(`${rating}`)
    );
    cy.get(".movie-info-genre").then((genre) =>
      expect(genre.text()).to.equal("Crime")
    );
    cy.get(".movie-info-year-length").then((movieYear) =>
      expect(movieYear.text()).to.include(year)
    );
    cy.get(".movie-info-length").then((movieLength) =>
      expect(movieLength.text()).to.equal("2h 0min")
    );
    cy.get(".movie-info-description").then((description) =>
      expect(description.text()).to.equal(overview)
    );
    // click close movie info icon
    cy.get("[data-testid=return-search-btn]").click();
  });
  it("Delete Movie Test", () => {
    // delete movie
    // search for movie
    cy.get(".search-input").clear().type("Testing Movie");
    cy.get("[data-testid=movie-search-btn]").click();
    cy.get("[data-testid=movie-search-btn]").click();
    cy.get(".movie-image").trigger("mouseover");
    cy.get(".edit-delete-btn").click();
    cy.get(".delete").click();
    cy.get(".confirm-btn").click();

    // search for movie
    cy.get(".search-input").clear();
    cy.get(".search-input").type("Testing Movie");
    cy.get("[data-testid=movie-search-btn]").click();
    // confirm 0 movies found and movie does not exist on DOM
    cy.findByText("0 Movies Found");
    cy.findByText("Testing Movie").should("not.exist");
  });
});

describe("Testing Edit Movie Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });
  it("Edit movie", () => {
    const movie = {
      id: 313369,
      title: "La La Land",
      tagline: "Here's to the fools who dream.",
      vote_average: 7.9,
      vote_count: 6782,
      release_date: "2016-11-29",
      poster_path:
        "https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
      overview:
        "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
      budget: 30000000,
      revenue: 445435700,
      genres: ["Comedy", "Drama", "Romance"],
      runtime: 128,
    };
    // search for movie
    cy.get(".search-input").type(movie.title);
    cy.get("[data-testid=movie-search-btn]").click();
    cy.get(".movie-image").trigger("mouseover");
    cy.get(".edit-delete-btn").click();
    cy.get(".edit").click();

    // confirm movie data and edit
    cy.findByText(movie.title);
    cy.findByText(movie.overview);

    // submit edits
    cy.get(":nth-child(2) > .col-1 > .mb-3 > .add-movie-form-input")
      .clear()
      .type("La La Land - Edited");
    cy.get(".submit-btn").click();

    // search again
    cy.get(".search-input").clear().type("La La Land");
    cy.get("[data-testid=movie-search-btn]").click();

    //confirm only 1 movie (didn't create duplicate) and edited title
    cy.findByText("La La Land - Edited");
  });
});
