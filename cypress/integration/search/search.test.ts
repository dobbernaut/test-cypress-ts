import { HomePage } from '@page/home.page';
import { StorePage } from '@page/store';

describe('Flybuys store search', function () {
  let home: HomePage;
  let store: StorePage;

  const searchItem = 'headphones';

  before(function () {
    home = new HomePage();
    store = new StorePage();
  });

  describe('From the footer search box', () => {
    it('should return search item results', function () {
      home.open();
      home.footer.searchTheFlybuysStore(searchItem);

      store.catalogSearch.getNumberOfSearchItems().then((numberOfItems) => {
        expect(numberOfItems).to.be.greaterThan(0);
      });
    });

    it('should return search item results', () => {
      home.open();
      home.header.openFlybuysStore();

      store.searchTheFlybuysStore(searchItem);
      store.catalogSearch.getNumberOfSearchItems().then((numberOfItems) => {
        expect(numberOfItems).to.be.greaterThan(0);
      });
    });
  });
});
