import { getUserGroups } from "./getUserGroups.js";

const renderContent = async () => {
  const userGroups = await getUserGroups();

  if (!userGroups) {
    return;
  }

  if (userGroups.error) {
    return;
  }

  const sectionContainer = document.body.querySelector("#content");
  sectionContainer.replaceChildren();

  if (!userGroups.length) {
    const noDataElemnet = document.createElement("h2");
    noDataElemnet.textContent = "There is no user roups assigned to you";

    sectionContainer.append(noDataElemnet);
  }
  console.info(userGroups);

  userGroups.forEach((group) => {
    const { group_id, name } = group;

    const contentContainer = document.createElement("div");
    const idElement = document.createElement("p");
    const nameElement = document.createElement("h4");

    contentContainer.className = "contentContainer";
    idElement.textContent = `Group id number ${group_id}`;
    nameElement.textContent = name;

    contentContainer.append(idElement, nameElement);
    sectionContainer.append(contentContainer);
  });
};

await renderContent();
