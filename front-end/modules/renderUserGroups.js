import { getUserGroups } from "./getUserGroups.js";

const renderContent = async () => {
  const groups = await getUserGroups();

  if (!groups) {
    return;
  }

  if (groups.error) {
    return;
  }

  const sectionContainer = document.body.querySelector("#content");
  sectionContainer.replaceChildren();

  if (!groups.length) {
    const noDataElemnet = document.createElement("h2");
    noDataElemnet.textContent = "There is no groups assigned to you";

    sectionContainer.append(noDataElemnet);
  }

  groups.forEach((group) => {
    const { name } = group;

    const contentContainer = document.createElement("div");
    const nameElement = document.createElement("h4");
    const contentElement = document.createElement("p");

    contentContainer.className = "contentContainer";

    nameElement.textContent = name;
    contentElement.textContent = content;

    contentContainer.append(nameElement, contentElement, privateElement);
    sectionContainer.append(contentContainer);
  });
};

await renderContent();
