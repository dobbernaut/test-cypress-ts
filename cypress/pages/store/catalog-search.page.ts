export class StoreCatalogSearchPage {
  private numberOfSearchItems = '[itemprop="numberOfItems"]';
  private itemsList = '.ais-Hits-list';
  private items = '.ais-Hits-item';
  private product = '[itemprop="itemListElement"]';
  private productUrl = '[itemprop="url"]';
  private productName = '[itemprop="name"]';
  private productPrice = '[itemprop="lowPrice"]';

  /**
   * Return the number of search item results.
   */
  public getNumberOfSearchItems(): Cypress.Chainable<number> {
    return cy.get(this.numberOfSearchItems).then((number) => {
      return parseInt(number.text(), 10);
    });
  }
}
