import { NgElectronPage } from './app.po';

describe('ng-electron App', () => {
  let page: NgElectronPage;

  beforeEach(() => {
    page = new NgElectronPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
