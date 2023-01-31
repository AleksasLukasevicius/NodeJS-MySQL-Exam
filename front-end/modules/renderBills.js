import { getBills } from "./getBills.js";

const renderBills = async () => {
  const bills = await getBills();

  if (!bills || bills.error) {
    return;
  }

  const sectionContainer = document.body.querySelector("#content");
  sectionContainer.replaceChildren();

  if (!bills.length) {
    const noDataElement = document.createElement("h2");
    noDataElement.textContent = "No data in database";

    sectionContainer.append(noDataElement);
  }

  const billsContainer = document.createElement("div");
  const billsTableElement = document.createElement("table");
  const tbodyElement = document.createElement("tbody");
  const tableRowElement = document.createElement("tr");
  const thIdElement = document.createElement("th");
  const thDescriptionElement = document.createElement("th");
  const thAmountElement = document.createElement("th");

  billsContainer.id = "bills-container";
  billsTableElement.id = "bills-table";
  tbodyElement.id = "tbody";
  thIdElement.textContent = "Id";
  thDescriptionElement.textContent = "Description";
  thAmountElement.textContent = "Amount";

  tableRowElement.append(thIdElement, thDescriptionElement, thAmountElement);
  tbodyElement.append(tableRowElement);
  billsTableElement.append(tbodyElement);
  billsContainer.append(billsTableElement);

  bills.forEach((bill) => {
    const { id, amount, description } = bill;

    const rowElement = document.createElement("tr");
    const idElement = document.createElement("td");
    const descriptionElement = document.createElement("td");
    const amountElement = document.createElement("td");

    idElement.textContent = id;
    descriptionElement.textContent = description;
    amountElement.textContent = `${amount} $`;

    rowElement.append(idElement, descriptionElement, amountElement);
    tbodyElement.append(rowElement);
  });
  sectionContainer.append(billsContainer);
};

await renderBills();
