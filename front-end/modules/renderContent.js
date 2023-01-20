import { getContent } from "./getContent.js";

const renderContent = async () => {
  const groups = await getContent();

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
    const { name } = group;

    const contentContainer = document.createElement("div");
    const nameElement = document.createElement("h4");
    const contentElement = document.createElement("p");

    contentContainer.className = "contentContainer";
    nameElement.textContent = name;
    contentElement.textContent = content;

    contentContainer.append(titleElement, contentElement, privateElement);
    sectionContainer.append(contentContainer);
  });
};

await renderContent();