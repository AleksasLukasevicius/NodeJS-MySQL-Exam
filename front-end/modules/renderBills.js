import { getBills } from "./getBills.js";
<<<<<<< HEAD

export const renderBills = async () => {
  const bills = await getBills();
  if (!bills) {
    return;
  }
=======
// import { addBill } from "./addBill.js";

export const renderBills = async () => {
  const bills = await getBills();
>>>>>>> 718c7f2036c7d99b960177854e5147dfc8f8ed1a

  if (!bills || bills.error) {
    return;
  }

  const sectionContainer = document.body.querySelector("#content");
  sectionContainer.replaceChildren();

  if (!bills.length) {
    const noDataElement = document.createElement("h2");

    noDataElement.textContent = "No data in database";

    return sectionContainer.append(noDataElement);
  }

  const billsContainer = document.createElement("div");
  const billsTableElement = document.createElement("table");
  const tbodyElement = document.createElement("tbody");
  const tableRowElement = document.createElement("tr");
  const idElement = document.createElement("th");
  const descriptionElement = document.createElement("th");
  const amountElement = document.createElement("th");

  idElement.textContent = "Id";
  descriptionElement.textContent = "Description";
  amountElement.textContent = "Amount";

  tableRowElement.append(idElement, descriptionElement, amountElement);
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

// document
//   .querySelector("form#addBill-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();

//     await addBill();
//   });
