export class HomePageFooter {
  private searchBox = 'footer form[class*="search"] input';
  private searchButton = 'footer button[type="submit"]';

  public searchTheFlybuysStore(search: string): void {
    cy.get(this.searchBox).type(search);
    cy.get(this.searchButton).click();
  }
}
