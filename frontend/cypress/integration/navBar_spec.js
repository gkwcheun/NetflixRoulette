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
