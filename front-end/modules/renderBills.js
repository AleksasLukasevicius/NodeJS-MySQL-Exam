import { getBills } from "./getBills.js";

const renderContent = async () => {
  const bills = await getBills();

  if (!bills) {
    return;
  }

  if (bills.error) {
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
  billsContainer.id = "bills-container";

  const billsTableEl = document.createElement("table");
  billsTableEl.id = "bills-table";

  const tbodyEl = document.createElement("tbody");
  tbodyEl.id = "tbody";

  const tableRowEl = document.createElement("tr");
  const thIdEl = document.createElement("th");
  const thDescriptionEl = document.createElement("th");
  const thAmountEl = document.createElement("th");

  thIdEl.textContent = "ID";
  thDescriptionEl.textContent = "Description";
  thAmountEl.textContent = "Amount";

  tableRowEl.append(thIdEl, thDescriptionEl, thAmountEl);
  tbodyEl.append(tableRowEl);
  billsTableEl.append(tbodyEl);

  billsContainer.append(billsTableEl);

  bills.forEach((bill) => {
    const { id, amount, description } = bill;

    const rowEl = document.createElement("tr");

    const idEl = document.createElement("td");
    const descriptionEl = document.createElement("td");
    const amountEl = document.createElement("td");

    idEl.textContent = id;
    descriptionEl.textContent = description;
    amountEl.textContent = `${currency}${amount}`;

    rowEl.append(idEl, descriptionEl, amountEl);
    tbodyEl.append(rowEl);
  });
  sectionContainer.append(billsContainer);
};

await renderContent();
