describe("editing a book club", () => {
  it("edits a book club description", () => {
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

    // grab a club that you own
    // click view club
    // click edit
    // type in something in club description
    // click submit

    cy.contains(".segment", "You are the owner of this club").within(() => {
      cy.get("a").contains("View Club").click();
    });

    // check original
    cy.get("h4")
      .contains("Club Description")
      .parent()
      .within(() => {
        cy.contains("A club for mystery enthusiasts");
      });

    cy.get("a[id=edit]").click();

    cy.get("textarea[name=description]").type("A new club 22 description");

    cy.get("button[id=submit]").click();

    // confirm replaced with new
    cy.get("h4")
      .contains("Club Description")
      .parent()
      .within(() => {
        cy.contains("A new club 22 description");
      });
  });
});
