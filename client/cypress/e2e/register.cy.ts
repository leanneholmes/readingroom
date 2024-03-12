describe("register flow", () => {
  it("registers", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/register").as(
      "registerRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=20&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("New user");

    cy.get("input[name=username]").type("newusername3");

    cy.get("input[name=email]").type("user3@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd!!");

    cy.get("button[type=submit]").click();

    cy.wait("@registerRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);
  });

  it("enters existing username and password", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/register").as(
      "registerFailRequest"
    );

    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("Deanna");

    cy.get("input[name=username]").type("deanna");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@registerFailRequest")
      .its("response.statusCode")
      .should("eq", 400);
  });
});
