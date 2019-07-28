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
      .addAnchor("/#", "Games")
      .addClass("nav-menu__list-item")
      .click(event => {
        event.preventDefault();
        this.renderPageHome();
      });

    const navListItemPlatforms = Html()
      .create("li")
      .addAnchor("/#", "Platforms")
      .addClass("nav-menu__list-item")
      .click(event => {
        event.preventDefault();
        this.renderPagePlatforms();
      });

    const navListItemDevelopers = Html()
      .create("li")
      .addAnchor("/#", "Developers")
      .addClass("nav-menu__list-item")
      .click(event => {
        event.preventDefault();
        this.renderPageDevelopers();
      });

    navList.addChild(navListItemGames);
    navList.addChild(navListItemPlatforms);
    navList.addChild(navListItemDevelopers);
    navMenu.addChild(navList);
    return navMenu;
  }

  renderContentBlock(requestedData) {
    const contentBlock = Html()
      .create("section")
      .addClass("content-block");

    const contentTitle = Html()
      .create("h2")
      .addClass("content-title")
      .text(requestedData);

    const contentList = Html()
      .create("ul")
      .addClass("content-list");

    Api().getRequest(
      `http://localhost:3000/${requestedData}`,
      responseCollection => {
        responseCollection.forEach(item => {
          let name;
          if (requestedData === "games") {
            name = `${item.title}`;
          }
          if (requestedData === "platforms") {
            name = `${item.device}`;
          }
          if (requestedData === "developers") {
            name = `${item.companyName}`;
          }
          const contentBlockListItem = Html()
            .create("li")
            .addClass("content-block__list-item")
            .addChild(
              Html()
                .create("a")
                .addClass("content-list-item__link")
                .addAttribute("href", `${requestedData}/${item._id}`)
                .text(name)
                .click(event => {
                  event.preventDefault();

                  const endpoint = event.target.getAttribute("href");
                  Api().getRequest(
                    `http://localhost:3000/${endpoint}`,
                    data => {
                      const typeOfObject = endpoint.split("/")[0];
                      if (typeOfObject === "games") {
                        this.renderPageGame(data);
                      }
                      if (typeOfObject === "platforms") {
                        this.renderPagePlatform(data);
                      }
                      if (typeOfObject === "developers") {
                        this.renderPageDeveloper(data);
                      }
                      this.renderPageSingle(data, endpoint);
                    }
                  );
                })
            );
          contentList.addChild(contentBlockListItem);
        });
      }
    );
    contentBlock.addChild(contentTitle);
    contentBlock.addChild(contentList);
    return contentBlock;
  }

  renderPageGames() {
    const currentMainContentContainer = this.wrapperDiv()
      .select(".content")
      .select(".container");

    currentMainContentContainer.replace(this.renderContentBlock("games"));
  }

  renderPagePlatforms() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container");

    currentMainContentContainer.replace(this.renderContentBlock("platforms"));
  }

  renderPageDevelopers() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container");

    currentMainContentContainer.replace(this.renderContentBlock("developers"));
  }

  renderMainContent(requestedData) {
    const mainContent = Html()
      .create("main")
      .addClass("content");

    const containerDiv = Html()
      .create("div")
      .addClass("container");

    const contentBlock = this.renderContentBlock(requestedData);
    containerDiv.addChild(contentBlock);
    mainContent.addChild(containerDiv);
    return mainContent;
  }
  renderPageDeveloper(data) {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container")
      .select(".content-block");

    const developerName = Html()
      .create("h3")
      .addClass("content-title")
      .text(data.companyName);

    const developerGames = Html()
      .create("ul")
      .addClass("content-list");

    data.gameCatalogue.forEach(game => {
      const gameElement = Html()
        .create("li")
        .addClass("content-block__list-item")
        .addChild(
          Html()
            .create("a")
            .addAttribute("href", `/games/${game._id}`)
            .text(game.title)
            .click(event => {
              event.preventDefault();

              const endpoint = event.target.getAttribute("href");
              Api().getRequest(`http://localhost:3000${endpoint}`, data => {
                this.renderPageSingle(data, endpoint);
              });
            })
        );

      developerGames.addChild(gameElement);
    });

    currentMainContentContainer.replace(developerName);
    currentMainContentContainer.addChild(developerGames);
  }

  renderPagePlatform(data) {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container")
      .select(".content-block");

    const platformTitle = Html()
      .create("h3")
      .addClass("content-title")
      .text(data.device);

    const games = Html()
      .create("ul")
      .addClass("content-list");

    data.gameList.forEach(game => {
      console.log(game);
      const gameElement = Html()
        .create("li")
        .addClass("content-block__list-item")
        .addChild(
          Html()
            .create("a")
            .addAttribute("href", `/games/${game._id}`)
            .text(game.title)
            .click(event => {
              event.preventDefault();

              const endpoint = event.target.getAttribute("href");
              Api().getRequest(`http://localhost:3000${endpoint}`, data => {
                this.renderPageSingle(data, endpoint);
              });
            })
        );
      games.addChild(gameElement);
    });

    currentMainContentContainer.replace(platformTitle);
    currentMainContentContainer.addChild(games);
  }

  renderPageGame(data) {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container")
      .select(".content-block");

    const gameTitle = Html()
      .create("h3")
      .addClass("content-title")
      .text(data.title);

    const games = Html()
      .create("ul")
      .addClass("content-list");
    const platform = Html()
      .create("li")
      .addClass("content-list")
      .text(data.platform);

    const developer = Html()
      .create("li")
      .addClass("content-list")
      .text(data.developer);

    const coverArt = Html()
      .create("li")
      .addClass("content-block__list-item")
      .addChild(
        Html()
          .create("img")
          .addClass("list-item__image")
          .addAttribute("src", data.coverArt)
      );

    games.addChild(coverArt);
    games.addChild(platform);
    games.addChild(developer);
    currentMainContentContainer.replace(gameTitle);
    currentMainContentContainer.addChild(games);
  }

  renderPageSingle(data, endpoint) {
    const typeOfObject = endpoint.split("/")[1];
    if (typeOfObject === "games") {
      this.renderPageGame(data);
    }
    if (typeOfObject === "platforms") {
      this.renderPagePlatform(data);
    }
    if (typeOfObject === "developers") {
      this.renderPageDeveloper(data);
    }
  }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    const mainFooter = this.renderMainFooter();
    const navMenu = this.renderNavMenu();
    const mainContent = this.renderMainContent("games");
    wrapperDiv.addChild(mainHeader);
    wrapperDiv.addChild(navMenu);
    wrapperDiv.addChild(mainContent);
    wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }
}
