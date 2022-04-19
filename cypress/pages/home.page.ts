import { HomePageFooter } from './home-footer.page';
import { HomePageHeader } from './home-header.page';

export class HomePage {
  private _header: HomePageHeader;
  private _footer: HomePageFooter;

  constructor() {
    this._header = new HomePageHeader();
    this._footer = new HomePageFooter();
  }

  public get header(): HomePageHeader {
    return this._header;
  }
  public get footer(): HomePageFooter {
    return this._footer;
  }

  public open(): void {
    cy.visit('https://flybuys.co.nz');
  }
}
