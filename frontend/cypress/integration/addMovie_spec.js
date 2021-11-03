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
