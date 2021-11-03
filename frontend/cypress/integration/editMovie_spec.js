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
