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
    const { id, name } = group;

    const contentContainer = document.createElement("div");
    const idElement = document.createElement("p");
    const nameElement = document.createElement("h4");

    contentContainer.className = "contentContainer";
    idElement.textContent = `Group id number ${id}`;
    nameElement.textContent = name;

    contentContainer.append(idElement, nameElement);
    sectionContainer.append(contentContainer);
  });
};

await renderContent();
