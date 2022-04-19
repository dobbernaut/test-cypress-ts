import { StoreAllItemsPage } from './all-items.page';
import { StoreCatalogSearchPage } from './catalog-search.page';
import { StoreDealsPage } from './store-deals.page';
import { StoreTravelBookingsPage } from './travel-bookings.page';

export class StorePage {
  private _allItems: StoreAllItemsPage;
  private _storeDeals: StoreDealsPage;
  private _travelBookings: StoreTravelBookingsPage;
  private _catalogSearch: StoreCatalogSearchPage;

  // selectors
  private allItemsTab = 'a[title="All items"]';
  private storeDealsTab = 'a[title="Store deals"]';
  private travelBookingsTab = 'a[title="Travel bookings"]';
  private searchBox = 'input[id="search"]';
  private searchButton = '#search_mini_form button[title="Search"]';

  constructor() {
    this._allItems = new StoreAllItemsPage();
    this._storeDeals = new StoreDealsPage();
    this._travelBookings = new StoreTravelBookingsPage();
    this._catalogSearch = new StoreCatalogSearchPage();
  }

  public get allItems() {
    return this._allItems;
  }
  public get storeDeals() {
    return this._storeDeals;
  }
  public get travelBookings() {
    return this._travelBookings;
  }
  public get catalogSearch() {
    return this._catalogSearch;
  }

  public openAllItems(): void {
    cy.get(this.allItemsTab).click();
  }

  public openStoreDeals(): void {
    cy.get(this.storeDealsTab).click();
  }

  public openTravelBookings(): void {
    cy.get(this.travelBookingsTab).click();
  }

  public searchTheFlybuysStore(search: string): void {
    cy.get(this.searchBox).type(search);
    cy.get(this.searchButton).click();
  }
}
