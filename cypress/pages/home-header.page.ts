export class HomePageHeader {
  private flybuysStore = '.container [data-testid="primary-nav-store"]';

  public openFlybuysStore(): void {
    cy.get(this.flybuysStore).click();
  }
}
