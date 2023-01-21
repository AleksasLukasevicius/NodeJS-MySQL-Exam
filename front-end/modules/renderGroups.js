import { getGroups } from "./getGroups.js";

const renderContent = async () => {
  const groups = await getGroups();

  if (!groups) {
    return;
  }

  if (groups.error) {
    return;
  }

  const sectionContainer = document.body.querySelector("#content");
  sectionContainer.replaceChildren();

  if (!groups.length) {
    const noDataElement = document.createElement("h2");
    noDataElement.textContent = "No data in database";

    sectionContainer.append(noDataElement);
  }

  groups.forEach((group) => {
    const { id, name } = group;

    const contentContainer = document.createElement("div");
    const nameElement = document.createElement("h4");
    const idElement = document.createElement("p");

    contentContainer.className = "contentContainer";
    nameElement.textContent = name;
    idElement.textContent = `Group id number ${id}`;

    contentContainer.append(idElement, nameElement);
    sectionContainer.append(contentContainer);
  });
};

await renderContent();
