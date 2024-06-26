import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
import routes from '../routes/routes';

class App {
  constructor({
    button, drawer, content, hero,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._hero = hero;
    this._initialAppshell();
  }

  _initialAppshell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      hero: this._hero,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const skipLinkElm = document.querySelector('.skip-link');
    skipLinkElm.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });
  }
}

export default App;
