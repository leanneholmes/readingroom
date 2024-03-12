describe("login flow", () => {
  it("logs in", () => {
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
  });

  it("enters wrong username and password", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("wrong@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd??");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 401);
  });
});
