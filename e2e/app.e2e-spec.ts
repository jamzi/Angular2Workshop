import { HeroTutorialPage } from './app.po';

describe('HeroTutorialPage App', () => {
  let page: HeroTutorialPage;

  beforeEach(() => {
    page = new HeroTutorialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
