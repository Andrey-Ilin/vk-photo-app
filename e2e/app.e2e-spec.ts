import { Photoapp2Page } from './app.po';

describe('photoapp2 App', function() {
  let page: Photoapp2Page;

  beforeEach(() => {
    page = new Photoapp2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
