describe("viewing a book club", () => {
  it("views a book club", () => {
    //login first
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

    cy.get(".segment")
      .contains("Historical Fiction Voyage")
      .get("a")
      .contains("View Club")
      .click();

    // check original
    cy.get("h4")
      .contains("Club Description")
      .parent()
      .within(() => {
        cy.contains("Exploring the world of classic literature");
      });
  });
});
