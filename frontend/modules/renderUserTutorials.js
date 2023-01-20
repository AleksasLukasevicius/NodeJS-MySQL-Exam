import { getUserTutorials } from "./getUserTutorials.js";

const renderContent = async () => {
  const tutorials = await getUserTutorials();

  if (!tutorials) {
    return;
  }

  if (tutorials.error) {
    return;
  }

  const sectionContainer = document.body.querySelector("#content");
  sectionContainer.replaceChildren();

  if (!tutorials.length) {
    const noDataElemnet = document.createElement("h2");
    noDataElemnet.textContent = "There is no tutorials assigned to you";

    sectionContainer.append(noDataElemnet);
  }

  tutorials.forEach((tutorial) => {
    const { title, content } = tutorial;
    let isPrivate = tutorial.isPrivate;

    const contentContainer = document.createElement("div");
    contentContainer.className = "contentContainer";

    // const titleContainer = document.createElement("div");
    // titleContainer.className = "titleContainer";

    const titleElement = document.createElement("h4");

    const contentElement = document.createElement("p");

    const privateElement = document.createElement("h5");

    titleElement.textContent = title;

    contentElement.textContent = content;

    if (!isPrivate) {
      isPrivate = "no";
    } else {
      isPrivate = "yes";
    }

    privateElement.textContent = `Private: ${isPrivate}`;

    // titleContainer.append(title);

    contentContainer.append(titleElement, contentElement, privateElement);

    sectionContainer.append(contentContainer);
  });
};

await renderContent();
