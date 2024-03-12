describe("joining a club", () => {
  it("joins a club", () => {
    // login first
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=20&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    // find any club that not a member of
    cy.get(".segment").each(($el) => {
      // Using jQuery's .text() method to get all text within the element
      const text = $el.text();

      // Check if the text does not contain the specific phrases
      if (
        !text.includes("You are a member of this club") &&
        !text.includes("You are the owner of this club")
      ) {
        // If a .segment does not contain the phrases, find and click the "View Club" button within this segment
        cy.wrap($el).find('a:contains("View Club")').click();

        cy.get("button").contains("Join Club").click();

        cy.get("button").contains("Leave Club");
        return false; // Break the .each() loop by returning false upon finding the first match and performing the action
      }
    });
  });
});
