import Html from '../html/Html';
import Api from '../api/Api';
export default () => new Components();

class Components {
  getAppContext() {
    return Html().select('#app');
  }

  getWrapperDiv() {
    return Html()
      .create('div')
      .addClass('wrapper');
  }

  renderMainHeader() {
    const mainHeader = Html()
      .create('header')
      .addClass('header');

    const mainHeaderTitle = Html()
      .create('h1')
      .addClass('header-title')
      .text('Gaming Api');
    mainHeader.addChild(mainHeaderTitle);
    return mainHeader;
  }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    wrapperDiv.addChild(mainHeader);
    app.replace(wrapperDiv);
  }
}
