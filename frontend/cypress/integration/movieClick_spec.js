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
