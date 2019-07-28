import Html from "../html/Html";
import Api from "../api/Api";
export default () => new Components();

class Components {
  getAppContext() {
    return Html().select("#app");
  }

  getWrapperDiv() {
    return Html()
      .create("div")
      .addClass("wrapper");
  }

  renderMainHeader() {
    const mainHeader = Html()
      .create("header")
      .addClass("header");

    const mainHeaderTitle = Html()
      .create("h1")
      .addClass("header-title")
      .text("Gaming Api");
    mainHeader.addChild(mainHeaderTitle);
    return mainHeader;
  }

  renderMainFooter() {
    const mainFooter = Html()
      .create("footer")
      .addClass("footer");
    const mainFooterCopy = Html()
      .create("small")
      .addClass("copy")
      .html("&copy; 2019 Gaming Api");
    mainFooter.addChild(mainFooterCopy);
    return mainFooter;
  }

  renderNavMenu() {
    const navMenu = Html()
      .create("nav")
      .addClass("nav-menu");

    const navList = Html()
      .create("ul")
      .addClass("nav-menu__list");

    const navListItemGames = Html()
      .create("li")
      .addClass("nav-menu__list-item")
      .addAnchor("/#", "Games")
      .click(event => {
        event.preventDefault();
        this.renderPageHome;
      });

    const navListItemPlatforms = Html()
      .create("li")
      .addClass("nav-menu__list-item")
      .addAnchor("/#", "Platforms")
      .click(event => {
        event.preventDefault();
        this.renderPageHome;
      });

    const navListItemDevelopers = Html()
      .create("li")
      .addClass("nav-menu__list-item")
      .addAnchor("/#", "Developers")
      .click(event => {
        event.preventDefault();
        this.renderPageHome;
      });

    navList.addChild(navListItemGames);
    navList.addChild(navListItemPlatforms);
    navList.addChild(navListItemDevelopers);
    navMenu.addChild(navList);
    return navMenu;
  }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    const mainFooter = this.renderMainFooter();
    const navMenu = this.renderNavMenu();
    wrapperDiv.addChild(mainHeader);
    wrapperDiv.addChild(navMenu);
    wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }
}
