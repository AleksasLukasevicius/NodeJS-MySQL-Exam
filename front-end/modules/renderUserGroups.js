import { getUserGroups } from "./getUserGroups.js";

const renderUserGroups = async () => {
  const userGroups = await getUserGroups();

  if (!userGroups || userGroups.error) {
    return;
  }

  const sectionContainer = document.body.querySelector("#content");
  sectionContainer.replaceChildren();

  if (!userGroups.length) {
    const noDataElemnet = document.createElement("h2");
    noDataElemnet.textContent = "There is no groups assigned to you";

    sectionContainer.append(noDataElemnet);
  }

  userGroups.forEach((group) => {
    const { group_id, name } = group;

    const contentContainer = document.createElement("div");
    const idElement = document.createElement("p");
    const nameElement = document.createElement("h4");

    contentContainer.className = "contentContainer";
    idElement.textContent = `Group number ${group_id}`;
    nameElement.textContent = name;

    contentContainer.addEventListener("click", () => {
      window.location.assign(`./bills.html?group_id=${group_id}`);
    });

    contentContainer.append(idElement, nameElement);
    sectionContainer.append(contentContainer);
  });
};

await renderUserGroups();
